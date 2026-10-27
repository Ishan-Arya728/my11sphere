import random
from typing import List, Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import create_db_and_tables, get_session, engine
from models import Player, SavedTeam, QuizScore, TeamCreateRequest, TeamResponse
from seed_data import seed_if_empty

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    with Session(engine) as session:
        seed_if_empty(session)
    yield

app = FastAPI(title="My11Sphere API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats/summary")
def get_home_summary(session: Session = Depends(get_session)):
    players = session.exec(select(Player)).all()
    if not players:
        return {"totalPlayers": 0, "totalRuns": 0, "totalWickets": 0, "topScorer": None}

    top_scorer = max(players, key=lambda p: p.runs)
    top_wicket_taker = max(players, key=lambda p: p.wickets)

    return {
        "totalPlayers": len(players),
        "totalRuns": sum(p.runs for p in players),
        "totalWickets": sum(p.wickets for p in players),
        "totalCenturies": sum(p.centuries for p in players),
        "topScorer": {"name": top_scorer.name, "runs": top_scorer.runs, "team": top_scorer.team},
        "topWicketTaker": {"name": top_wicket_taker.name, "wickets": top_wicket_taker.wickets, "team": top_wicket_taker.team},
    }

@app.get("/api/players", response_model=List[Player])
def get_players(
    role: Optional[str] = None,
    team: Optional[str] = None,
    search: Optional[str] = None,
    max_price: Optional[float] = None,
    session: Session = Depends(get_session),
):
    statement = select(Player)
    if role and role.lower() != "all":
        statement = statement.where(Player.role == role)
    if team and team.lower() != "all":
        statement = statement.where(Player.team == team)
    if max_price is not None:
        statement = statement.where(Player.price <= max_price)

    players = session.exec(statement).all()
    if search:
        q = search.lower()
        players = [p for p in players if q in p.name.lower() or q in p.team.lower()]
    return players

@app.get("/api/players/{player_id}", response_model=Player)
def get_player(player_id: int, session: Session = Depends(get_session)):
    player = session.get(Player, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@app.get("/api/compare")
def compare_players(
    p1_id: int = Query(..., description="First Player ID"),
    p2_id: int = Query(..., description="Second Player ID"),
    session: Session = Depends(get_session),
):
    p1 = session.get(Player, p1_id)
    p2 = session.get(Player, p2_id)
    if not p1 or not p2:
        raise HTTPException(status_code=404, detail="One or both players not found")

    return {
        "player1": p1,
        "player2": p2,
        "advantages": {
            "runs": p1.name if p1.runs > p2.runs else p2.name,
            "average": p1.name if p1.average > p2.average else p2.name,
            "strikeRate": p1.name if p1.strikeRate > p2.strikeRate else p2.name,
            "wickets": p1.name if p1.wickets > p2.wickets else p2.name,
            "economy": p1.name if (0 < p1.economy < p2.economy or p2.economy == 0) else p2.name,
        },
    }

@app.post("/api/teams", response_model=TeamResponse)
def save_dream_team(payload: TeamCreateRequest, session: Session = Depends(get_session)):
    if len(set(payload.player_ids)) != len(payload.player_ids):
        raise HTTPException(status_code=400, detail="Duplicate players are not allowed in a team.")

    if len(payload.player_ids) > 11:
        raise HTTPException(status_code=400, detail="A Dream XI cannot exceed 11 players.")

    players = session.exec(select(Player).where(Player.id.in_(payload.player_ids))).all()
    if len(players) != len(payload.player_ids):
        raise HTTPException(status_code=404, detail="One or more selected players do not exist.")

    total_price = round(sum(p.price for p in players), 2)
    if total_price > payload.max_budget:
        raise HTTPException(
            status_code=400,
            detail=f"Purse limit exceeded: {total_price} Cr / {payload.max_budget} Cr"
        )

    saved = SavedTeam(
        team_name=payload.team_name,
        creator_name=payload.creator_name or "Guest",
        player_ids_csv=",".join(str(pid) for pid in payload.player_ids),
        total_price=total_price,
    )
    session.add(saved)
    session.commit()
    session.refresh(saved)

    return TeamResponse(
        id=saved.id,
        team_name=saved.team_name,
        creator_name=saved.creator_name,
        total_price=saved.total_price,
        players=players,
    )

@app.get("/api/teams", response_model=List[TeamResponse])
def list_saved_teams(session: Session = Depends(get_session)):
    teams = session.exec(select(SavedTeam)).all()
    result = []
    for t in teams:
        ids = [int(x) for x in t.player_ids_csv.split(",") if x]
        players = session.exec(select(Player).where(Player.id.in_(ids))).all()
        result.append(
            TeamResponse(
                id=t.id,
                team_name=t.team_name,
                creator_name=t.creator_name,
                total_price=t.total_price,
                players=players,
            )
        )
    return result

@app.get("/api/quiz/generate")
def generate_stat_quiz(count: int = 5, session: Session = Depends(get_session)):
    players = session.exec(select(Player)).all()
    if len(players) < 4:
        raise HTTPException(status_code=400, detail="Need at least 4 players in DB to generate quiz.")

    stat_configs = [
        ("runs", "Which of these players has scored the MOST runs ({val} runs)?"),
        ("strikeRate", "Who holds the HIGHEST strike rate ({val}) among these players?"),
        ("wickets", "Which player has taken the MOST wickets ({val} wickets)?"),
        ("average", "Who has the HIGHEST batting average ({val}) among the following?"),
    ]

    questions = []
    for i in range(count):
        sample = random.sample(players, 4)
        stat_key, template = random.choice(stat_configs)
        winner = max(sample, key=lambda p: getattr(p, stat_key))
        val = getattr(winner, stat_key)

        questions.append({
            "id": i + 1,
            "question": template.format(val=val),
            "options": [p.name for p in sample],
            "correctAnswer": winner.name,
            "statKey": stat_key,
        })

    return questions

@app.post("/api/quiz/leaderboard", response_model=QuizScore)
def submit_quiz_score(score_data: QuizScore, session: Session = Depends(get_session)):
    session.add(score_data)
    session.commit()
    session.refresh(score_data)
    return score_data

@app.get("/api/quiz/leaderboard", response_model=List[QuizScore])
def get_quiz_leaderboard(session: Session = Depends(get_session)):
    statement = select(QuizScore).order_by(QuizScore.score.desc()).limit(10)
    return session.exec(statement).all()

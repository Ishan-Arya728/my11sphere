from sqlmodel import Session, select
from models import Player

INITIAL_PLAYERS = [
    {
        "name": "Virat Kohli",
        "team": "RCB",
        "role": "Batsman",
        "nationality": "India",
        "matches": 252,
        "runs": 8004,
        "average": 38.67,
        "strikeRate": 131.97,
        "centuries": 8,
        "wickets": 4,
        "economy": 8.8,
        "price": 15.0,
        "image": "/avatar.png"
    },
    {
        "name": "Jasprit Bumrah",
        "team": "MI",
        "role": "Bowler",
        "nationality": "India",
        "matches": 133,
        "runs": 69,
        "average": 9.85,
        "strikeRate": 85.18,
        "centuries": 0,
        "wickets": 165,
        "economy": 7.30,
        "price": 12.0,
        "image": "/avatar.png"
    },
    {
        "name": "Sanju Samson",
        "team": "RR",
        "role": "Wicketkeeper",
        "nationality": "India",
        "matches": 168,
        "runs": 4419,
        "average": 30.69,
        "strikeRate": 138.96,
        "centuries": 3,
        "wickets": 0,
        "economy": 0.0,
        "price": 14.0,
        "image": "/avatar.png"
    },
    {
        "name": "Pat Cummins",
        "team": "SRH",
        "role": "All-Rounder",
        "nationality": "Australia",
        "matches": 58,
        "runs": 515,
        "average": 18.39,
        "strikeRate": 149.70,
        "centuries": 0,
        "wickets": 63,
        "economy": 8.75,
        "price": 11.5,
        "image": "/avatar.png"
    },
    {
        "name": "Heinrich Klaasen",
        "team": "SRH",
        "role": "Wicketkeeper",
        "nationality": "South Africa",
        "matches": 35,
        "runs": 993,
        "average": 39.72,
        "strikeRate": 168.31,
        "centuries": 1,
        "wickets": 0,
        "economy": 0.0,
        "price": 11.0,
        "image": "/avatar.png"
    },
    {
        "name": "Yashasvi Jaiswal",
        "team": "RR",
        "role": "Batsman",
        "nationality": "India",
        "matches": 53,
        "runs": 1607,
        "average": 32.14,
        "strikeRate": 150.61,
        "centuries": 2,
        "wickets": 0,
        "economy": 0.0,
        "price": 10.5,
        "image": "/avatar.png"
    }
]

def seed_if_empty(session: Session):
    existing = session.exec(select(Player)).first()
    if not existing:
        for p_data in INITIAL_PLAYERS:
            session.add(Player(**p_data))
        session.commit()

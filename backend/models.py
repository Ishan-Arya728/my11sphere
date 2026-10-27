from typing import Optional, List
from sqlmodel import SQLModel, Field
from pydantic import BaseModel

class Player(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    team: str = Field(index=True)
    role: str = Field(index=True)
    nationality: str
    matches: int
    runs: int
    average: float
    strikeRate: float
    centuries: int
    wickets: int
    economy: float
    price: float
    image: str = "/avatar.png"

class SavedTeam(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    team_name: str
    creator_name: str = "Guest"
    player_ids_csv: str
    total_price: float

class QuizScore(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    score: int
    total_questions: int

class TeamCreateRequest(BaseModel):
    team_name: str
    creator_name: Optional[str] = "Guest"
    player_ids: List[int]
    max_budget: float = 100.0

class TeamResponse(BaseModel):
    id: int
    team_name: str
    creator_name: str
    total_price: float
    players: List[Player]

from sqlmodel import SQLModel, create_engine, Session

SQLITE_FILE_NAME = "my11sphere.db"
sqlite_url = f"sqlite:///{SQLITE_FILE_NAME}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

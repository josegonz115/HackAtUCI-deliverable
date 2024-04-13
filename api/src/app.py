from datetime import datetime
from typing import TypedDict

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from fastapi import HTTPException

from services.database import JSONDatabase

app = FastAPI()


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database when starting API server."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    """Close database when stopping API server."""
    database.close()


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> Quote:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now().replace(microsecond=0)
    quote = Quote(name=name, message=message, time=now.isoformat())
    try:
        database["quotes"].append(quote)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return quote


# API route with a query parameter to retrieve quotes based on max age
@app.get("/quote/")
def get_quotes_up_to_max(maxage: str):
    max_age_date = datetime.fromisoformat(maxage)
    quotes = database.get("quotes", [])
    filtered_quotes = [quote for quote in quotes if datetime.fromisoformat(quote['time']) >= max_age_date]
    return filtered_quotes
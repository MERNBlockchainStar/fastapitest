import os
from dotenv import load_dotenv
import uvicorn

from controllers import app

load_dotenv(".env")
HOST = str(os.getenv("HOST"))
PORT = int(os.getenv("PORT"))

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
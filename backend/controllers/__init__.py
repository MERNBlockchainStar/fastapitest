import json
from fastapi import FastAPI, HTTPException, Query, Request, Response
from typing import List
from sqlmodel import Session, SQLModel

from models.machineBase import MachineBase
from models.machineRead import MachineRead
from models.machineCreate import MachineCreate
from models.machineUpdate import MachineUpdate

from service.machineservice import *

app = FastAPI(
    title="Machine API",
    version="1.0.0",
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        machine = CRUDMachine.getAll(session)
        if machine == '[]':
            print("Creating new record")
            machine = MachineCreate(name="Philip Kay", location="Finland", email='philipkay114@gmail.com', number=10, float_number=3.14, enum='active', password="helloworld@114")
            CRUDMachine.create(session, machine)
        

@app.post("/machine/create", summary="Create a new machine")
async def create_machine(machine: MachineCreate):
    """
    Create a new machine.
    """
    print(machine)
    try:
        with Session(engine) as session:
            machine = CRUDMachine.create(session, machine)
            return machine
    except:
        return HTTPException(status_code=500, detail=CRUDMachine.STATUS_500)

    
    
@app.get("/machine/getall", response_model=str, summary="Get all machines")
def get_machine():
    """
    Get a list of all machines
    """
    try:
        with Session(engine) as session:
            machines = CRUDMachine.getAll(session)
            return machines
    except:
        return HTTPException(status_code=500, detail=CRUDMachine.STATUS_500)

@app.get("/machine/get", response_model=str, summary="Get a machine by ID")
def get_machine(id: int = Query(None, description="The id of the machine to retrieve"),
                 email: str = Query(None, description="The email of the machine to retreive")):
    """
    Get a machine by its ID.
    """
    try:
        with Session(engine) as session:
            machine = CRUDMachine.get(session, id, email)
            if not machine:
                raise HTTPException(status_code=404, detail=CRUDMachine.STATUS_404)
            
            return machine
    except:
        return HTTPException(status_code=500, detail=CRUDMachine.STATUS_500)

@app.put("/machine/update/{id}", summary="Update a machine")
async def update_machine(id: int = None, updatedData: MachineUpdate = None):
    """
    Update a machine by its ID.
    """
    try:
        with Session(engine) as session:
            machine = CRUDMachine.get(session, id)
            print(machine)
            if not machine:
                raise HTTPException(status_code=404, detail=CRUDMachine.STATUS_404)
            machineObj = CRUDMachine.update(session, id, updatedData)
            if machineObj == None:
                return HTTPException(status_code=500, detail=CRUDMachine.STATUS_500)
            print (machineObj)
            return {"message": "Machine updated successfully"}
    except:
        return HTTPException(status_code=500, detail=CRUDMachine.STATUS_500)

@app.get("/machine/schema/{method}")
def get_schema(method: str):
    machine = CRUDMachine.get_schema(method)
    return machine

@app.get("/openapi.yaml", summary="Get the OpenAPI specification")
def get_openapi_yaml():
    """
    Get the OpenAPI specification in YAML format.
    """
    return app.openapi()
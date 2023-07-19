from datetime import datetime
from typing import List
from dotenv import load_dotenv
import os
import json

from pydantic import EmailStr
from sqlmodel import Field, SQLModel, create_engine, Session

from models.machineCreate import MachineCreate
from models.machineUpdate import MachineUpdate
from models.machineStatus import MachineStatus


class Machine(SQLModel, table=True):
    id: int = Field(default=None, primary_key = True)
    name: str
    location: str
    email: EmailStr
    number: int
    float_number: float
    enum: str
    created_at: str = Field(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    edited_at: str = Field(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    password: str

load_dotenv(".env")

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

class CRUDMachine:
    STATUS_404 = 'Not found'
    STATUS_500 = 'Database error'

    @staticmethod
    def getAll(session: Session) -> List[Machine]:
        machines = session.query(Machine).all()
        machineDicts = [machine.dict() for machine in machines]
        return json.dumps(machineDicts)
    
    @staticmethod
    def get(session: Session, machine_id: int = None, email: EmailStr = None) -> Machine:
        query = session.query(Machine)
        if id:
            query = query.filter(Machine.id == machine_id)
        if email:
            query = query.filter(Machine.email == email)
        machines = query.all()

        return machines
    
    @staticmethod
    def create(session: Session, machine: str) -> Machine:
        machineObj = Machine.from_orm(machine)
        session.add(machineObj)
        session.commit()
        session.refresh(machineObj)
        
        machineDicts = machineObj.dict()
        return json.dumps(machineDicts)

    @staticmethod
    def update(session: Session, machine_id: int, machineUpdate: MachineUpdate) -> Machine:
        machineData = session.get(Machine, machine_id)
        print(machineData)
        for key, value in machineUpdate.dict(exclude_unset=True).items():
            setattr(machineData, key, value)

        machineData.edited_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        session.commit()
        session.refresh(machineData)
        
        return machineData
    
    @staticmethod
    def get_schema(method: str):
        if method == "create":
            return json.dumps(MachineCreate.schema())
        elif method == "update":
            return json.dumps(MachineUpdate.schema())
        
        return {"message": "Invalid method"}
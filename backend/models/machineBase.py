from pydantic import BaseModel, EmailStr
from .machineStatus import MachineStatus

class MachineBase(BaseModel):
    name: str
    location: str
    email: EmailStr
    number: int
    float_number: float
    enum: str
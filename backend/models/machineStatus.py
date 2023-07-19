from enum import Enum

class MachineStatus(str, Enum):
    active = "active"
    not_active = "not_active"
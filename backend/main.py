from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import List, Dict
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Process(BaseModel):
    id: int
    arrival_time: float
    burst_time: float
    priority: int

class SystemState(BaseModel):
    processes: List[Process]
    num_processors: int

class AllocationResult(BaseModel):
    processor_allocations: Dict[int, List[Process]]
    waiting_times: Dict[int, float]
    turnaround_times: Dict[int, float]
    utilization: float



@app.post("/distribute", response_model=AllocationResult)
async def distribute_workload(system_state: SystemState):
    try:
        result = calculate_workload_distribution(system_state.processes, system_state.num_processors)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/generate-test-data")
async def generate_test_data(num_processes: int = 10, num_processors: int = 4):
    processes = []
    for i in range(num_processes):
        processes.append(Process(
            id=i,
            arrival_time=random.uniform(0, 10),
            burst_time=random.uniform(1, 5),
            priority=random.randint(1, 10)
        ))
    
    system_state = SystemState(
        processes=processes,
        num_processors=num_processors
    )
    
    result = calculate_workload_distribution(processes, num_processors)
    return {
        "system_state": system_state,
        "allocation_result": result
    } 
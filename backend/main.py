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



def calculate_workload_distribution(processes: List[Process], num_processors: int) -> AllocationResult:
    # Sort processes by priority (higher priority first)
    sorted_processes = sorted(processes, key=lambda x: x.priority, reverse=True)
    
    # Initialize processor queues and completion times
    processor_queues = {i: [] for i in range(num_processors)}
    processor_completion_times = {i: 0 for i in range(num_processors)}
    
    # Distribute processes to processors
    for process in sorted_processes:
        # Find processor with earliest completion time
        min_time_processor = min(processor_completion_times.items(), key=lambda x: x[1])[0]
        processor_queues[min_time_processor].append(process)
        processor_completion_times[min_time_processor] += process.burst_time
    
    # Calculate waiting and turnaround times
    waiting_times = {}
    turnaround_times = {}
    
    for processor_id, queue in processor_queues.items():
        current_time = 0
        for process in queue:
            # Start time is the maximum of current processor time and process arrival time
            start_time = max(current_time, process.arrival_time)
            
            # Waiting time is the time between arrival and start of execution
            waiting_time = start_time - process.arrival_time
            waiting_times[process.id] = max(0, waiting_time)  # Ensure waiting time is not negative
            
            # Completion time is start time plus burst time
            completion_time = start_time + process.burst_time
            
            # Turnaround time is completion time minus arrival time
            turnaround_time = completion_time - process.arrival_time
            turnaround_times[process.id] = max(0, turnaround_time)  # Ensure turnaround time is not negative
            
            current_time = completion_time
    
    # Calculate system utilization
    total_processing_time = sum(process.burst_time for process in processes)
    max_completion_time = max(processor_completion_times.values())
    total_available_time = num_processors * max_completion_time
    
    # Utilization is the ratio of total processing time to total available time
    utilization = min(100, (total_processing_time / total_available_time) * 100) if total_available_time > 0 else 0
    
    return AllocationResult(
        processor_allocations=processor_queues,
        waiting_times=waiting_times,
        turnaround_times=turnaround_times,
        utilization=utilization
    )

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
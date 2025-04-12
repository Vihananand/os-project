'use client';

import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const algorithmCode = `from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import List, Dict
import random

app = FastAPI()

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
    sorted_processes = sorted(processes, key=lambda x: x.priority, reverse=True)
    
    processor_queues = {i: [] for i in range(num_processors)}
    processor_completion_times = {i: 0 for i in range(num_processors)}
    
    for process in sorted_processes:
        min_time_processor = min(processor_completion_times.items(), key=lambda x: x[1])[0]
        processor_queues[min_time_processor].append(process)
        processor_completion_times[min_time_processor] += process.burst_time
    
    waiting_times = {}
    turnaround_times = {}
    
    for processor_id, queue in processor_queues.items():
        current_time = 0
        for process in queue:
            start_time = max(current_time, process.arrival_time)
            
            waiting_time = start_time - process.arrival_time
            waiting_times[process.id] = max(0, waiting_time)  # Ensure waiting time is not negative
            
            completion_time = start_time + process.burst_time
            
            turnaround_time = completion_time - process.arrival_time
            turnaround_times[process.id] = max(0, turnaround_time)  # Ensure turnaround time is not negative
            
            current_time = completion_time
    
    total_processing_time = sum(process.burst_time for process in processes)
    max_completion_time = max(processor_completion_times.values())
    total_available_time = num_processors * max_completion_time
    
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
    } `;

export default function AlgorithmPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-background-start to-background-end">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center text-gradient py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Banker&apos;s Algorithm
        </motion.h1>

        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-primary">Implementation</h2>
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                borderRadius: '0.5rem',
                padding: '1.5rem',
                fontSize: '0.9rem',
              }}
            >
              {algorithmCode}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
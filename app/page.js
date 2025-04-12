'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [processors, setProcessors] = useState({});
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [numProcesses, setNumProcesses] = useState(10);
  const [numProcessors, setNumProcessors] = useState(4);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/generate-test-data?num_processes=${numProcesses}&num_processors=${numProcessors}`);
      const data = await response.json();
      setProcessors(data.allocation_result.processor_allocations);
      setStats({
        waitingTimes: data.allocation_result.waiting_times,
        turnaroundTimes: data.allocation_result.turnaround_times,
        utilization: data.allocation_result.utilization
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setProcessors({});
    setStats(null);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center text-gradient py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dynamic Workload Distribution System
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 stat-label">Number of Processes</label>
                <input
                  type="number"
                  value={numProcesses}
                  onChange={(e) => setNumProcesses(parseInt(e.target.value))}
                  className="input"
                  min="1"
                  max="20"
                />
              </div>
              <div>
                <label className="block mb-2 stat-label">Number of Processors</label>
                <input
                  type="number"
                  value={numProcessors}
                  onChange={(e) => setNumProcessors(parseInt(e.target.value))}
                  className="input"
                  min="1"
                  max="8"
                />
              </div>
              <button
                onClick={fetchData}
                className="btn w-full"
                disabled={loading}
              >
                {loading ? 'Generating' : 'Generate New Distribution'}
                {loading && <span className="loading-dots"></span>}
              </button>
            </div>
          </motion.div>

          {stats && (
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6">System Statistics</h2>
              <div className="space-y-4">
                <div>
                  <p className="stat-label">System Utilization</p>
                  <p className="stat-value">{stats.utilization.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="stat-label">Average Waiting Time</p>
                  <p className="stat-value">
                    {(Object.values(stats.waitingTimes).reduce((a, b) => a + b, 0) / Object.keys(stats.waitingTimes).length).toFixed(2)}s
                  </p>
                </div>
                <div>
                  <p className="stat-label">Average Turnaround Time</p>
                  <p className="stat-value">
                    {(Object.values(stats.turnaroundTimes).reduce((a, b) => a + b, 0) / Object.keys(stats.turnaroundTimes).length).toFixed(2)}s
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {Object.keys(processors).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(processors).map(([processorId, processes], index) => (
              <motion.div
                key={processorId}
                className="processor-card"
                style={{ '--index': index }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                  Processor {parseInt(processorId) + 1}
                </h3>
                <div className="space-y-3">
                  {processes.map((process) => (
                    <div
                      key={process.id}
                      className="process-card"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Process {process.id + 1}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          Priority {process.priority}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">Burst Time: {process.burst_time.toFixed(2)}s</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

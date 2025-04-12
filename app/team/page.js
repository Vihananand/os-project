'use client';

import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Vihan',
    role: 'Frontend Developer',
    description: 'Specialized in React and Next.js development',
    image: '/vihan.jpg', // You'll need to add these images
  },
  {
    name: 'Abhinav',
    role: 'Backend Developer',
    description: 'Expert in Python and FastAPI',
    image: '/abhinav.jpg',
  },
  {
    name: 'Tanish',
    role: 'Full Stack Developer',
    description: 'Skilled in both frontend and backend technologies',
    image: '/tanish.jpg',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
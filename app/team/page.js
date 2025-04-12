'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Vihan'
  },
  {
    name: 'Abhinav'
  },
  {
    name: 'Tanish'
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen px-8 py-24 bg-gradient-to-b from-background-start to-background-end">
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
                <Image
                  src={`https://ui-avatars.com/api/?name=${member.name}&background=random&color=fff&size=400`}
                  alt={`${member.name}'s avatar`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-text-primary">{member.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
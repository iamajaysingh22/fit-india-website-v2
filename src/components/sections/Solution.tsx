'use client';

import { motion } from 'framer-motion';
import { Card, Section } from '@/components/ui';

interface SolutionStepProps {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const solutionSteps: SolutionStepProps[] = [
  {
    step: "Step 1",
    icon: <span className="text-4xl">🔍</span>,
    title: "Discover",
    description: "Browse gyms near you\nCompare amenities, locations, and reviews\nFilter by your fitness goals",
    delay: 0.1
  },
  {
    step: "Step 2", 
    icon: <span className="text-4xl">📅</span>,
    title: "Try",
    description: "Book FREE trial sessions\nExperience the gym firsthand\nNo payment. No commitment.",
    delay: 0.2
  },
  {
    step: "Step 3",
    icon: <span className="text-4xl">✨</span>,
    title: "Join",
    description: "Found your match? Join seamlessly\nDirect membership conversion\nStart your fitness journey with confidence",
    delay: 0.3
  }
];

function SolutionStepCard({ step, icon, title, description, delay = 0 }: SolutionStepProps) {
  return (
    <Card 
      delay={delay}
      className="p-8 text-center group hover:shadow-xl transition-all duration-300 relative"
    >
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {step}
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex justify-center mb-6 mt-4"
      >
        <div className="p-4 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-h3 text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </Card>
  );
}

export default function Solution() {
  return (
    <Section id="solution" background="white" padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            How to Find Gyms Near Me with{' '}
            <span className="gradient-text">Free Fitness Center Trials</span>
          </h2>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {solutionSteps.map((step) => (
          <SolutionStepCard
            key={step.title}
            {...step}
            delay={step.delay}
          />
        ))}
      </div>

      {/* Visual Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 flex justify-center items-center space-x-4 overflow-hidden"
      >
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-0.5 bg-primary-300"
          />
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-12 h-0.5 bg-primary-300"
          />
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
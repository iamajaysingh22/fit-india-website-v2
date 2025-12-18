'use client';

import { motion } from 'framer-motion';
import { Card, Section } from '@/components/ui';
import { FeatureCardProps } from '@/types';

const problems: FeatureCardProps[] = [
  {
    icon: <span className="text-4xl">💸</span>,
    title: "Expensive Commitments",
    description: "Pay ₹5,000-₹15,000 upfront without knowing if the gym is right for you",
    delay: 0.1
  },
  {
    icon: <span className="text-4xl">😞</span>,
    title: "Disappointing Experiences",
    description: "Discover broken equipment, crowded spaces, or unfriendly staff after you've already paid",
    delay: 0.2
  },
  {
    icon: <span className="text-4xl">🔒</span>,
    title: "Locked In",
    description: "Stuck with long-term contracts at gyms that don't match your fitness goals",
    delay: 0.3
  }
];

function ProblemCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <Card 
      delay={delay}
      className="p-8 text-center group hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex justify-center mb-6"
      >
        <div className="p-4 bg-red-50 rounded-2xl group-hover:bg-red-100 transition-colors duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-h3 text-neutral-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-neutral-600 leading-relaxed">
        {description}
      </p>
    </Card>
  );
}

export default function Features() {
  return (
    <Section id="features" background="gray" padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            Tired of Wasting Money on{' '}
            <span className="text-red-600">Wrong Gym Memberships?</span>
          </h2>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {problems.map((problem) => (
          <ProblemCard
            key={problem.title}
            {...problem}
            delay={problem.delay}
          />
        ))}
      </div>
    </Section>
  );
}
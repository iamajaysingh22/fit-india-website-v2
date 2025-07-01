'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Target, 
  Bell 
} from 'lucide-react';
import { Card, Section } from '@/components/ui';
import { FeatureCardProps } from '@/types';

const features: FeatureCardProps[] = [
  {
    icon: <MapPin className="w-8 h-8 text-primary-500" />,
    title: "Discover Nearby Gyms",
    description: "Find gyms, pools, badminton courts, and yoga studios near you with real-time availability and detailed information.",
    delay: 0.1
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary-500" />,
    title: "Flexible Memberships",
    description: "Choose from monthly, quarterly, or yearly plans that fit your lifestyle and budget. Pause and resume anytime.",
    delay: 0.2
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
    title: "Fitness Analytics",
    description: "Monitor your workouts, attendance, and progress with detailed insights, achievements, and performance tracking.",
    delay: 0.3
  },
  {
    icon: <Users className="w-8 h-8 text-primary-500" />,
    title: "Join the Community",
    description: "Connect with fellow fitness enthusiasts, share achievements, join challenges, and stay motivated together.",
    delay: 0.4
  },
  {
    icon: <Target className="w-8 h-8 text-primary-500" />,
    title: "Custom Workout Plans",
    description: "Get personalized workout routines based on your goals, preferences, fitness level, and available equipment.",
    delay: 0.5
  },
  {
    icon: <Bell className="w-8 h-8 text-primary-500" />,
    title: "Stay Updated",
    description: "Receive reminders, gym updates, class schedules, and motivational messages to keep you on track.",
    delay: 0.6
  }
];

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <Card 
      delay={delay}
      className="p-8 text-center group hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex justify-center mb-6"
      >
        <div className="p-4 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-h3 text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
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
            Everything You Need for Your{' '}
            <span className="gradient-text">Fitness Journey</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-3xl mx-auto">
            Discover powerful features designed to transform how you approach fitness. 
            From finding the perfect gym to tracking your progress, we&apos;ve got you covered.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            delay={feature.delay}
          />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 max-w-2xl mx-auto">
          <h3 className="text-h2 text-neutral-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-neutral-600 mb-6">
            Join thousands of users who have already transformed their fitness journey with FitIndia.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://play.google.com/store', '_blank')}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Download Free App
          </motion.button>
        </div>
      </motion.div>
    </Section>
  );
}
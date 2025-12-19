'use client';

import { motion } from 'framer-motion';
import { Card, Section, Button } from '@/components/ui';
import { FeatureCardProps } from '@/types';

const gymSeekerFeatures: FeatureCardProps[] = [
  {
    icon: <span className="text-4xl">🎁</span>,
    title: "Unlimited Free Trials",
    description: "Try every gym in your area - completely FREE\nNo credit card required\nSave ₹5,000+ on memberships you don't want",
    delay: 0.1
  },
  {
    icon: <span className="text-4xl">📍</span>,
    title: "Instant Gym Discovery",
    description: "500+ verified gyms within 5km radius\nReal-time availability and pricing\nSee photos, reviews, and ratings before visiting",
    delay: 0.2
  },
  {
    icon: <span className="text-4xl">⏱️</span>,
    title: "30-Second Booking",
    description: "Reserve your spot faster than ordering coffee\nFlexible cancellation up to 2 hours before\nAutomatic reminders so you never miss workouts",
    delay: 0.3
  },
  {
    icon: <span className="text-4xl">💪</span>,
    title: "Perfect Gym Matching",
    description: "AI-powered recommendations based on your goals\nFind gyms with your favorite equipment\n85% success rate in finding perfect matches",
    delay: 0.4
  },
  {
    icon: <span className="text-4xl">📱</span>,
    title: "Your Fitness Hub",
    description: "Track all gym visits in one place\nCompare experiences and pricing\nConnect directly with gym managers",
    delay: 0.5
  },
  {
    icon: <span className="text-4xl">🔄</span>,
    title: "Instant Membership",
    description: "Join your favorite gym with exclusive discounts\nSkip the paperwork with digital sign-ups\nCancel anytime - no questions asked",
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
      
      <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </Card>
  );
}

export default function GymSeekerFeatures() {
  const handleDownloadClick = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  return (
    <Section id="gym-seeker-features" background="gray" padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            Why 15,000+ Fitness Enthusiasts{' '}
            <span className="gradient-text">Choose FitByConnect</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-3xl mx-auto">
            <strong>Stop wasting money on wrong gym memberships!</strong> Join thousands who found their perfect gym 
            through free trials. Book instantly, try risk-free, and join only when you're 100% sure.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gymSeekerFeatures.map((feature) => (
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
            Don't Waste Another Day in the Wrong Gym
          </h3>
          <p className="text-neutral-600 mb-6">
            <strong>500+ people found their perfect gym this week.</strong> Your ideal workout space is waiting. 
            Start your first FREE trial in under 60 seconds.
          </p>
          <Button
            size="lg"
            onClick={handleDownloadClick}
            className="text-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-xl transform hover:scale-105 transition-all duration-200 text-neutral-900 font-bold border-2 border-neutral-900"
          >
            Book My Free Trial Now
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
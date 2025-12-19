'use client';

import { motion } from 'framer-motion';
import { Card, Section, Button } from '@/components/ui';
import { FeatureCardProps } from '@/types';

const gymSeekerFeatures: FeatureCardProps[] = [
  {
    icon: <span className="text-4xl">🎁</span>,
    title: "Free Trial Sessions",
    description: "Try any gym before committing\nOne free trial per gym\nExperience facilities, trainers, and community",
    delay: 0.1
  },
  {
    icon: <span className="text-4xl">📍</span>,
    title: "Smart Discovery",
    description: "GPS-based gym search\nFind gyms within walking distance\nFilter by amenities and goals",
    delay: 0.2
  },
  {
    icon: <span className="text-4xl">⏱️</span>,
    title: "Easy Booking",
    description: "Book trials in seconds\nChoose your preferred time slot\nInstant confirmation",
    delay: 0.3
  },
  {
    icon: <span className="text-4xl">💪</span>,
    title: "Personalized Matching",
    description: "Set your fitness goals\nMatch with gyms that fit your needs\nTrack your gym journey",
    delay: 0.4
  },
  {
    icon: <span className="text-4xl">📱</span>,
    title: "All-in-One Dashboard",
    description: "Manage all your bookings\nTrack membership progress\nContact gyms directly",
    delay: 0.5
  },
  {
    icon: <span className="text-4xl">🔄</span>,
    title: "Join When Ready",
    description: "Skip the trial? Request direct membership\nConvert after trial with one tap\nNo paperwork hassles",
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
            Best Gym Membership Booking App with{' '}
            <span className="gradient-text">Free Trial Sessions</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-3xl mx-auto">
            Find gyms near me, book free gym trials, and discover the best fitness centers. 
            From gym trial sessions to seamless membership booking, we've got your fitness journey covered.
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
            Ready to Find Your Perfect Gym?
          </h3>
          <p className="text-neutral-600 mb-6">
            Join thousands of users who have already found their fitness home with free trials.
          </p>
          <Button
            size="lg"
            onClick={handleDownloadClick}
            className="text-lg"
          >
            Find a Trial
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
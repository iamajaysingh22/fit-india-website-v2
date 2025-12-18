'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Users, MapPin } from 'lucide-react';
import { Button, Section } from '@/components/ui';
import { scrollToSection } from '@/lib/utils';

const stats = [
  { icon: Users, label: 'Active Users', value: '50K+' },
  { icon: MapPin, label: 'Partner Gyms', value: '500+' },
  { icon: Star, label: 'App Rating', value: '4.8' },
];

export default function Hero() {
  const handleDownloadClick = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  const handleGymOwnerClick = () => {
    window.location.href = '/gym-partner';
  };

  return (
    <Section id="hero" background="white" padding="xl" className="pt-32 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-hero text-neutral-900 leading-tight"
            >
              Find Your Perfect Gym.{' '}
              <span className="gradient-text">Try Before You Commit.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-large text-neutral-600 max-w-lg"
            >
              Book free trial sessions at top gyms near you. 
              Experience the facilities, meet the trainers, and join only when you're sure.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={handleDownloadClick}
              leftIcon={<Download className="w-5 h-5" />}
              className="text-lg"
            >
              Download App
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGymOwnerClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg"
            >
              List Your Gym
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - App Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative z-10">
            {/* Phone Mockup */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mx-auto w-72 h-[600px] bg-neutral-900 rounded-3xl p-2 shadow-2xl"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center">
                <div className="text-white text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">FitIndia</h3>
                    <p className="text-sm opacity-90">Your Fitness Companion</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -left-8 bg-white rounded-xl shadow-lg p-4 border border-neutral-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Workout Complete!</div>
                  <div className="text-xs text-neutral-600">+50 XP earned</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0],
                x: [0, -15, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -right-8 bg-white rounded-xl shadow-lg p-4 border border-neutral-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Gym Found</div>
                  <div className="text-xs text-neutral-600">2.5km away</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl -z-10 transform scale-150"></div>
        </motion.div>
      </div>

      {/* Google Play Store Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadClick}
          className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs opacity-90">GET IT ON</div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </Section>
  );
}
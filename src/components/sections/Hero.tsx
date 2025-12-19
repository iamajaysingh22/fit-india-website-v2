'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Users, MapPin } from 'lucide-react';
import { Button, Section } from '@/components/ui';
import { scrollToSection } from '@/lib/utils';

const stats = [
  { icon: Users, label: 'Happy Members', value: '15K+' },
  { icon: MapPin, label: 'Gyms Available', value: '500+' },
  { icon: Star, label: 'Success Rate', value: '85%' },
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
      {/* Limited Time Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-accent-600 to-accent-500 text-white p-4 rounded-2xl mb-8 text-center"
      >
        <p className="font-semibold">
          🔥 <strong>FREE TRIALS ENDING SOON!</strong> Join 500+ people who booked this week. 
          <span className="underline ml-2">Limited slots available in your area</span>
        </p>
      </motion.div>

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
              <span className="gradient-text">Free Gym Trials</span> Near You -{' '}
              No Contracts, No Risk
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-large text-neutral-600 max-w-lg"
            >
              <strong>Try unlimited gyms for FREE.</strong> Book instantly, show up, and join only if you love it. 
              Over 15,000 fitness enthusiasts already found their perfect gym.
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
              leftIcon={<Download className="w-5 h-5 text-neutral-900" />}
              className="text-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-lg text-neutral-900 font-bold border-2 border-neutral-900"
            >
              Start Your Free Trial Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGymOwnerClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
            >
              Partner With Us
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

        {/* Right Column - App Screenshot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative z-10">
            {/* Real App Screenshot */}
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
              className="mx-auto w-72 h-auto rounded-3xl shadow-2xl overflow-hidden"
            >
              <img 
                src="/home-screen.png" 
                alt="FitByConnect App - Discover Gyms and Book Free Trials"
                className="w-full h-auto object-cover rounded-3xl"
              />
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
                  <div className="text-sm font-semibold text-neutral-900">Trial Booked!</div>
                  <div className="text-xs text-neutral-600">Fitness First - Today 6PM</div>
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
                  <div className="text-sm font-semibold text-neutral-900">500+ Gyms</div>
                  <div className="text-xs text-neutral-600">Available near you</div>
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-label="Google Play Store icon">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs opacity-90">DOWNLOAD APP</div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </Section>
  );
}
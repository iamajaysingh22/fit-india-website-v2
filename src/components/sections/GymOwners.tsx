'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  Megaphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button, Card, Section } from '@/components/ui';
import { scrollToSection } from '@/lib/utils';
import { GymBenefitProps } from '@/types';

const benefits: GymBenefitProps[] = [
  {
    icon: <span className="text-4xl">📈</span>,
    title: "Increase Memberships",
    description: "Connect with motivated gym seekers\n70% trial-to-member conversion rate\nFill empty slots during off-peak hours"
  },
  {
    icon: <span className="text-4xl">🎯</span>,
    title: "Qualified Leads",
    description: "Attract people genuinely interested\nPre-qualified fitness goals matching\nHigher retention rates"
  },
  {
    icon: <span className="text-4xl">⚡</span>,
    title: "Instant Conversion Tools",
    description: "Convert trials to memberships with one tap\nSmart dashboard to manage all leads\nNever miss a hot lead again"
  },
  {
    icon: <span className="text-4xl">📊</span>,
    title: "Powerful Analytics",
    description: "Track trial attendance and feedback\nMonitor conversion rates\nUnderstand what attracts members"
  },
  {
    icon: <span className="text-4xl">💼</span>,
    title: "Professional Dashboard",
    description: "Manage bookings and members\nAutomated reminders and notifications\nTrack revenue and growth"
  },
  {
    icon: <span className="text-4xl">🆓</span>,
    title: "Zero Commission on Direct Bookings",
    description: "No hidden fees or commissions\nKeep 100% of membership revenue\nPay only for premium features (optional)"
  }
];

const dashboardFeatures = [
  "Real-time member check-ins",
  "Revenue tracking & analytics",
  "Membership plan management",
  "Automated billing system",
  "Member communication tools",
  "Promotional campaign manager",
  "Equipment maintenance tracker",
  "Staff management system"
];

function BenefitCard({ icon, title, description }: GymBenefitProps) {
  return (
    <Card className="p-6 text-center group">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex justify-center mb-4"
      >
        <div className="p-3 bg-neutral-50 rounded-xl group-hover:bg-neutral-100 transition-colors duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </Card>
  );
}

export default function GymOwners() {
  const handleGetStartedClick = () => {
    scrollToSection('contact');
  };

  const handleRequestDemoClick = () => {
    // In a real app, this would open a demo booking modal
    scrollToSection('contact');
  };

  return (
    <Section id="gym-owners" background="white" padding="xl">
      {/* Hero Sub-section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            Grow Your Gym with <span className="gradient-text">Quality Leads</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-3xl mx-auto mb-8">
            Turn trial visitors into loyal members. Reach fitness enthusiasts 
            actively looking for their perfect gym.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleGetStartedClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg bg-primary-600 hover:bg-primary-700"
            >
              Partner With Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleRequestDemoClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg border-primary-600 text-primary-600 hover:bg-primary-50"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <BenefitCard {...benefit} />
          </motion.div>
        ))}
      </div>

      {/* Dashboard Preview */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-2xl p-6 shadow-2xl">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-neutral-900">Gym Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Mock Dashboard Content */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary-600">248</div>
                    <div className="text-sm text-neutral-600">Active Members</div>
                  </div>
                  <div className="bg-accent-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent-600">₹45,280</div>
                    <div className="text-sm text-neutral-600">Monthly Revenue</div>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-secondary-600">89%</div>
                    <div className="text-sm text-neutral-600">Occupancy Rate</div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="h-24 bg-gradient-to-r from-primary-200 to-secondary-200 rounded opacity-75"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-neutral-100"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-neutral-900">Live Updates</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Features List */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-h2 text-neutral-900 mb-4">
              Complete Business Management Suite
            </h3>
            <p className="text-neutral-600 mb-6">
              Everything you need to run a successful fitness business, all in one powerful platform.
            </p>
          </div>

          <div className="space-y-3">
            {dashboardFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                <span className="text-neutral-700">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-6">
            <Button
              size="lg"
              onClick={handleGetStartedClick}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Partner with Us
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Social Proof Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 bg-gradient-primary rounded-2xl p-8 text-center text-white"
      >
        <h3 className="text-h2 mb-6">Trusted by Gym Owners and Fitness Enthusiasts</h3>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">15,000+</div>
            <div className="opacity-90">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="opacity-90">Partner Gyms</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">85%</div>
            <div className="opacity-90">Conversion Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">₹50L+</div>
            <div className="opacity-90">Memberships Generated</div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
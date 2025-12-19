'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, Section } from '@/components/ui';
import { TestimonialProps } from '@/types';

const testimonials: TestimonialProps[] = [
  {
    content: "This app completely changed how I approach fitness. Finding gyms near me and tracking my progress has never been easier! The community features keep me motivated every day.",
    author: "Sarah Sharma",
    role: "Fitness Enthusiast",
    rating: 5
  },
  {
    content: "The membership flexibility is amazing. I can pause when traveling and resume when I'm back. Perfect for my busy lifestyle as a consultant.",
    author: "Rajesh Kumar",
    role: "Business Professional",
    rating: 5
  },
  {
    content: "Love the community features! I've made workout buddies and stay motivated through the social challenges. The yoga studio finder is fantastic.",
    author: "Priya Patel",
    role: "Yoga Practitioner",
    rating: 5
  },
  {
    content: "Our membership retention increased by 40% since joining this platform. The management tools are incredible and save us hours every week!",
    author: "James Wilson",
    role: "FitZone Gym Owner",
    rating: 5
  },
  {
    content: "The analytics help me understand my members better. I can now offer exactly what they need and grow my business strategically. Highly recommended!",
    author: "Anjali Singh",
    role: "Wellness Studio Owner",
    rating: 5
  }
];

function TestimonialCard({ content, author, role, rating }: TestimonialProps) {
  return (
    <Card className="p-8 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Quote className="w-8 h-8 text-primary-500 mr-3" />
        <div className="flex">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      
      <blockquote className="text-neutral-700 mb-6 flex-grow italic leading-relaxed">
        &ldquo;{content}&rdquo;
      </blockquote>
      
      <div className="mt-auto">
        <div className="font-semibold text-neutral-900">{author}</div>
        <div className="text-sm text-neutral-500">{role}</div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonials" background="white" padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            What Our <span className="gradient-text">Community</span> Says
          </h2>
          <p className="text-large text-neutral-600 max-w-2xl mx-auto">
            Join thousands of satisfied users and gym owners who have transformed 
            their fitness journey with FitByConnect.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <TestimonialCard {...testimonial} />
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="bg-neutral-50 rounded-2xl p-8">
          <h3 className="text-h3 text-neutral-900 mb-8">Trusted by the Best</h3>
          
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-neutral-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">500+</div>
              <div className="text-neutral-600">Partner Gyms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">4.8</div>
              <div className="text-neutral-600">App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">1M+</div>
              <div className="text-neutral-600">Workouts Tracked</div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
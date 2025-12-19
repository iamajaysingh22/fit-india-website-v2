'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building } from 'lucide-react';
import { Section } from '@/components/ui';

interface FAQItem {
  question: string;
  answer: string;
}

const gymPartnerFAQs: FAQItem[] = [
  {
    question: "How much does it cost?",
    answer: "Listing is FREE. We don't charge commission on memberships. Optional premium features available."
  },
  {
    question: "How do I get paid for memberships?",
    answer: "Members pay you directly. We don't handle payments or take any commission."
  },
  {
    question: "What if trial users don't show up?",
    answer: "Our reminder system reduces no-shows by 70%. Plus, you can set capacity limits per slot."
  },
  {
    question: "How quickly can I start receiving trial bookings?",
    answer: "Once verified (24 hours), you'll start receiving bookings immediately. Most gyms get their first trial within 48 hours."
  },
  {
    question: "Can I manage multiple gym locations?",
    answer: "Yes! Our Enterprise plan supports multi-location management from a single dashboard."
  }
];

function FAQAccordion({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-neutral-50 transition-colors duration-200 flex items-center justify-between"
      >
        <span className="font-semibold text-neutral-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <p className="text-neutral-700 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GymPartnerFAQ() {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (itemIndex: number) => {
    setOpenItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  return (
    <Section id="gym-partner-faq" background="gray" padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            Questions from <span className="gradient-text">Gym Partners</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-2xl mx-auto">
            Common questions from gym owners about partnering with FitByConnect. 
            Ready to grow your business? We're here to help.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Section Header */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Building className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-h2 text-neutral-900">For Gym Owners</h3>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {gymPartnerFAQs.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
              >
                <FAQAccordion
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems[itemIndex] || false}
                  onToggle={() => toggleItem(itemIndex)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-16"
      >
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 max-w-2xl mx-auto">
          <h3 className="text-h3 text-neutral-900 mb-4">
            Ready to partner with us?
          </h3>
          <p className="text-neutral-600 mb-6">
            Join hundreds of successful gym owners growing their business with quality leads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Partner With Us
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
              className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
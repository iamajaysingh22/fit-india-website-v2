'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users } from 'lucide-react';
import { Section } from '@/components/ui';

interface FAQItem {
  question: string;
  answer: string;
}

const userFAQs: FAQItem[] = [
  {
    question: "Are the trial sessions really free?",
    answer: "Yes! Absolutely free. No payment required. Just book and show up."
  },
  {
    question: "How many gyms can I try?",
    answer: "You can try unlimited gyms. One trial per gym to give everyone a fair chance."
  },
  {
    question: "What if I don't want to join after the trial?",
    answer: "No problem! There's zero obligation. Try as many gyms as you need to find your perfect fit."
  },
  {
    question: "Can I book directly without a trial?",
    answer: "Yes! If you're ready to join, use our \"Request to Join Now\" feature for instant membership processing."
  },
  {
    question: "Is my data safe?",
    answer: "We take privacy seriously. Your data is encrypted and never shared without permission."
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

export default function UserFAQ() {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (itemIndex: number) => {
    setOpenItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  return (
    <Section id="user-faq" background="white" padding="xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-h1 text-neutral-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-large text-neutral-600 max-w-2xl mx-auto">
            Everything you need to know about finding and booking free gym trials. 
            Can't find the answer you're looking for? Feel free to contact our support team.
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
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-h2 text-neutral-900">For Gym Seekers</h3>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {userFAQs.map((item, itemIndex) => (
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
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-h3 text-neutral-900 mb-4">
            Still Thinking? Your Perfect Gym is One Tap Away
          </h3>
          <p className="text-neutral-600 mb-6">
            <strong>Join 15,000+ smart fitness enthusiasts</strong> who stopped overpaying for gyms they hate. 
            Your first FREE trial takes 30 seconds to book.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://play.google.com/store', '_blank')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform text-neutral-900 border-2 border-neutral-900"
          >
            Get Started - It's FREE
          </motion.button>
        </div>
      </motion.div>
    </Section>
  );
}
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Building } from 'lucide-react';
import { Section } from '@/components/ui';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "For Users",
    icon: <Users className="w-6 h-6" />,
    items: [
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
    ]
  },
  {
    title: "For Gym Owners",
    icon: <Building className="w-6 h-6" />,
    items: [
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
    ]
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

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Section id="faq" background="gray" padding="xl">
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
            Everything you need to know about FitByConnect. Can't find the answer you're looking for? 
            Feel free to contact our support team.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {faqSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
            className="space-y-6"
          >
            {/* Section Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-primary-100 rounded-xl">
                {section.icon}
              </div>
              <h3 className="text-h2 text-neutral-900">{section.title}</h3>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => {
                const key = `${sectionIndex}-${itemIndex}`;
                return (
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
                      isOpen={openItems[key] || false}
                      onToggle={() => toggleItem(sectionIndex, itemIndex)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
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
            Still have questions?
          </h3>
          <p className="text-neutral-600 mb-6">
            Our support team is here to help you get started with FitByConnect.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '#contact'}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Contact Support
          </motion.button>
        </div>
      </motion.div>
    </Section>
  );
}
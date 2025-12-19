'use client';

import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Download,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui';
import { scrollToSection } from '@/lib/utils';
import { FooterSection, SocialLink } from '@/types';

const footerSections: FooterSection[] = [
  {
    title: 'For Users',
    links: [
      { name: 'Find a Trial', href: '#hero' },
      { name: 'How it Works', href: '#features' },
      { name: 'Find Gyms', href: '#features' },
      { name: 'Track Progress', href: '#features' },
      { name: 'Support', href: '#contact' },
    ]
  },
  {
    title: 'For Gym Owners',
    links: [
      { name: 'Join as Partner', href: '#gym-owners' },
      { name: 'Business Solutions', href: '#gym-owners' },
      { name: 'Success Stories', href: '#testimonials' },
      { name: 'Resources', href: '#contact' },
      { name: 'Contact Sales', href: '#contact' },
    ]
  },
  {
    title: 'Legal & Support',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy', external: true },
      { name: 'Terms & Conditions', href: '/terms-and-conditions', external: true },
      { name: 'Cookie Policy', href: '#', external: true },
      { name: 'FAQ', href: '#user-faq' },
      { name: 'Help Center', href: '#contact' },
    ]
  }
];

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <Facebook className="w-5 h-5" />
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: <Instagram className="w-5 h-5" />
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: <Twitter className="w-5 h-5" />
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <Linkedin className="w-5 h-5" />
  },
];

export default function Footer() {
  const handleLinkClick = (href: string, external?: boolean) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else if (href.startsWith('/')) {
      // Internal page route
      window.location.href = href;
    } else {
      // Anchor link
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId);
    }
  };

  const handleDownloadClick = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <span className="text-2xl font-bold gradient-text">FitByConnect</span>
            </div>
            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              The complete fitness ecosystem connecting gym-goers with their perfect workout community. 
              Transform your fitness journey today.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-500" />
                <span className="text-neutral-300">support@fitindia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-500" />
                <span className="text-neutral-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="text-neutral-300">Mumbai, Maharashtra</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Download App Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-neutral-800 pt-12 mt-12"
        >
          <div className="text-center">
            <h3 className="text-h3 mb-4">Ready to Transform Your Fitness Journey?</h3>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Download the FitByConnect app today and join thousands of users who have already 
              transformed their fitness journey.
            </p>
            
            <Button
              size="lg"
              onClick={handleDownloadClick}
              leftIcon={<Download className="w-5 h-5" />}
              className="mb-8"
            >
              Find a Trial
            </Button>

            {/* Google Play Badge */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadClick}
              className="inline-flex items-center bg-black border border-neutral-700 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
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
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-neutral-800 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © 2024 FitByConnect. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <button 
                onClick={() => handleLinkClick('/privacy-policy', true)}
                className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('/terms-and-conditions', true)}
                className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Terms & Conditions
              </button>
              <button 
                onClick={() => handleLinkClick('#', true)}
                className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
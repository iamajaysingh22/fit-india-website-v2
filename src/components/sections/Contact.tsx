'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button, Input, Select, Textarea, Section } from '@/components/ui';
import { gymOwnerSchema, GymOwnerFormData } from '@/lib/validations';

const gymTypes = [
  { value: 'Gym', label: 'Gym' },
  { value: 'Pool', label: 'Swimming Pool' },
  { value: 'Badminton', label: 'Badminton Court' },
  { value: 'Yoga', label: 'Yoga Studio' },
  { value: 'Mixed', label: 'Mixed Facility' },
  { value: 'Other', label: 'Other' },
];

const memberCounts = [
  { value: '0-50', label: '0-50 members' },
  { value: '51-100', label: '51-100 members' },
  { value: '101-200', label: '101-200 members' },
  { value: '200+', label: '200+ members' },
];

const businessStages = [
  { value: 'New', label: 'New Business' },
  { value: 'Growing', label: 'Growing Business' },
  { value: 'Established', label: 'Established Business' },
];

const hearAboutOptions = [
  { value: 'Google', label: 'Google Search' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Advertisement', label: 'Advertisement' },
  { value: 'Other', label: 'Other' },
];

const interestOptions = [
  'Member Management',
  'Revenue Growth',
  'Analytics & Reporting',
  'Marketing Tools',
  'Automated Billing',
  'Mobile App for Members'
];

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<GymOwnerFormData>({
    resolver: zodResolver(gymOwnerSchema),
    defaultValues: {
      interests: [],
      privacyAccepted: false
    }
  });

  const watchedInterests = watch('interests') || [];

  const handleInterestChange = (interest: string, checked: boolean) => {
    const newInterests = checked 
      ? [...watchedInterests, interest]
      : watchedInterests.filter(i => i !== interest);
    
    setValue('interests', newInterests);
  };

  const onSubmit = async (data: GymOwnerFormData) => {
    setSubmitStatus('loading');
    
    try {
      const response = await fetch('/api/gym-owner-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <Section id="contact" background="gray" padding="xl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-h1 text-neutral-900 mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Gym?
            </h2>
            <p className="text-large text-neutral-600 max-w-2xl mx-auto">
              Join our platform and start growing your fitness business today. 
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-h3 text-neutral-900 mb-6">Ready to Transform Your Gym?</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-accent-800">Thank you! We&apos;ll get back to you within 24 hours.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800">Something went wrong. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Gym/Business Name"
                    {...register('gymName')}
                    error={errors.gymName?.message}
                    placeholder="Enter your gym name"
                  />
                  <Input
                    label="Owner/Manager Name"
                    {...register('ownerName')}
                    error={errors.ownerName?.message}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="Enter your email"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Gym Type"
                    options={gymTypes}
                    {...register('gymType')}
                    error={errors.gymType?.message}
                    placeholder="Select gym type"
                  />
                  <Input
                    label="Location/City"
                    {...register('location')}
                    error={errors.location?.message}
                    placeholder="Enter your location"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Current Member Count"
                    options={memberCounts}
                    {...register('currentMembers')}
                    error={errors.currentMembers?.message}
                    placeholder="Select member count"
                  />
                  <Select
                    label="Business Stage"
                    options={businessStages}
                    {...register('businessStage')}
                    error={errors.businessStage?.message}
                    placeholder="Select business stage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Areas of Interest
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                          checked={watchedInterests.includes(interest)}
                          onChange={(e) => handleInterestChange(interest, e.target.checked)}
                        />
                        <span className="text-sm text-neutral-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="mt-2 text-sm text-red-600">{errors.interests.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="How did you hear about us?"
                    options={hearAboutOptions}
                    {...register('hearAboutUs')}
                    placeholder="Select an option"
                  />
                </div>

                <Textarea
                  label="Additional Message"
                  {...register('message')}
                  error={errors.message?.message}
                  placeholder="Tell us more about your gym and what you&apos;re looking for..."
                  rows={4}
                />

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('privacyAccepted')}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 mt-1"
                  />
                  <label className="text-sm text-neutral-700">
                    I accept the{' '}
                    <a href="#" className="text-primary-600 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and agree to receive communications from FitByConnect.
                  </label>
                </div>
                {errors.privacyAccepted && (
                  <p className="text-sm text-red-600">{errors.privacyAccepted.message}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={submitStatus === 'loading'}
                  leftIcon={submitStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : undefined}
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-h3 text-neutral-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Phone</h4>
                    <p className="text-neutral-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <Mail className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Email</h4>
                    <p className="text-neutral-600">partners@fitindia.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent-50 rounded-lg">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Business Hours</h4>
                    <p className="text-neutral-600">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-neutral-600">Saturday: 10AM - 4PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Office</h4>
                    <p className="text-neutral-600">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-h3 mb-4">Partnership Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 opacity-90" />
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 opacity-90" />
                  <span>Free setup and training</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 opacity-90" />
                  <span>Regular feature updates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 opacity-90" />
                  <span>Marketing support</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
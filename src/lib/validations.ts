import * as z from 'zod';

export const gymOwnerSchema = z.object({
  gymName: z.string().min(2, 'Gym name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  gymType: z.enum(['Gym', 'Pool', 'Badminton', 'Yoga', 'Mixed', 'Other'], {
    required_error: 'Please select a gym type'
  }),
  location: z.string().min(2, 'Location is required'),
  currentMembers: z.string({
    required_error: 'Please select current member count'
  }),
  businessStage: z.enum(['New', 'Growing', 'Established'], {
    required_error: 'Please select business stage'
  }),
  interests: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  message: z.string().optional(),
  hearAboutUs: z.string().optional(),
  privacyAccepted: z.boolean().refine(val => val === true, 'You must accept the privacy policy')
});

export type GymOwnerFormData = z.infer<typeof gymOwnerSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
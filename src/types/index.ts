export interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
}

export interface GymBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterSection {
  title: string;
  links: {
    name: string;
    href: string;
    external?: boolean;
  }[];
}
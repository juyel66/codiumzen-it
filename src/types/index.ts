export interface Product {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  technologies: string[];
  externalUrl: string | null;
  logoUrl?: string;
  bannerUrl?: string;
  screenshots: string[];
  status: 'live' | 'in_development' | 'planned';
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface Service {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: string;
  deliverables: string[];
  technologies: string[];
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  clientName?: string;
  category: string;
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  technologies: string[];
  liveUrl?: string | null;
  coverImage?: string;
  gallery: string[];
  isFeatured: boolean;
  isPublished: boolean;
  isDemoContent?: boolean;
}

export interface Blog {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readingTimeMinutes: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Job {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits: string[];
  isActive: boolean;
}

export interface Lead {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  service?: string;
  budget?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed' | 'spam';
  createdAt: string;
  adminNotes?: string;
}

export interface JobApplication {
  id?: string;
  _id?: string;
  jobId?: string;
  position: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  createdAt: string;
  adminNotes?: string;
}

export interface SeoMetadata {
  pageKey: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface DashboardMetrics {
  statistics: {
    products: number;
    publishedProducts: number;
    services: number;
    projects: number;
    blogs: number;
    newLeads: number;
    openJobs: number;
    applications: number;
  };
  recentLeads: Lead[];
}

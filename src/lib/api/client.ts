import { Product, Service, Project, Blog, Job, Lead, DashboardMetrics } from '@/types';
import { COMPANY_INFO } from '@/config/company';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1/codiumzen').replace(/\/+$/, '');

/**
 * Universal fetch wrapper with robust error handling and timeout.
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<{ ok: boolean; data?: T; message?: string; status: number }> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as any) || {})
    };

    // Include admin token if present in browser
    if (typeof window !== 'undefined') {
      const czToken = localStorage.getItem('cz_admin_token');
      if (czToken && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${czToken}`;
        headers['x-cz-token'] = czToken;
      }
    }

    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeout);

    const contentType = res.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? await res.json() : await res.text();

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        message: body?.message || 'API request failed'
      };
    }

    return {
      ok: true,
      status: res.status,
      data: body?.data !== undefined ? body.data : body
    };
  } catch (err: any) {
    console.warn(`[CodiumZen API] Notice for ${endpoint}:`, err?.message || err);
    return {
      ok: false,
      status: 0,
      message: 'Network connection unavailable. Operating in resilient offline mode.'
    };
  }
}

// -------------------------------------------------------------
// PUBLIC API METHODS (with resilient static fallbacks)
// -------------------------------------------------------------

export async function fetchProducts(): Promise<Product[]> {
  const res = await apiFetch<{ items: Product[] }>('/products');
  if (res.ok && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
    return res.data.items;
  }
  // Default fallback data matching official products
  return [
    {
      name: 'IVAC Assistant',
      slug: 'ivac-assistant',
      tagline: 'High-speed automated visa appointment & telemetry suite',
      description: 'An advanced browser extension and cloud telemetry suite engineered for rapid slot detection, automated form-filling, anti-block proxying, and instant OTP synchronization for Indian Visa Application Centers (IVAC).',
      category: 'Automation & Productivity',
      features: [
        'Millisecond Slot Detection Engine',
        'Intelligent One-Click Auto-Fill',
        'Companion Android SMS OTP Relay Integration',
        'Anti-Block Encryption & Device Seat Licensing'
      ],
      technologies: ['TypeScript', 'Express.js', 'Chrome Extension MV3', 'MongoDB'],
      externalUrl: 'https://ivac-assistant.codiumzenit.com',
      screenshots: [],
      status: 'live',
      isFeatured: true,
      isPublished: true,
      displayOrder: 1
    },
    {
      name: 'Indian Visa Auto fill',
      slug: 'indian-visa-auto-fill',
      tagline: 'Intelligent automated form filling for visa submissions',
      description: 'A dedicated automated application assistant designed to streamline repetitive data entry for Indian visa submissions with high accuracy and validation checks. Official launch details coming soon.',
      category: 'Data Automation',
      features: [
        'Structured Applicant Data Import',
        'Cross-Browser Field Injection',
        'Real-time Data Sanitization',
        'Encrypted Local Storage'
      ],
      technologies: ['JavaScript', 'WebExtensions API', 'Node.js'],
      externalUrl: null,
      screenshots: [],
      status: 'in_development',
      isFeatured: true,
      isPublished: true,
      displayOrder: 2
    }
  ];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const res = await apiFetch<Product>(`/products/${slug}`);
  if (res.ok && res.data) return res.data;
  const list = await fetchProducts();
  return list.find((p) => p.slug === slug) || null;
}

export async function fetchServices(): Promise<Service[]> {
  const res = await apiFetch<Service[]>('/services');
  if (res.ok && res.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data;
  }
  return [
    {
      title: 'Custom Software Development',
      slug: 'custom-software-development',
      shortDescription: 'End-to-end bespoke software solutions engineered for scalability, resilience, and business growth.',
      fullDescription: 'We design, architect, and build custom web, cloud, and enterprise applications tailored precisely to your operational requirements.',
      iconName: 'Code',
      category: 'Software Engineering',
      deliverables: ['Custom Backend Architecture', 'REST/GraphQL APIs', 'Interactive Web Interfaces'],
      technologies: ['TypeScript', 'Node.js', 'React', 'Next.js', 'MongoDB'],
      isFeatured: true,
      isPublished: true,
      displayOrder: 1
    },
    {
      title: 'Web Application Development',
      slug: 'web-application-development',
      shortDescription: 'High-performance, modern web applications built with Next.js, React, and responsive architectures.',
      fullDescription: 'Our team crafts ultra-responsive, SEO-first, and accessible web applications designed for conversion and speed.',
      iconName: 'Layout',
      category: 'Frontend & Full-Stack',
      deliverables: ['Responsive User Interfaces', 'Progressive Web Apps (PWA)', 'Server-Side Rendering (SSR)'],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
      isFeatured: true,
      isPublished: true,
      displayOrder: 2
    },
    {
      title: 'SaaS Product Engineering',
      slug: 'saas-product-engineering',
      shortDescription: 'Turn product concepts into multi-tenant, subscription-ready software platforms.',
      fullDescription: 'Comprehensive SaaS development covering multi-tenant data partitioning, automated billing, and user management.',
      iconName: 'Server',
      category: 'Product Engineering',
      deliverables: ['Multi-Tenant Database Design', 'Payment Gateway Integration', 'Role-Based Access Control'],
      technologies: ['Node.js', 'Next.js', 'MongoDB', 'Docker'],
      isFeatured: true,
      isPublished: true,
      displayOrder: 3
    },
    {
      title: 'Automation & Workflow Solutions',
      slug: 'automation-workflow-solutions',
      shortDescription: 'Automate repetitive workflows, data scraping, browser tasks, and API integrations.',
      fullDescription: 'Save hundreds of manual hours with custom browser extensions, automation scripts, and event-driven webhook relays.',
      iconName: 'Cpu',
      category: 'Automation',
      deliverables: ['Custom Browser Extensions', 'Automated Data Extraction', 'Webhook Bridges'],
      technologies: ['Chrome Extensions API', 'Puppeteer', 'Node.js'],
      isFeatured: true,
      isPublished: true,
      displayOrder: 4
    }
  ];
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await apiFetch<{ items: Project[] }>('/projects');
  if (res.ok && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
    return res.data.items;
  }
  return [
    {
      title: 'IVAC Assistant Pro - Automation Suite',
      slug: 'ivac-assistant-pro',
      clientName: 'Commercial Product',
      category: 'Browser Extension & Cloud Backend',
      summary: 'High-concurrency automated slot booking assistant serving thousands of visa applicants with millisecond slot scanning and encrypted seat licensing.',
      challenge: 'Handling dynamic portal rendering and tight time windows reliably.',
      solution: 'Engineered specialized Chrome extension with Node.js telemetry backend.',
      results: ['Sub-second detection latency', '10,000+ daily telemetry requests handled smoothly'],
      technologies: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'Manifest V3'],
      liveUrl: 'https://ivac-assistant.codiumzenit.com',
      gallery: [],
      isFeatured: true,
      isPublished: true,
      isDemoContent: false
    },
    {
      title: 'Cloud Telemetry & Audit Engine',
      slug: 'cloud-telemetry-engine',
      clientName: 'Illustrative Case Study (Demo Content)',
      category: 'Cloud Infrastructure & Analytics',
      summary: 'High-throughput event ingestion pipeline built to process microservice logs, generate alerts, and visualize platform health in real-time.',
      challenge: 'Handling burst event streams without data loss.',
      solution: 'Implemented in-memory batching queues and asynchronous MongoDB bulk write operations.',
      results: ['500+ events per second throughput', 'Sub-10ms response times'],
      technologies: ['Node.js', 'MongoDB', 'Docker', 'Next.js'],
      liveUrl: null,
      gallery: [],
      isFeatured: true,
      isPublished: true,
      isDemoContent: true
    }
  ];
}

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await apiFetch<{ items: Blog[] }>('/blogs');
  if (res.ok && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
    return res.data.items;
  }
  return [
    {
      title: 'Architecting Resilient Web APIs for High-Concurrency Workloads',
      slug: 'architecting-resilient-web-apis',
      excerpt: 'How modern Node.js and TypeScript backends handle high-volume traffic with minimal memory overhead using native driver pooling and stateless JWT validation.',
      content: 'When scaling production web services, architectural simplicity often trumps complex multi-layered abstractions. By pairing native MongoDB connection pooling with stateless HMAC-SHA256 tokens and non-blocking I/O event loops, applications can achieve massive throughput on modest hardware footprints.',
      category: 'Software Architecture',
      tags: ['Node.js', 'TypeScript', 'MongoDB', 'Performance'],
      author: {
        name: 'Md Juyel Rana',
        role: 'Founder & CEO, Full Stack Software Engineer'
      },
      readingTimeMinutes: 5,
      isFeatured: true,
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      title: 'The Future of Browser Automation and Workflow Optimization',
      slug: 'future-of-browser-automation',
      excerpt: 'A comprehensive look into modern WebExtensions Manifest V3, anti-detection patterns, and real-time companion syncing.',
      content: 'Browser automation is transitioning from heavy headless scrapers to client-side assistive tools that empower end-users directly within their everyday workflow.',
      category: 'Automation & Productivity',
      tags: ['Automation', 'Chrome Extensions', 'Web Development'],
      author: {
        name: 'Md Juyel Rana',
        role: 'Founder & CEO, Full Stack Software Engineer'
      },
      readingTimeMinutes: 4,
      isFeatured: true,
      isPublished: true,
      createdAt: new Date().toISOString()
    }
  ];
}

export async function fetchJobs(): Promise<Job[]> {
  const res = await apiFetch<Job[]>('/jobs');
  if (res.ok && res.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data;
  }
  return [
    {
      title: 'Full Stack Software Engineer',
      slug: 'full-stack-software-engineer',
      department: 'Engineering',
      location: 'Dhaka, Bangladesh (Hybrid/Remote)',
      employmentType: 'Full-time',
      experienceLevel: 'Mid-Senior (2+ years)',
      overview: 'We are looking for a skilled Full Stack Engineer passionate about building scalable web applications with Next.js, Node.js, and modern cloud technologies.',
      responsibilities: [
        'Develop and maintain high-performance applications using Next.js App Router and Tailwind CSS',
        'Design robust RESTful APIs in TypeScript and Node.js',
        'Collaborate on system architecture and database optimization'
      ],
      requirements: [
        'Strong proficiency in TypeScript and Node.js',
        'Proven experience with React / Next.js',
        'Familiarity with MongoDB and Git'
      ],
      benefits: ['Competitive compensation', 'Flexible hybrid/remote schedule', 'Career growth path'],
      isActive: true
    }
  ];
}

export async function submitContactLead(body: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  service?: string;
  budget?: string;
  message: string;
}): Promise<{ ok: boolean; message: string }> {
  const res = await apiFetch<{ message: string }>('/leads', {
    method: 'POST',
    body: JSON.stringify({ ...body, source: 'codiumzen_website_contact' })
  });
  return {
    ok: res.ok,
    message: res.message || (res.ok ? 'Inquiry received successfully!' : 'Failed to send inquiry')
  };
}

export async function submitJobApplication(body: {
  position: string;
  jobId?: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
}): Promise<{ ok: boolean; message: string }> {
  const res = await apiFetch<{ message: string }>('/applications', {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return {
    ok: res.ok,
    message: res.message || (res.ok ? 'Application submitted successfully!' : 'Failed to submit application')
  };
}

// -------------------------------------------------------------
// ADMIN API METHODS
// -------------------------------------------------------------

export async function adminLogin(identifier: string, password: string): Promise<{ ok: boolean; token?: string; user?: any; message?: string }> {
  const res = await apiFetch<{ token: string; user: any }>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password })
  });
  if (res.ok && res.data?.token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cz_admin_token', res.data.token);
      localStorage.setItem('cz_admin_user', JSON.stringify(res.data.user));
    }
    return { ok: true, token: res.data.token, user: res.data.user };
  }
  return { ok: false, message: res.message || 'Invalid admin credentials' };
}

export function getAdminAuthSession(): { token: string | null; user: any | null } {
  if (typeof window === 'undefined') return { token: null, user: null };
  const token = localStorage.getItem('cz_admin_token');
  const userJson = localStorage.getItem('cz_admin_user');
  let user = null;
  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch {
      // ignore
    }
  }
  return { token, user };
}

export function adminLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cz_admin_token');
    localStorage.removeItem('cz_admin_user');
  }
}

export async function fetchAdminMetrics(): Promise<DashboardMetrics | null> {
  const res = await apiFetch<DashboardMetrics>('/admin/dashboard');
  if (res.ok && res.data) return res.data;
  return null;
}

export async function fetchAdminLeads(): Promise<Lead[]> {
  const res = await apiFetch<Lead[]>('/admin/leads');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return [];
}

export async function updateAdminLeadStatus(id: string, status: string): Promise<boolean> {
  const res = await apiFetch(`/admin/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  return res.ok;
}

export async function fetchAdminApplications(): Promise<any[]> {
  const res = await apiFetch<any[]>('/admin/applications');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return [];
}

export async function fetchAdminProducts(): Promise<Product[]> {
  const res = await apiFetch<Product[]>('/admin/products');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return await fetchProducts();
}

export async function fetchAdminServices(): Promise<Service[]> {
  const res = await apiFetch<Service[]>('/admin/services');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return await fetchServices();
}

export async function fetchAdminProjects(): Promise<Project[]> {
  const res = await apiFetch<Project[]>('/admin/projects');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return await fetchProjects();
}

export async function fetchAdminBlogs(): Promise<Blog[]> {
  const res = await apiFetch<Blog[]>('/admin/blogs');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return await fetchBlogs();
}

export async function fetchAdminJobs(): Promise<Job[]> {
  const res = await apiFetch<Job[]>('/admin/jobs');
  if (res.ok && res.data && Array.isArray(res.data)) return res.data;
  return await fetchJobs();
}


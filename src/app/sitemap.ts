import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.siteUrl;

  const routes = [
    '',
    '/about',
    '/founder/md-juyel-rana',
    '/products',
    '/products/ivac-assistant-pro',
    '/products/indian-visa-auto-fill',
    '/services',
    '/services/custom-software-development',
    '/services/cloud-devops-automation',
    '/services/enterprise-api-integration',
    '/solutions',
    '/portfolio',
    '/portfolio/ivac-assistant-platform',
    '/portfolio/visa-auto-fill-system',
    '/blog',
    '/blog/high-concurrency-backend-architecture-nodejs',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route.startsWith('/blog') ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/products') || route.startsWith('/services') ? 0.9 : 0.7,
  }));
}

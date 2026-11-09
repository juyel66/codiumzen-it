export const SITE_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://codiumzenit.com',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' }
  ],
  footerLinks: {
    solutions: [
      { label: 'Web Applications', href: '/services/web-application-development' },
      { label: 'Custom Software', href: '/services/custom-software-development' },
      { label: 'SaaS Engineering', href: '/services/saas-product-engineering' },
      { label: 'Automation & Workflows', href: '/services/automation-workflow-solutions' },
      { label: 'Cloud Architecture', href: '/services/cloud-architecture-devops' }
    ],
    products: [
      { label: 'IVAC Assistant', href: '/products/ivac-assistant' },
      { label: 'Indian Visa Auto fill', href: '/products/indian-visa-auto-fill' },
      { label: 'Explore All Products', href: '/products' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Founder & CEO', href: '/founder/md-juyel-rana' },
      { label: 'Case Studies', href: '/portfolio' },
      { label: 'Engineering Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' }
    ]
  }
};

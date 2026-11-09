import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMPANY_INFO } from '@/config/company';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://codiumzenit.com'),
  title: {
    default: 'CodiumZen IT — Building Digital Products. Engineering Intelligent Solutions.',
    template: '%s | CodiumZen IT'
  },
  description: 'CodiumZen IT is an international software engineering company building high-performance digital products, scalable cloud architectures, and intelligent automation systems. Led by Md Juyel Rana.',
  keywords: [
    'CodiumZen IT',
    'Software Engineering',
    'Custom Web Applications',
    'Next.js Development',
    'SaaS Engineering',
    'Automation Workflows',
    'Md Juyel Rana'
  ],
  authors: [{ name: 'Md Juyel Rana', url: 'https://github.com/juyel66' }],
  creator: 'CodiumZen IT',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codiumzenit.com',
    title: 'CodiumZen IT — Building Digital Products. Engineering Intelligent Solutions.',
    description: 'We build innovative software products and scalable digital solutions that help businesses transform ideas into powerful technology.',
    siteName: 'CodiumZen IT'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodiumZen IT — Building Digital Products',
    description: 'Software engineering, scalable digital products, and intelligent automation systems.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD) for Organization & Founder
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://codiumzenit.com/#organization',
        name: COMPANY_INFO.name,
        legalName: COMPANY_INFO.legalName,
        url: COMPANY_INFO.website,
        email: COMPANY_INFO.officialEmail,
        telephone: COMPANY_INFO.phone,
        sameAs: [
          COMPANY_INFO.social.facebook,
          COMPANY_INFO.social.github,
          COMPANY_INFO.social.linkedin
        ]
      },
      {
        '@type': 'Person',
        '@id': 'https://codiumzenit.com/#founder',
        name: COMPANY_INFO.founder.name,
        jobTitle: COMPANY_INFO.founder.designation,
        worksFor: {
          '@id': 'https://codiumzenit.com/#organization'
        },
        sameAs: [
          COMPANY_INFO.founder.github,
          COMPANY_INFO.founder.linkedin
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B1220] text-[#F8FAFC] antialiased selection:bg-[#4263EB] selection:text-white">
        <Navbar />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

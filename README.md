# CodiumZen IT Corporate Website & Management Portal

Modern, high-performance corporate website and administration portal for **CodiumZen IT**, engineered with Next.js 14 App Router, TypeScript, and Tailwind CSS.

- **Founder & CEO**: Md Juyel Rana
- **Direct Hotline**: +8801747498166
- **Email**: codiumzenit@gmail.com
- **Flagship Products**:
  - **IVAC Assistant Pro** (Automated visa appointment and telemetry platform)
  - **Indian Visa Auto fill** (Intelligent automated form filling suite)

---

## 🚀 Quick Start (Development)

Run the frontend independently:

```bash
cd codiumzen-frontend
npm install
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Environment Variables

Create or edit `.env.local`:

```env
# Backend API Base URL
# Development:
NEXT_PUBLIC_API_URL=http://localhost:5000/v1/codiumzen

# Production:
# NEXT_PUBLIC_API_URL=https://api-ivacassistant.codiumzenit.com/v1/codiumzen

# Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://codiumzenit.com
```

> **Resilient Offline Architecture**: If the backend is temporarily offline or unreachable, the frontend automatically falls back to curated static datasets for products, services, case studies, blogs, and career openings without throwing runtime errors.

---

## 🗂️ Project Structure

```
codiumzen-frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Corporate Homepage
│   │   ├── layout.tsx                   # Root Layout with Organization & Person Schema
│   │   ├── about/page.tsx               # About CodiumZen IT
│   │   ├── founder/md-juyel-rana/       # Founder & CEO Profile
│   │   ├── products/                    # Products Showcase & Product Detail
│   │   ├── services/                    # Services Catalog & Detail
│   │   ├── solutions/                   # Industry Solutions
│   │   ├── portfolio/                   # Case Studies & Portfolio
│   │   ├── blog/                        # Insights & Articles
│   │   ├── careers/                     # Careers & Job Application Form
│   │   ├── contact/                     # Project Inquiry Lead Form
│   │   ├── privacy-policy/page.tsx      # Privacy Policy
│   │   ├── terms-and-conditions/page.tsx# Terms of Service
│   │   ├── sitemap.ts                   # Dynamic XML Sitemap
│   │   ├── robots.ts                    # Search Engine Directives
│   │   └── admin/                       # CodiumZen Management Portal
│   │       ├── layout.tsx               # Admin Shell & Sidebar
│   │       ├── login/page.tsx           # PBKDF2 Encrypted Login
│   │       ├── dashboard/page.tsx       # System Metrics & Recent Inquiries
│   │       ├── leads/page.tsx           # Inbound Leads & Status Updating
│   │       ├── applications/page.tsx    # Candidate Resumes & Review
│   │       ├── products/page.tsx        # Product Management
│   │       ├── services/page.tsx        # Services Management
│   │       ├── projects/page.tsx        # Portfolio Management
│   │       ├── blogs/page.tsx           # Blog Management
│   │       ├── jobs/page.tsx            # Job Vacancies Management
│   │       ├── seo/page.tsx             # SEO & OpenGraph Settings
│   │       └── settings/page.tsx        # Company & Contact Settings
│   ├── config/
│   │   ├── company.ts                   # Official Founder & Entity Information
│   │   └── site.ts                      # SEO, Navigation & Branding Constants
│   ├── lib/
│   │   └── api/client.ts                # API Client & Resilient Offline Fallbacks
│   └── types/                           # TypeScript Interfaces
```

---

## 🔐 Administrative Access

Access the dedicated CodiumZen administrative console at `/admin/login`.

- **Initial Admin Email**: `codiumzenit@gmail.com`
- **Initial Password**: Configured via `CZ_ADMIN_PASSWORD_HASH` or seeded with default.
- **Authentication**: Stateless HMAC-SHA256 bearer tokens isolated from the IVAC Assistant token system.

---

## 📦 Production Build & Deployment

```bash
cd codiumzen-frontend
npm run build
npm run start
```


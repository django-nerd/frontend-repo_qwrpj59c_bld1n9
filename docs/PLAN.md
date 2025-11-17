# Cannabis E‑Commerce Blueprint

This document delivers: A) roadmap, B) file tree, C) code stubs (Next.js product listing, Express cart/order API, Prisma schema, auth middleware, checkout flow stub), D) legal/compliance checklist.

Note: Technology stack is designed for production (Next.js + Express/Nest + PostgreSQL + Prisma + S3 + Auth provider + search). Replace placeholders like example.com and bucket names before launch.

---

A) Project Roadmap (concise)

Milestone 1 — Foundations (1.5–2 weeks)
- Architecture & repositories: monorepo with apps/web (Next.js) and apps/api (Express/Nest), packages/shared, infra.
- Auth & RBAC: OAuth provider (Auth0/Clerk), email/password, roles: admin, editor, customer.
- Database: PostgreSQL schema via Prisma; seed: 10 products, 3 blog posts, 2 authors.
- Storage: S3 bucket(s) for product images and COA PDFs.
- Compliance basics: age gate, cookie banner, disclaimers, geo-blocking scaffold.
- CI/CD: GitHub Actions, Vercel (web), AWS/GCP/DO (api), environment gating.

Milestone 2 — Catalog & CMS (2 weeks)
- Product CRUD: categories, variants/SKUs, inventory, pricing, COA upload/display.
- Blog CMS: WYSIWYG, scheduled posts, tags, authors, citations; RSS & sitemap.
- Search: Meilisearch/Algolia or Postgres full‑text + materialized views; faceted filters.
- SEO: metadata templates, schema.org (Product, Article, Breadcrumb, LocalBusiness, FAQ), canonical, robots/sitemap.

Milestone 3 — Cart, Checkout, Orders (2 weeks)
- Persistent cart (cookie + server); promo codes, tax, shipping/pickup logic, local regulation checks.
- Pluggable, compliant payment gateway abstraction; webhooks and order state machine.
- Emails: order confirmation, abandonment, status updates.

Milestone 4 — Accounts & Admin (1.5–2 weeks)
- Account: profile, addresses, order history, subscriptions (reorder), saved items.
- Admin: inventory, orders, blog, users, audit logs, exports.
- Analytics & monitoring: GA4, server logging, error tracking, uptime.

Milestone 5 — Hardening & Launch (1–1.5 weeks)
- Accessibility (WCAG 2.1 AA), performance (>90 Lighthouse), security (CSP, CSRF, input validation, rate‑limit), load tests, DPA/Privacy.
- Legal review per jurisdiction; production DR/backup; runbooks.

---

B) Suggested File/Folder Tree (monorepo)

- apps/
  - web/ (Next.js 14 app router)
    - app/
      - (shop)/
        - products/page.tsx            # listing with filters (SSR)
        - products/[slug]/page.tsx     # product detail
      - (content)/
        - blog/page.tsx
        - blog/[slug]/page.tsx
      - account/*, admin/*, api/*
    - lib/seo.ts, lib/auth.ts
    - components/* (AgeGate, ProductCard, Filters, TrustBadges, COAViewer, ReviewList, etc.)
    - public/* (icons, manifest)
  - api/ (Express or NestJS)
    - src/
      - index.ts                       # bootstrap
      - routes/cart.ts, routes/orders.ts, routes/products.ts, routes/auth.ts
      - middleware/auth.ts, middleware/geo.ts, middleware/rateLimit.ts
      - payments/
        - gateway.ts                   # abstraction
        - compliantGateway.ts          # "use only if compliant in your jurisdiction"
        - mockGateway.ts               # for testing
      - services/* (cart, order, product, blog, email, search)
      - storage/s3.ts
      - db/prisma.ts
      - schemas/* (zod validation)
  - search/ (Meilisearch/Algolia indexers)
- packages/
  - prisma/
    - schema.prisma
    - seed.ts
    - migrations/001_init.sql
  - shared/
    - types/*
    - utils/*
- infra/
  - terraform/* or pulumi/* (S3, Postgres, Meili, secrets)
  - github-actions/
    - ci.yml, deploy-web.yml, deploy-api.yml
- docs/
  - PLAN.md (this file)
  - LEGAL_CHECKLIST.md

---

C) Code Stubs
- See blueprints directory for runnable TypeScript stubs:
  - Next.js product listing page (SSR + filters)
  - Express cart + order endpoints with payment abstraction
  - Prisma schema for Postgres
  - Auth middleware
  - Checkout flow (server and minimal client call)

---

D) Legal/Compliance Checklist (launch)

Jurisdiction & Licensing
- Confirm cannabis e‑commerce legality in each target jurisdiction (medical vs adult‑use). Obtain required retail/delivery licenses.
- Define minimum age threshold (18/21+) and implement on both server and client. Verify identity vendor if mandated.
- Verify THC/CBD potency and labeling rules; shipping restrictions by state/province; return/refund policies compliance.

Payments & Tax
- Only integrate gateways that explicitly allow cannabis transactions in your jurisdiction. Maintain signed agreement on file.
- Implement tax calculation per local rules (excise + sales/VAT). Keep tax rate tables with effective dates; store tax breakdown per order.

Content & Marketing
- Disclaimers: medical/legal; no claims beyond approved statements; include editorial review dates.
- Restrict age‑sensitive marketing (no retargeting to minors); enable geo‑fencing on promos.

Privacy & Security
- GDPR/CCPA notices, cookie consent, DPA with providers (Auth, email, analytics, hosting).
- Data minimization, retention schedule; encryption at rest/in transit; role‑based access; audit logs for admin changes.
- Security controls: CSP, CSRF protection, HTTPS-only cookies, input validation, rate limiting, vulnerability scans.

Accessibility & SEO
- WCAG 2.1 AA conformance check; keyboard navigation; color contrast.
- Structured data: Product, Article, Breadcrumb, FAQ, LocalBusiness. Canonical tags, robots.txt, sitemap, hreflang if applicable.

Operations
- Incident response, error budget/SLOs, on-call; backups and disaster recovery; logging and monitoring in place.
- Terms of Sale, Privacy Policy, Returns/Refunds, Contact for experts.

Follow-up needed from you
- Target jurisdictions and minimum age (18 or 21)
- Product types allowed (THC/CBD/hemp only)
- Preferred compliant payment processor(s)
- Delivery vs pickup options and service areas

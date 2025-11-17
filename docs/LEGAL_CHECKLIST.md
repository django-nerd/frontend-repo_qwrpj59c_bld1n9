# Cannabis E‑Commerce Legal & Compliance Launch Checklist

Jurisdiction & Licensing
- Verify legality for each target area (medical vs adult‑use). Keep copies of licenses and expiration dates.
- Establish the minimum purchase age (18 or 21) and require attestation and technical age‑gate on web and server‑side enforcement.
- Ensure delivery/pickup activities match license scope and geography, including driver compliance and manifests if applicable.
- Verify product category permissions (flower, edibles, concentrates, topicals, CBD/hemp only vs THC). Configure app to block disallowed categories per jurisdiction.

Labeling & Safety
- Enforce potency limits per product type. Include warnings and dosage guidance on each product page.
- Display COA PDF for each batch; list lab name, test date, cannabinoids/terpenes; retain records.
- Include medical and legal disclaimers site‑wide and on checkout.

Payments & Taxes
- Only integrate gateways permitting cannabis in your jurisdiction. Keep merchant agreement on file.
- Implement tax breakdowns (excise + sales/VAT) by jurisdiction; archive rate history and apply by effective date.
- Comply with KYC/AML obligations if required.

Privacy & Security
- Publish Privacy Policy, Terms of Sale, Returns/Refunds. Provide Data Processing Agreements with vendors (Auth, Analytics, Hosting, Email, Search).
- Cookie consent (GDPR/CCPA). Offer Do‑Not‑Sell settings if applicable.
- Security: HTTPS, HSTS, TLS 1.2+, CSP, CSRF tokens, XSS mitigations, input validation, rate limiting, password policies, 2FA for admins.
- Maintain audit logs for admin actions (product, price, inventory, COAs, promotions), immutable storage preferred.

Content & Marketing
- Avoid health claims; include author credentials and editorial review stamps on content.
- Structured data: Product, Article, Breadcrumb, LocalBusiness, FAQ. Keep XML sitemap and robots.txt.
- Geo‑fence marketing, avoid targeting minors, respect ad platform policies.

Operations
- Incident response plan, on‑call rotation, logging/monitoring, uptime and error tracking.
- Backups and disaster recovery tested. Retention and deletion policies defined.

Go/No‑Go Gate
- Legal counsel review complete
- Payment processor green‑lit for production
- QA: accessibility (WCAG 2.1 AA), security scan, performance > 90 Lighthouse
- Test buys across jurisdictions, pickup/shipping flows verified

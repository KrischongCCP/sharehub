# Requirement-to-mockup mapping

TMDHC26-00058 · 21 October 2026 · Visual/interaction scope only.

“Demonstrated” describes the front-end preview, not production compliance or certification.

| Checklist item | Where to review | Status / implementation boundary |
| --- | --- | --- |
| 1.1 Standard domain and SSL | Local preview server | Production domain, SSL and continuity remain implementation work. |
| 1.2 Language and URL routing | /tc/, /en/, /sc/; language selector | Demonstrated with separate authored static pages, browser-language entry routing and current-page switching. |
| 1.3 Responsive design | Every page | Demonstrated at 320px, 390px, 768px and 1440px representative viewports; no horizontal overflow in recorded checks. |
| 2.1 Core page areas | Homepage and inner pages | Header, navigation, content, contextual sidebar and footer demonstrated. |
| 2.2 Announcement system | Preview announcement in top ribbon | Modal UX demonstrated. CMS scheduling, authorisation and live alert management remain implementation work. |
| 3.1 Card layout | Homepage news, programmes and services | Cards, hover feedback and manual pagination dots demonstrated; no autoplay. |
| 3.2 Typography | Shared styles | Readable spacing proposed. Exact tender row-height interpretation remains the existing v1.0 section 5C clarification. |
| 4.1 Header controls | Header | DHC identity left; search right on desktop; languages, sharing and font resizing. Responsive alternatives provided. |
| 4.2 Eight required topics | Main navigation | All eight have dedicated pages in all three languages. |
| 4.3 Provider directory | /tc/providers/ | Name, profession, district and co-payment filters demonstrated with explicitly fictional records. |
| 4.4 Brand hierarchy | Header | Concept identity and operator placeholder. Desktop operator height cap below half of identity area; approved logos and licensed font files pending. |
| 5.1 Breadcrumbs | Every inner page | Generated from page identity and localized home link. |
| 5.2 Sidebar limit | Inner-page desktop grid | Sidebar track is 1 / 4.25 of available column space, below 25%; stacked on small screens. |
| 6.1 Date stamping | Every footer | Build date shown at right on desktop. CMS-driven editorial revision/review dates remain implementation work. |
| 6.2 Privacy and legal | Separate privacy and disclaimer pages | Security-statement section and all six Annex A disclaimer topics are included as review drafts. |
| 6.3 XML sitemap | Footer and sitemap.xml | Static prototype sitemap generated. Proposed live routes; not published to production. |
| 7.1 Usability | Shared templates | Concise content, readable body type, hover/focus states, clear actions. XML link opens in a new tab. |
| 7.2 Maps and back-to-top | Contact page and long pages | Back-to-top works. Map placement and centre selection demonstrated; actual vector map integration pending verified locations. |
| 8.1 WCAG 2.2 AA | All pages | Semantic landmarks, labels, keyboard controls, skip link, focus rings, accessible dialogs and reduced motion implemented. No audit/certification claimed. |
| 8.2 PDF remediation | No production PDF files in mockup | Not performed. Production requires OCR, tagging and reader links. |
| 8.3 Elderly-friendly design | Global design | Clear hierarchy, adjustable type, readable spacing, prominent primary controls, high contrast and grayscale demonstrated. Requires user testing. |
| 9.1 Online forms | Contact / enquiry | Validation and clear simulated acknowledgement. Real email service, server validation and agreed reply time pending. |
| 9.2 FAQ and feedback | FAQ and contact pages | Categorized accordion and feedback enquiry category. Public email workflow remains backend work. |
| 10.1 CMS release checklist | Not a public page | Internal seven-item approval workflow is outside this front-end mockup. |
| 10.2 Source hygiene | Local build and QA | Link checks included for preview. Production code review, staging cleanup and scheduled fortnightly checks remain delivery work. |

## Suggested review route

1. Start at the Traditional Chinese homepage. Review desktop and mobile hierarchy.
2. Open Network Service Providers. Combine profession, district and maximum co-payment filters, then reset.
3. Switch to English; verify that the same page remains open.
4. Open Reading preferences and try larger text, high contrast and grayscale.
5. Preview a special announcement, then dismiss with Escape.
6. Open Health Programme, filter a category and inspect an activity detail.
7. Open Contact Us and test the enquiry form using fictional inputs.
8. Review the FAQ, separate legal pages and footer revision date.

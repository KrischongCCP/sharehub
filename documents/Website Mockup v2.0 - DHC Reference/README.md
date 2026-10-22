# TMDHC website mockup v2.0 — DHC reference direction

Created 22 October 2026 (Hong Kong). Based on project TMDHC26-00058 and the DHC government website requested by the client. This is a separate alternative; Website Mockup v1.0 is preserved unchanged.

## View the prototype

- Open **tc/index.html** for Traditional Chinese, **en/index.html** for English, or **sc/index.html** for Simplified Chinese. All assets are local and ordinary file browsing works without installing packages.
- For the clean /tc/, /en/ and /sc/ URL experience, run **node serve.mjs** in this folder, then visit **http://127.0.0.1:4174/tc/**. The server listens only on your computer. Use a different port with the PORT environment variable if needed.
- **index.html** detects the browser language on first use and honours a previously selected language. It redirects to an independently generated language page. No machine-translation widget or runtime translation is used.
- **previews/** contains desktop, tablet and mobile screenshots, plus a recorded verification report.

## Design direction

A reference-led public-health portal: white masthead, strong blue/teal hierarchy, wide photographic banner, two audience entry panels, editorial news list and structured service/resource sections. The reference is https://www.dhc.gov.hk/tc/index.html, reviewed on 22 October 2026.

The government site's visual hierarchy is adapted to TMDHC's operator requirements. Its nine-topic national/district navigation is not copied: the eight required TMDHC topics remain primary. Compact search and language buttons are provided on tablet/mobile, alongside reading preferences and sharing. The three-slide homepage banner uses manual controls and has no autoplay.

See **REFERENCE.md** for the design translation and image attribution. Five local reference photographs are used for private review only; publishing requires approval of image rights or replacement photography. Official government logos and accreditation badges are not reused.

Traditional Chinese is the primary design preview. Each of the three languages contains 14 pages: home, all eight mandatory navigation topics, FAQ, privacy, copyright/disclaimer, search and sitemap. The complete set is 42 localized pages, plus one language-entry page.

## Working interactions

- Eight-topic navigation, breadcrumbs, contextual sidebar, expanded footer navigation and back-to-top.
- Three-slide manual photographic banner with previous/next buttons, pagination dots, current-slide status and destination links.
- Two audience entry panels and editorial news/feature layout.
- Compact mobile/tablet search and a three-language selector dialog.
- Same-page language switching with separately authored Traditional Chinese, Simplified Chinese and English content.
- Text size controls, high-contrast and grayscale modes, with local preference persistence isolated from v1.0.
- Special-announcement preview dialog, including Escape dismissal and focus management supplied by native HTML dialog.
- News-card pagination, programme category filters and programme detail dialogs.
- Provider filtering by name/keyword, profession, district and maximum co-payment; combined filters, reset, empty state and expandable details. Records are visibly marked as fictional.
- Local site search, FAQ categories and expandable answers.
- Enquiry validation and a simulated acknowledgement. No data is submitted, stored or emailed.
- Responsive mobile navigation. The layout was checked down to 320px.

## Scope and assumptions

This is a reviewable front-end mockup, not a production website or a claim of CLF, WCAG or security certification.

- The centre identity mark is a concept placeholder and the operator identity is labelled as a placeholder. Replace both with approved PHCC/DHC/operator assets before implementation. Desktop operator height is capped at 28px beside a 72px DHC identity area; actual asset dimensions still need review.
- Brand font stacks name the specified LiHei Pro and Helvetica Neue Condensed families, with system fallbacks. Licensed webfont files are not present in the supplied material and are not bundled here. The proposal’s supplier-provided font licensing commitment remains unchanged.
- Body line height is 1.65, with readable heading spacing. The tender’s title/content row-height wording remains subject to the typography clarification already recorded in Technical Proposal v1.0 section 5C; this mockup does not claim to resolve it.
- The supplied documents did not provide a verified public provider dataset, programme schedule or current centre contact directory. Programme copy and provider records are marked as examples. Centre contact details are left for verification rather than invented.
- A location-map panel demonstrates placement and centre selection. Live vector maps, zoom, directions and verified coordinates are not connected.
- The 3-working-day enquiry response is a proposed example from the requirements and is explicitly subject to centre confirmation. Email acknowledgements are simulated.
- Privacy and legal pages demonstrate the information architecture, including all six Annex A disclaimer topics. They are drafts awaiting centre review, not final legal terms.
- Revision dates are build-time preview dates. Production dates must come from the CMS. The sitemap uses proposed paths on the stated domain and is a prototype only. The preview has noindex/nofollow metadata and a restrictive robots.txt.
- Production Laravel/MySQL integration, CMS permissions and publishing checklist, scheduled alerts, migration, API/email integration, PDF remediation, live maps, SSL, security hardening, independent SRAA and WCAG audits, and maintenance are outside this visual mockup.

See **REQUIREMENTS.md** for all 25 checklist items, distinguishing front-end demonstrations from production work.

## Edit and rebuild

- **content.mjs**: separately authored content for all three languages and explicit fictional provider fixtures.
- **build.mjs**: shared page templates and generation of independent HTML files.
- **option-b.mjs**: three-language option-two homepage template and banner content.
- **assets/styles.css**: shared baseline styles, reading modes and print styles.
- **assets/option-b.css**: the reference-led visual system and responsive overrides.
- **assets/reference-sources.json**: source URLs and review-only image-use notice.
- **assets/app.js**: browser interactions; no external runtime dependencies.
- **assets/community.svg**: retained original vector illustration on the About page.
- **assets/banner-*.jpg** and **assets/audience-*.jpg**: attributed reference photographs; permission or replacement required before publication.
- Run **node build.mjs** after changing content or templates. Changes made only to generated HTML will be overwritten by a rebuild.
- **verify.cjs** and **final-check.cjs** are inherited optional Playwright utilities; they were not used for the recorded v2 verification. The report below records the in-app browser checks.

## Verification

The in-app browser pass checked all 42 pages at 1440px and 320px for overflow, eight navigation items, one main heading, the v2 stylesheet and broken eager images. A separate 768px tablet homepage check also passed. Static verification checked local links/assets and the original v1 file hashes. Functional checks covered directory combinations, empty/reset states, language routing, news pagination, manual banners, announcement dismissal, reading preferences, programme filters, FAQ filters, enquiry validation, search and mobile navigation. Reading-preference persistence was confirmed on the Simplified Chinese contact page at 320px; no complete nine-page reading-mode report is claimed.

The v2 browser verification is recorded in **previews/verification.json**. A SHA-256 manifest in **previews/original-v1-manifest.json** records the original version; **previews/static-verification.json** confirms it remained unchanged. Desktop and mobile screenshots were visually reviewed. These checks are a prototype QA pass; they do not replace manual screen-reader testing, a complete WCAG 2.2 AA audit, browser-matrix testing or production security assessment.

## Requirement sources

All source material is in the existing project workspace:

1. sources/TMDHC26-00058/RFQ_TMDHC26-00058_Website Enhancement (CLF)_20261008 (To Vendor).pdf
2. sources/TMDHC26-00058/TMDHC26-00058_CLF Website Compliance Checking List_20261008 (To Vendor).xlsx
3. sources/TMDHC26-00058/Common Look and Feel Guidelines for Operators' Websites - Aug 2026 (clean version) (1).pdf
4. sources/TMDHC26-00058/ANNEX A - Guiding Principles on Content Updates of Operators' Websites - Feb 2025 (clean version) (1).pdf
5. sources/TMDHC26-00058/elderly_friendly_design_guide_chi.pdf
6. deliverables/Submission/01 Technical Proposal v1.0.docx, including section 5C typography clarification and subsequent supplier font-licensing amendment.

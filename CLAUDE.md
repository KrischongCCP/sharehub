# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Share Hub is a Jekyll-based document sharing portal with tag-based access control. Documents are protected via front matter tags (not folder structure), with a simple password system for private files.

## Common Commands

### Local Development
```bash
bundle exec jekyll serve              # Run dev server at http://127.0.0.1:4000/
bundle exec jekyll serve --livereload # With auto-reload
bundle exec jekyll build              # Build site to _site/
```

### Deployment
Site deploys automatically to GitHub Pages on push to main. Changes take 1-5 minutes to appear.

## Architecture

### Tag-Based Access Control
- **Public (default)**: No special tags needed
- **Private**: Add `access: private` to front matter
- **Password**: "maco" for all private documents (client-side protection via sessionStorage)

### Key Files
- `_layouts/universal.html` - Single layout handling both public/private pages with password overlay
- `index.html` - Main listing page with DataTables, file filtering, and session-based auth
- `_config.yml` - Jekyll config with `baseurl: "/sharehub"` for GitHub Pages

### Document Structure
All documents go in `documents/` folder. Subfolders are for organization only, not access control.

Minimal front matter for public:
```yaml
---
---
```

For private:
```yaml
---
access: private
---
```

### Index Page Behavior
- Before login: Shows only public documents
- After login: Shows all documents with lock icon for private
- Default filter: HTML/MD files only (checkbox to show all)
- Supports URL param unlock: `?key=maco`

## Critical Rules

1. **Never modify** `_layouts/universal.html` or `index.html` unless specifically requested
2. All documents must have front matter (even empty `---\n---`)
3. Access is controlled by `access: private` tag, not folder location
4. `baseurl` must be `"/sharehub"` for GitHub Pages deployment

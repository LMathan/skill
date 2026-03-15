# SkillForge Technology Website

## Project Structure

- `index.html` — homepage entry page
- `pages/` — all secondary site pages
- `pages/projects.html` — project listing page
- `pages/feedback.html` — testimonials page
- `pages/submit-feedback.html` — feedback form page
- `pages/about.html` — about page
- `pages/contact.html` — contact page
- `assets/css/style.css` — shared site styles
- `assets/js/data.js` — static content and shared configuration (projects, default feedback, Firebase config)
- `assets/js/script.js` — UI behavior and page logic (rendering, animations, forms, Firebase/localStorage flow)
- `assets/images/` — shared image assets
- `assets/images/projects/` — project-specific generated/slug-based image assets

## Maintenance Guidelines

1. Keep all static datasets inside `assets/js/data.js`.
2. Keep reusable behavior and DOM logic inside `assets/js/script.js`.
3. Add new page-level styles in `assets/css/style.css` using existing design tokens.
4. Place new project images in `assets/images/projects/` and name them with the same slug format used in `script.js`.


# Printzone

The Printzone business website: custom printing, stationery, banners, signage and merchandise. Inspired by a colourful, illustrated design reference.

**Website:** https://aditya98.github.io/printzone/

## GitHub Pages

The website is served from the root of the `main` branch. Changes pushed to `main` are deployed by GitHub Pages. `.nojekyll` enables direct static-file hosting.

## Local preview

Requires Node.js, with no dependencies to install:

```sh
npm start
```

Open http://localhost:3000. Run `npm run check` for JavaScript syntax checks.

## Files

- `index.html`: page content and original vector illustrations
- `styles.css`: responsive layout, typography and CSS product mockups
- `app.js`: service filters, mobile menu and project-brief builder
- `server.js`: local preview server, not required by GitHub Pages

## Business information and enquiries

Business facts and customer names are sourced from [Printzone on LinkedIn](https://www.linkedin.com/company/printzonedelhii/). The gallery contains illustrative design concepts, labelled as such.

The enquiry tool generates a brief in the visitor's browser. Visitors can copy or download it and open Printzone's LinkedIn page to share it. There is no backend submission, email delivery or payment processing. Connect a verified contact channel or form endpoint if direct enquiries are needed.

Typography uses Google Fonts with local sans-serif fallbacks.

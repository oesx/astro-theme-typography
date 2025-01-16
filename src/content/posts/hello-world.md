---
title: Hello World
description: Welcome to Astro Typography, a clean and minimal blog theme.
pubDate: 2024-01-15
category: General
---

# Hello World

Welcome to Astro Typography, a clean and minimal blog theme built with Astro and UnoCSS.

## Features

- Clean and minimal design
- Dark mode support
- Responsive layout
- SEO friendly
- RSS feed
- Sitemap
- Categories
- Archive
- Comments (Giscus/Utterances)
- Analytics (Google Analytics/Umami)
- WebAuthn authentication
- Admin dashboard
- Markdown/MDX support
- Code syntax highlighting
- And more...

## Getting Started

1. Clone the repository
2. Install dependencies
3. Configure your site
4. Start writing

## Configuration

Edit the `.config.ts` file to customize your site:

```typescript
export const themeConfig = {
  site: {
    title: 'Your Site Title',
    description: 'Your site description',
    // ...
  },
  // ...
}
```

## Writing Posts

Create a new `.md` or `.mdx` file in the `src/content/posts` directory:

```markdown
---
title: Your Post Title
description: Your post description
pubDate: 2024-01-15
category: Your Category
---

Your post content here...
```

## License

MIT

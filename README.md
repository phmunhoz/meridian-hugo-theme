# Meridian — Hugo Theme

A minimal Hugo theme for independent consultants and technology professionals. Mobile-first, no CSS framework, no Node.js required.

**Live example:** [www.ph.etc.br](https://www.ph.etc.br)

---

## Features

- Strong typographic hierarchy — Bricolage Grotesque (display) + DM Sans (body)
- Mobile-first, fully responsive
- Dark and light section support ("sandwich" structure)
- **Parameterized color palette** — override any color from `hugo.toml` without touching the theme
- Native blog with TOC, categories, tags, prev/next and reading time
- Templates for consulting, services, case studies and product pages
- FAQ accordion (vanilla JS)
- Contact form with validation and success state
- 404 page template
- Mobile menu with hamburger animation
- CSS bundled via Hugo Pipes — fingerprinted, minified, zero Node.js
- Google Analytics 4 support (production-only, via param)
- Zero JS frameworks — vanilla only
- i18n support (EN + PT-BR included)

## Requirements

- Hugo 0.120.0+ (extended)

## Installation

### As a Git submodule (recommended)

```bash
git submodule add https://github.com/phmunhoz/hugo-theme-meridian themes/meridian
```

### Manual

Copy the theme folder into `themes/meridian/` in your Hugo project.

### Running the example site

```bash
cd themes/meridian/exampleSite
hugo server --themesDir=../..
```

## Configuration

Configuration uses Hugo's [config directory](https://gohugo.io/getting-started/configuration/#configuration-directory) structure. Create `config/_default/` in your site root:

```
config/_default/
├── hugo.toml        # baseURL, title, theme
├── params.toml      # all content and feature params
├── menus.toml       # navigation items
├── taxonomies.toml  # categories and tags
├── permalinks.toml  # custom URL structure (optional)
├── markup.toml      # goldmark settings
└── pagination.toml  # pagerSize
```

See [`exampleSite/config/_default/`](exampleSite/config/_default/) for a fully documented reference configuration in English.

### Key params (`params.toml`)

```toml
# Analytics
googleAnalyticsID = "G-XXXXXXXXXX"   # only fires on production builds

# Identity
author       = "Your Name"
email        = "your@email.com"
whatsappPhone = "1..."                # raw number — builds wa.me link
whatsapp     = "https://wa.me/1..."
linkedin     = "https://linkedin.com/in/..."
ogImage      = "/img/og-image.png"   # fallback og:image for all pages
favicon      = "/favicon.svg"        # optional, defaults to /favicon.svg
available    = true

# URLs
contactURL    = "/contact/"
servicesURL   = "/services/"
consultingURL = "/consulting/"
casesURL      = "/cases/"

# Blog section — rename without touching the theme
# blogSection = "articles"   # must match your content/ directory name
# blogURL     = "/articles/" # used in breadcrumbs and filter links
```

### Color customization

All colors are CSS custom properties defined in `variables.css` and injected at build time via Hugo Pipes. Override any color from `params.toml`:

```toml
# All optional — these are the defaults
colorBlack        = "#111110"
colorWhite        = "#f7f6f3"
colorOffWhite     = "#efede8"
colorGray         = "#737370"
colorGrayLight    = "#dddbd5"
colorAccent       = "#2a5c45"
colorAccentMid    = "#3d7a5e"
colorAccentBright = "#52b788"
colorAccentLight  = "#e8f0ec"
colorText         = "#1c1c1a"
```

### Renaming the blog section

If your content lives in `content/articles/` instead of `content/blog/`, add to `params.toml`:

```toml
blogSection = "articles"
blogURL     = "/articles/"
```

Then create `content/articles/_index.md` with:

```yaml
---
cascade:
  type: "blog"
---
```

The `type: "blog"` cascade routes all posts to `layouts/blog/` without touching each file.

## Layout structure

```
layouts/
├── index.html                  # Home
├── 404.html                    # Not found page
├── _default/
│   ├── baseof.html             # Base layout (GA4, favicon, CSS bundle, OG tags)
│   ├── single.html             # Generic page fallback
│   ├── about.html              # /about
│   ├── consulting.html         # /consulting
│   ├── projects.html           # /projects
│   └── contact.html            # /contact
├── blog/
│   ├── list.html               # Blog listing with filter bar
│   └── single.html             # Post (TOC, sidebar, share, prev/next)
├── services/
│   ├── list.html               # Services hub
│   ├── single.html             # Generic service page
│   ├── migration.html          # Platform migration page
│   └── maintenance.html        # Maintenance & evolution page
├── cases/
│   └── single.html             # Case study
├── products/
│   └── single.html             # Product page
├── partials/
│   ├── nav.html
│   ├── nav-mobile.html
│   ├── footer.html
│   ├── newsletter.html
│   ├── faq.html
│   └── cases-block.html        # Reusable 2-column cases block
└── shortcodes/
    ├── callout.html            # {{< callout >}} text {{< /callout >}}
    ├── cta.html                # {{< cta title="" btn="" url="" >}}
    └── highlight-number.html   # {{< highlight-number number="" label="" >}}
```

## Content routing

Meridian uses Hugo's `type` field (not `layout`) to route content to the correct template directory.

| Page type       | `type` in front matter | Content location    |
|-----------------|------------------------|---------------------|
| About           | *(not needed)*         | `content/about.md`  |
| Consulting      | *(not needed)*         | `content/consulting.md` |
| Projects        | *(not needed)*         | `content/projects.md`   |
| Contact         | *(not needed)*         | `content/contact.md`    |
| Services hub    | `"services"`           | `content/services/`     |
| Migration       | `"services"`           | `content/services/`     |
| Maintenance     | `"services"`           | `content/services/`     |
| Blog post       | `"blog"` *(or cascade)*| `content/blog/`         |
| Case study      | *(default)*            | `content/cases/`        |
| Product         | `"products"`           | `content/products/`     |

Root pages (`about`, `consulting`, etc.) are routed by filename via `_default/` layouts — no `type` needed.

## New content

```bash
hugo new blog/post-slug.md
hugo new cases/case-slug.md
hugo new products/product-slug.md
```

## Color tokens

| CSS variable       | Default   | Usage                               |
|--------------------|-----------|-------------------------------------|
| `--black`          | `#111110` | Dark backgrounds, headings          |
| `--white`          | `#f7f6f3` | Default background (warm off-white) |
| `--off-white`      | `#efede8` | Alternate sections, cards           |
| `--gray`           | `#737370` | Secondary text, metadata            |
| `--gray-light`     | `#dddbd5` | Borders, dividers                   |
| `--accent`         | `#2a5c45` | Primary brand color, buttons        |
| `--accent-mid`     | `#3d7a5e` | Hover states                        |
| `--accent-bright`  | `#52b788` | Accent on dark backgrounds          |
| `--accent-light`   | `#e8f0ec` | Callout backgrounds, badges         |
| `--text`           | `#1c1c1a` | Body text                           |

All tokens are overridable via `params.toml` — see [Color customization](#color-customization).

## Typography

- **Display / headings:** Bricolage Grotesque (800 weight) — via Google Fonts
- **Body:** DM Sans (300 / 400 / 500) — via Google Fonts

## Contribute

 - Found a bug? [Open an issue](https://github.com/phmunhoz/hugo-theme-meridian/issues)

 - Did an improvement? [Open a PR](https://github.com/phmunhoz/meridian-hugo-theme/pulls)

 - Have an idea or feature request? [Open an issue](https://github.com/phmunhoz/hugo-theme-meridian/issues)


## License

MIT — use, modify and distribute freely.

Copyright © 2026 [PH Munhoz](https://www.ph.etc.br)

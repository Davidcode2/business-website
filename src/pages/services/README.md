# Service Pages Template System

## File Structure

```
src/
├── layouts/
│   └── ServiceLayout.astro       # Base layout wrapper for service pages
├── components/service/
│   ├── ServiceHero.astro         # Hero section with gradient blob decoration
│   ├── ProblemSection.astro      # Pain points / problem statement
│   ├── SolutionSection.astro     # Solution overview with features
│   ├── BenefitsGrid.astro        # Benefits/features grid
│   ├── ProcessSection.astro      # How it works / process steps
│   ├── CTASection.astro          # Call-to-action section
│   └── RelatedServices.astro     # Cross-links to other services
└── pages/services/
    ├── _template.astro           # Template file for new services
    ├── web-development.astro     # Example: Custom Web Development
    ├── ecommerce.astro           # Example: E-Commerce Solutions
    ├── cloud-devops.astro        # Example: Cloud & DevOps
    ├── security.astro            # Example: Security Consulting
    └── index.astro               # Services overview page (optional)
```

## Design System

### Color Variables (CSS Custom Properties)

```css
/* Background & Surface */
--color-background          /* Main page background */
--color-surface-base        /* Base surface */
--color-surface-subtle      /* Subtle background sections */
--color-surface-raised      /* Cards, elevated surfaces */
--color-surface-overlay     /* Hover states */

/* Accent Colors */
--color-accent              /* Primary accent color */
--color-accent-weak         /* Hover states */
--color-accent-emphasis     /* Emphasis */
--color-accent-strong       /* Strong emphasis */
--color-accent-muted        /* Muted accents */
--color-accent-subtle       /* Very subtle accents */

/* Text Colors */
--color-text-primary        /* Main text */
--color-text-secondary      /* Secondary text */
--color-text-muted          /* Muted/caption text */
--color-text-inverse        /* Text on accent backgrounds */

/* Border */
--color-border              /* Borders and dividers */

/* Gradient Blobs */
--gradient-blob-1           /* Purple/blue tones */
--gradient-blob-2           /* Purple tones */
--gradient-blob-3           /* Blue/cyan tones */
```

### Utility Classes

```css
/* Typography */
.gradient-text               /* Gradient text effect */

/* Animation */
.animate-blob                /* Blob movement animation */
.animate-blob-delayed        /* Delayed blob animation */
.animate-blob-slow           /* Slower blob animation */
.animate-fade-in-up          /* Fade in from below */

/* Effects */
.glass                       /* Glass morphism effect */
```

### Section Patterns

All sections follow these patterns:

- **Padding**: `py-24 sm:py-32`
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Background**: Alternating between default and `--color-surface-subtle`
- **Section labels**: `text-(--color-accent) font-medium mb-4 tracking-wide uppercase text-sm`
- **Headlines**: `text-3xl sm:text-4xl font-bold text-(--color-text-primary)`
- **Gradient headlines**: Add `gradient-text` class to span

### Card Styling

Cards use:

- Background: `bg-(--color-surface-raised)`
- Border: `border border-(--color-border)`
- Border radius: `rounded-2xl` or `rounded-xl`
- Hover: `hover:border-(--color-accent-weak)` and `hover:-translate-y-1`

## Creating a New Service Page

1. **Copy the template:**

   ```bash
   cp src/pages/services/_template.astro src/pages/services/my-service.astro
   ```

2. **Update the data objects:**
   - `serviceData` - Basic service info
   - `problemData` - Pain points (4 items)
   - `solutionData` - Solution features (4 items)
   - `benefitsData` - Benefits grid (6 items)
   - `processData` - Process steps (4 steps)
   - `ctaData` - Call-to-action text
   - `allServices` - Update to include your new service

3. **Update Navigation links** (in Navigation.astro) to include the new service.

4. **Test locally:**
   ```bash
   npm run dev
   # Visit http://localhost:4321/services/my-service
   ```

## Routing

- Service pages: `/services/[service-name]`
- Example: `/services/web-development`, `/services/ecommerce`

## Gradient Blob Decoration

The hero section features the signature gradient blob from Story.astro:

```astro
<!-- Primary blob -->
<div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[150%] h-[150%] bg-gradient-to-r from-(--gradient-blob-1)
            via-(--gradient-blob-2) to-(--gradient-blob-3) rounded-full
            filter blur-[120px] opacity-15 animate-blob">
</div>

<!-- Secondary blob (delayed animation) -->
<div class="absolute -z-10 top-1/3 right-1/4 w-[80%] h-[80%]
            bg-gradient-to-l from-(--gradient-blob-3) via-(--gradient-blob-1)
            to-(--gradient-blob-2) rounded-full filter blur-[100px]
            opacity-10 animate-blob-delayed">
</div>
```

The blob creates a dynamic, colorful background effect without overwhelming the content.

## Icons

Uses `astro-icon` with Lucide icons:

- Available icons: https://lucide.dev/icons/
- Usage: `icon: "lucide:icon-name"`

Common icons for services:

- `lucide:code` - Development
- `lucide:shopping-cart` - E-commerce
- `lucide:cloud` - Cloud/DevOps
- `lucide:shield` - Security
- `lucide:zap` - Performance
- `lucide:smartphone` - Mobile
- `lucide:search` - SEO
- `lucide:clock` - Speed/Delivery
- `lucide:message-circle` - Communication
- `lucide:check` - Checkmarks
- `lucide:arrow-right` - CTAs

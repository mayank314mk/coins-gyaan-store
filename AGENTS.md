# Coins Gyaan Store — Agent Instructions

## 1. Project Overview

Coins Gyaan Store is a full-stack e-commerce website dedicated to historical
and collectible Indian coins.

The store is intended for coin collectors, numismatists, hobbyists, and people
interested in Indian history and collectible currency.

Products sold through the website are primarily historical, discontinued,
commemorative, rare, or otherwise collectible coins rather than ordinary
currently circulating currency.

The website should feel like a specialized, trustworthy and premium Indian
coin-collecting store rather than a generic e-commerce template.

The identity of the application should remain focused on:

- Indian history
- Numismatics
- Coin collecting
- Historical significance
- Collectibility
- Authenticity
- Preservation
- Heritage

Do not turn the application into a general marketplace.

---

## 2. Product Scope

The catalog may contain historical and collectible Indian coins such as:

- Ancient Indian coins
- British India coins
- Republic India collectible coins
- Commemorative coins
- Rare coins
- Discontinued denominations
- Historical coin sets
- Special issue coins
- Other collectible Indian coins

The exact catalog and categories may evolve during development.

Do not introduce unrelated product categories.

---

## 3. Tech Stack

Use the following technology stack unless explicitly instructed otherwise.

### Frontend

- Next.js
- React
- Next.js App Router
- TypeScript
- Tailwind CSS

### Backend

Use Next.js server-side capabilities where appropriate, including:

- Server Components
- Server Actions
- Route Handlers

Do not introduce a separate Express backend unless there is a genuine
technical requirement.

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- Auth.js / NextAuth


### Deployment

The application should remain compatible with common Next.js deployment
platforms.

Do not introduce another:

- frontend framework
- database
- ORM
- authentication system
- payment provider
- state management library

unless there is a clear technical reason.

---

## 4. Development Strategy

Develop the application incrementally.

Do NOT attempt to implement the entire application at once.

The general development order should be:

1. Homepage frontend
2. Responsive homepage
3. Product listing/catalog pages
4. Product details page
5. Search
6. Filtering and sorting
7. PostgreSQL database setup
8. Prisma integration
9. Real product data
10. Authentication
11. Shopping cart
12. Wishlist
13. User addresses
14. Checkout
15. Razorpay integration
16. Orders
17. User account and order history
18. Admin functionality
19. Testing and error handling
20. Performance optimization
21. Accessibility improvements
22. SEO
23. Deployment

Only work on the feature requested in the current task.

Do not automatically implement future phases.

---

## 5. Current Frontend Phase

During the initial frontend development phase:

- Use static/mock data.
- Focus on the visual design.
- Focus on reusable components.
- Make the website responsive.
- Do not connect PostgreSQL yet.
- Do not initialize Prisma unless explicitly requested.
- Do not implement authentication yet.
- Do not implement Razorpay yet.
- Do not create unnecessary APIs.
- Cart controls may initially be visual only.
- Wishlist controls may initially be visual only.
- Search may initially be visual only.

The frontend should be designed so mock data can later be replaced with
database data without rewriting the entire UI.

Do not prematurely introduce backend complexity.

---

## 6. Design Direction

The website should communicate:

- History
- Heritage
- Authenticity
- Collectibility
- Trust
- Premium presentation

The visual identity should suit historical Indian collectible coins.

### Primary Design Language

Use:

- Warm cream / off-white backgrounds
- Dark forest green as the primary brand color
- Muted antique-gold accents
- Neutral dark text
- Subtle borders
- Soft shadows
- Generous whitespace
- Clean typography
- Premium product presentation

Avoid:

- Neon colors
- Excessive gradients
- Excessive animations
- Heavy shadows
- Excessive glassmorphism
- Generic SaaS dashboard styling
- Generic electronics-store styling
- Generic fashion-store styling
- Overly playful styling

The application should visually feel connected to Indian history,
collectibles and numismatics.

---

## 7. Reference Design

A homepage reference image may be provided in the repository or directly to
the coding agent.

When a reference design is supplied:

- Treat it as the primary visual reference.
- Follow its overall layout closely.
- Match section order.
- Match approximate proportions.
- Match content density.
- Match spacing.
- Match typography hierarchy.
- Match card dimensions where practical.
- Match header structure.
- Match the cream, green and gold visual language.
- Match desktop layout closely.
- Adapt the design intelligently for tablet and mobile.

Do not replace the supplied design with a completely different generic
e-commerce layout.

Pixel-perfect reproduction is not required unless explicitly requested, but
the implemented interface should clearly resemble the reference.

---

## 8. Homepage Structure

The homepage may contain the following sections.

### Trust Bar

Possible information:

- Trusted by collectors
- Authentic collectible coins
- Secure packaging
- Pan India delivery

### Main Header

May include:

- Coins Gyaan Store branding
- Search bar
- Track Order
- Wishlist
- Cart
- Login / Signup

### Navigation

May include:

- All Categories
- Home
- Coins
- Coin Sets
- Ancient Coins
- New Arrivals
- Best Sellers
- About Us
- Contact Us

Navigation may evolve as the product catalog develops.

### Hero Section

May include:

- Main historical/collector-focused heading
- Supporting description
- Shop Now CTA
- Historical coin imagery
- Collector statistics
- Product statistics
- Store rating

### Explore by Category

Potential categories include:

- Ancient India
- British India
- Republic India
- Commemorative Coins
- Rare Coins
- Coin Sets
- Discontinued Coins

The exact categories should reflect the actual catalog.

### Featured Coins

Use reusable product cards.

Cards may contain:

- Product image
- Coin name
- Year
- Short description
- Price
- Wishlist control
- Add to Cart button

### Why Collect Indian Coins?

Possible benefits include:

- Historical Value
- Collectibility
- Cultural Heritage
- Passion & Legacy

Avoid making guaranteed investment-return claims about collectible coins.

### New Arrivals

Display recently added collectible coins using compact product cards.

### Store Benefits

Possible benefits:

- Authenticity focused
- Secure Packaging
- Easy Returns
- Pan India Shipping

Only make claims that the actual store can support.

### Footer

May include:

- Brand information
- Store links
- Customer service
- Company information
- Newsletter UI
- Social links
- Copyright
- Payment method indicators

---

## 9. Historical Accuracy

Historical accuracy is important for this project.

Do NOT invent historical facts simply to populate the interface.

Do not fabricate:

- coin dates
- rulers
- issuing authorities
- historical events
- mint information
- metal composition
- rarity
- weight
- dimensions
- historical significance
- production quantities
- coin descriptions

If factual information has not been provided, use clearly identified mock
content or neutral placeholders during development.

Historical product descriptions should eventually use verified information.

Do not present AI-generated historical assumptions as factual product data.

---

## 10. Product Domain

Products represent historical or collectible coins.

A product may eventually contain information such as:

- id
- slug
- name
- denomination
- year
- era
- issuingAuthority
- mint
- metal
- weight
- diameter
- condition
- grade
- rarity
- category
- description
- historicalDescription
- price
- stock
- images
- authenticityInformation
- featured
- createdAt
- updatedAt

Not every field will apply to every coin.

Do not force irrelevant historical fields onto every product.

The exact Prisma schema should be designed when database development begins.

---

## 11. Validation Rules

Do not run TypeScript, ESLint, or production build checks after every small
styling or visual adjustment.

For small UI changes such as spacing, sizing, colors, typography, positioning,
or responsive tweaks:
- make the requested change only
- do not automatically run validation commands

Run TypeScript and ESLint checks when:
- implementing a meaningful new component or feature
- changing application logic or types
- explicitly requested
- reaching a development checkpoint

Run the production build only when explicitly requested or before a major
deployment/release checkpoint.

---

## 12. Product Data During Frontend Development

During frontend development, use mock product arrays rather than duplicated
JSX.

For example, product data may be represented as:

```ts
{
  id: "coin-001",
  slug: "example-collectible-coin",
  name: "Example Collectible Coin",
  year: 1988,
  price: 250,
  image: "/images/products/example.png",
  category: "Republic India",
  featured: true
}
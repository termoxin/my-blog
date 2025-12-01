# Design System Reference

Quick reference guide for the Apple-inspired design system.

---

## 🎨 Colors

```javascript
import { tokens } from './src/theme/tokens'

// Backgrounds
tokens.colors.bgPrimary        // #FFFFFF - Pure white
tokens.colors.bgSecondary      // #F5F5F7 - Light grey
tokens.colors.bgTertiary       // #F8F8FA - Lighter grey
tokens.colors.bgElevated       // #FAFAFA - Elevated surfaces

// Text
tokens.colors.textPrimary      // #111111 - Near black
tokens.colors.textSecondary    // #6E6E73 - Grey
tokens.colors.textTertiary     // #8E8E93 - Light grey
tokens.colors.textQuaternary   // #C7C7CC - Very light grey

// Brand
tokens.colors.brandPurple      // #6C63FF - Primary brand
tokens.colors.brandPurpleLight // #8B83FF - Lighter variant
tokens.colors.brandPurpleDark  // #5449E0 - Darker variant

// Borders
tokens.colors.borderLight      // #E5E5E7 - Light border
tokens.colors.borderMedium     // #D1D1D6 - Medium border
```

---

## 📏 Spacing

```javascript
// 8px-based scale
tokens.spacing.xs    // 8px
tokens.spacing.sm    // 12px
tokens.spacing.md    // 16px
tokens.spacing.lg    // 24px
tokens.spacing.xl    // 32px
tokens.spacing['2xl'] // 48px
tokens.spacing['3xl'] // 64px
tokens.spacing['4xl'] // 80px
tokens.spacing['5xl'] // 96px
tokens.spacing['6xl'] // 128px
```

**Usage Example:**
```jsx
padding: ${tokens.spacing.xl};           // 32px
margin: ${tokens.spacing['2xl']} 0;      // 48px 0
gap: ${tokens.spacing.lg};               // 24px
```

---

## ✍️ Typography

### Font Sizes
```javascript
tokens.typography.fontSize.xs    // 12px
tokens.typography.fontSize.sm    // 14px
tokens.typography.fontSize.base  // 16px
tokens.typography.fontSize.lg    // 18px
tokens.typography.fontSize.xl    // 20px
tokens.typography.fontSize['2xl'] // 24px
tokens.typography.fontSize['3xl'] // 28px
tokens.typography.fontSize['4xl'] // 32px
tokens.typography.fontSize['5xl'] // 40px
tokens.typography.fontSize['6xl'] // 48px
tokens.typography.fontSize['7xl'] // 56px
tokens.typography.fontSize['8xl'] // 64px
tokens.typography.fontSize['9xl'] // 80px
```

### Font Weights
```javascript
tokens.typography.fontWeight.regular  // 400
tokens.typography.fontWeight.medium   // 500
tokens.typography.fontWeight.semibold // 600
tokens.typography.fontWeight.bold     // 700
tokens.typography.fontWeight.heavy    // 800
```

### Line Heights
```javascript
tokens.typography.lineHeight.tight   // 1.2
tokens.typography.lineHeight.snug    // 1.3
tokens.typography.lineHeight.normal  // 1.5
tokens.typography.lineHeight.relaxed // 1.6
tokens.typography.lineHeight.loose   // 1.8
```

### Letter Spacing
```javascript
tokens.typography.letterSpacing.tight  // -0.03em
tokens.typography.letterSpacing.normal // 0
tokens.typography.letterSpacing.wide   // 0.02em
```

---

## 🎭 Components

### Display (Hero Headlines)
```jsx
<Display size="lg">Large Hero</Display>
<Display>Default Hero</Display>
```
- Size: 80px (lg) or 56px (default)
- Weight: 700 (bold)
- Line height: 1.2 (tight)

### Headline (Section Titles)
```jsx
<Headline level={1}>Main Section</Headline>
<Headline level={2}>Subsection</Headline>
<Headline level={3}>Small Section</Headline>
<Headline level={4}>Tiny Section</Headline>
```
- Level 1: 48px
- Level 2: 40px
- Level 3: 32px
- Level 4: 28px

### Title (Card Titles)
```jsx
<Title size="xl">Extra Large</Title>
<Title size="lg">Large</Title>
<Title size="md">Medium</Title>
<Title size="sm">Small</Title>
```
- XL: 28px
- LG: 24px
- MD: 20px
- SM: 18px

### Subtitle
```jsx
<Subtitle size="lg">Large Subtitle</Subtitle>
<Subtitle size="md">Medium Subtitle</Subtitle>
<Subtitle size="sm">Small Subtitle</Subtitle>
```
- Color: Secondary text
- Max-width: 700px

### Body (Article Text)
```jsx
<Body size="lg">Large body text</Body>
<Body size="md">Medium body text</Body>
<Body size="sm">Small body text</Body>
```
- LG: 18px (recommended for articles)
- MD: 16px
- SM: 14px
- Line height: 1.8 (loose)

### Caption (Metadata)
```jsx
<Caption uppercase semibold>LABEL</Caption>
<Caption>Regular caption</Caption>
```
- Size: 12px
- Optional uppercase and semibold

### Eyebrow (Small Labels)
```jsx
<Eyebrow>NEW FEATURE</Eyebrow>
```
- Size: 10px
- Uppercase, semibold
- Brand purple color

---

## 📦 Layout Components

### Container
```jsx
<Container size="prose">
  {/* Max width 700px - for articles */}
</Container>

<Container size="article">
  {/* Max width 800px - for article layouts */}
</Container>

<Container size="content">
  {/* Max width 1040px - default */}
</Container>

<Container size="wide">
  {/* Max width 1280px - for wide sections */}
</Container>
```

### Section
```jsx
<Section spacing="sm" bg="primary">
  {/* 48px vertical padding */}
</Section>

<Section spacing="md" bg="secondary">
  {/* 64px vertical padding */}
</Section>

<Section spacing="lg">
  {/* 80px vertical padding */}
</Section>

<Section spacing="xl">
  {/* 96px vertical padding */}
</Section>
```

**Background options:**
- `bg="primary"` - White (#FFFFFF)
- `bg="secondary"` - Light grey (#F5F5F7)
- `bg="tertiary"` - Lighter grey (#F8F8FA)
- No bg - Transparent

---

## 🎴 Card Components

### ShowcaseCard (Projects)
```jsx
<ShowcaseCard
  title="🚀 Project Name"
  description="Brief project description"
  cover="/path/to/cover.jpg"
  status="In Progress"
  slug="project-slug"
  bgColor="linear-gradient(...)"
  compact={false}
/>
```

**Status colors:**
- `Successful` → Green (#10B981)
- `In Progress` → Orange (#F59E0B)
- `Worked, keep going` → Cyan (#06B6D4)
- `Failed` → Red (#EF4444)

### BlogCard (Articles)
```jsx
<BlogCard
  title="Article Title"
  description="Article description"
  cover="/path/to/cover.jpg"
  date="January 15, 2025"
  status="Published"
  slug="article-slug"
/>
```

---

## 🎯 Shadows (Apple-style)

```javascript
tokens.shadows.xs    // 0 1px 3px rgba(0,0,0,0.04)
tokens.shadows.sm    // 0 2px 8px rgba(0,0,0,0.04)
tokens.shadows.md    // 0 4px 16px rgba(0,0,0,0.06)
tokens.shadows.lg    // 0 8px 32px rgba(0,0,0,0.08)
tokens.shadows.xl    // 0 16px 48px rgba(0,0,0,0.10)
tokens.shadows['2xl'] // 0 24px 64px rgba(0,0,0,0.12)
```

**Usage:**
```jsx
box-shadow: ${tokens.shadows.md};
```

---

## 🔵 Border Radius

```javascript
tokens.radius.sm    // 8px
tokens.radius.md    // 12px
tokens.radius.lg    // 16px
tokens.radius.xl    // 20px
tokens.radius['2xl'] // 24px
tokens.radius['3xl'] // 32px
tokens.radius.full  // 9999px (pill shape)
```

---

## ⚡ Transitions

```javascript
tokens.transitions.fast   // 150ms cubic-bezier(0.4, 0, 0.2, 1)
tokens.transitions.base   // 200ms cubic-bezier(0.4, 0, 0.2, 1)
tokens.transitions.slow   // 300ms cubic-bezier(0.4, 0, 0.2, 1)
tokens.transitions.smooth // 400ms cubic-bezier(0.16, 1, 0.3, 1) ← Apple's signature
```

**Usage:**
```jsx
transition: all ${tokens.transitions.smooth};
transition: opacity ${tokens.transitions.fast};
```

---

## 📱 Breakpoints

```javascript
tokens.breakpoints.sm   // 640px
tokens.breakpoints.md   // 768px
tokens.breakpoints.lg   // 1024px
tokens.breakpoints.xl   // 1280px
tokens.breakpoints['2xl'] // 1536px
```

**Usage:**
```jsx
@media (max-width: ${tokens.breakpoints.md}) {
  font-size: ${tokens.typography.fontSize['3xl']};
}
```

---

## 🎬 Animations

### AnimatedWrapper (Fade in on scroll)
```jsx
<AnimatedWrapper delay={100} threshold={0.1}>
  <YourComponent />
</AnimatedWrapper>
```

**Props:**
- `delay`: Delay in milliseconds (default: 0)
- `threshold`: Intersection threshold (default: 0.1)

---

## 🎨 Common Patterns

### Card with Hover Effect
```jsx
const Card = styled.div`
  background: ${tokens.colors.bgPrimary};
  border-radius: ${tokens.radius['2xl']};
  padding: ${tokens.spacing.xl};
  box-shadow: ${tokens.shadows.md};
  transition: all ${tokens.transitions.smooth};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadows.lg};
  }
`
```

### Button
```jsx
const Button = styled.button`
  padding: ${tokens.spacing.md} ${tokens.spacing.xl};
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.brandPurple};
  color: ${tokens.colors.bgPrimary};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  transition: all ${tokens.transitions.base};
  
  &:hover {
    background: ${tokens.colors.brandPurpleDark};
    transform: translateY(-2px);
  }
`
```

### Badge
```jsx
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.bgSecondary};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`
```

---

## ✨ Pro Tips

1. **Stick to the scale**: Always use tokens instead of arbitrary values
2. **Use spacing consistently**: Prefer xl, 2xl, 3xl for major spacing
3. **Typography hierarchy**: Display → Headline → Title → Body → Caption
4. **Shadows are subtle**: Use md for cards, lg for elevated elements
5. **Transitions**: Use smooth for important animations, fast for micro-interactions
6. **Border radius**: 2xl-3xl for cards, full for badges/buttons
7. **Colors**: Use brandPurple sparingly as accent color
8. **Line height**: loose (1.8) for body text, tight (1.2) for headlines

---

## 🎯 Quick Copy-Paste Snippets

### Full Article Layout
```jsx
<Container size="prose">
  <Display>Article Title</Display>
  <Caption uppercase semibold>January 15, 2025</Caption>
  <Body size="lg">
    Your article content here...
  </Body>
</Container>
```

### Card Grid
```jsx
<Container size="content">
  <Headline level={1}>Projects</Headline>
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: tokens.spacing['2xl']
  }}>
    <ShowcaseCard {...props1} />
    <ShowcaseCard {...props2} />
  </div>
</Container>
```

### Hero Section
```jsx
<Section spacing="xl" bg="secondary">
  <Container size="content">
    <Eyebrow>New Feature</Eyebrow>
    <Display size="lg">Welcome to My Site</Display>
    <Subtitle size="lg">
      Building products that matter
    </Subtitle>
  </Container>
</Section>
```

---

**Reference this guide whenever building new components! 🎨**


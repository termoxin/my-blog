# Premium Apple-Grade Typography System

## 🎯 Overview

Implemented a top-0.1% premium typography system with optical sizing, negative letter-spacing for display text, and cinematic rhythm spacing.

---

## ✍️ Font Families

### **Display: Space Grotesk** (Neue Montreal alternative)
- **Usage**: Hero headlines (h1, h2), major titles
- **Fallback**: SF Pro Display, system-ui
- **Features**: Geometric sans with optical weights
- **Notes**: Replace with actual Neue Montreal in production

```css
font-family: "Space Grotesk", -apple-system, "SF Pro Display", sans-serif;
```

### **Body: Inter**
- **Usage**: All body text, UI elements, paragraphs
- **Fallback**: SF Pro Text, Segoe UI
- **Features**: Variable font with excellent readability
- **Notes**: Industry-standard for premium interfaces

```css
font-family: "Inter", -apple-system, "SF Pro Text", sans-serif;
```

### **Serif: Playfair Display** (Editorial New alternative)
- **Usage**: Accent text, pull quotes, special headings
- **Fallback**: Tiempos Text, Georgia
- **Features**: High-contrast serif with elegance
- **Notes**: Replace with Editorial New for production

```css
font-family: "Playfair Display", Georgia, serif;
```

---

## 📐 Typography Scale

### **Headings (with optical sizing)**

```javascript
h1: {
  size: 86px,
  lineHeight: 1.02,
  letterSpacing: -0.03em,
  weight: 800,
  family: display
}

h2: {
  size: 64px,
  lineHeight: 1.05,
  letterSpacing: -0.02em,
  weight: 700,
  family: display
}

h3: {
  size: 48px,
  lineHeight: 1.10,
  letterSpacing: -0.01em,
  weight: 700,
  family: display
}

h4: {
  size: 32px,
  lineHeight: 1.15,
  letterSpacing: 0,
  weight: 600,
  family: display
}

h5: {
  size: 24px,
  lineHeight: 1.25,
  letterSpacing: 0,
  weight: 600,
  family: display
}

h6: {
  size: 20px,
  lineHeight: 1.30,
  letterSpacing: 0,
  weight: 600,
  family: display
}
```

### **Body Text**

```javascript
body-lg: {
  size: 20px,
  lineHeight: 1.55,
  family: sans
}

body-md: {
  size: 18px,
  lineHeight: 1.55,
  family: sans
}

body-sm: {
  size: 16px,
  lineHeight: 1.60,
  family: sans
}

caption: {
  size: 14px,
  lineHeight: 1.40,
  family: sans
}
```

---

## 🎨 Key Principles

### **1. Negative Letter-Spacing for Display**
Large text (h1-h3) uses tighter letter-spacing for premium look:
- h1: `-0.03em` (tightest)
- h2: `-0.02em` (tighter)
- h3: `-0.01em` (tight)
- h4-h6: `0` (normal)

### **2. Optical Line Heights**
Larger text = tighter line-height:
- h1: `1.02` (ultra-tight)
- h2: `1.05` (very tight)
- h3: `1.10` (tight)
- Body: `1.55` (comfortable)

### **3. Refined Paragraph Rhythm**
- Bottom margin: `1.2em` (not equal spacing)
- Creates visual rhythm, not monotony
- Feels like premium editorial design

### **4. Font Features Enabled**
```css
font-feature-settings: 'kern' 1, 'liga' 1, 'ss01' 1;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

---

## 📏 Premium Spacing Rules

### **Major Sections** (cinematic rhythm)
```javascript
section-sm: 80px   // Small sections
section-md: 96px   // Medium sections
section-lg: 120px  // Large sections (hero)
section-xl: 160px  // Extra large sections
```

### **Minor Groups**
```javascript
group-sm: 32px     // Tight groups
group-md: 40px     // Medium groups
group-lg: 48px     // Loose groups
```

### **Usage Example**
```jsx
// Major section spacing (80-120px)
<Section spacing="section-lg">
  <Headline>Title</Headline>
  
  // Minor group spacing (32-48px)
  <div style={{ marginBottom: tokens.spacing['group-md'] }}>
    <Body>Content</Body>
  </div>
</Section>
```

---

## 🎯 Component Usage

### **Display Component**
For hero headlines:

```jsx
import { Display } from '../components/Typography'

<Display size="lg">
  Rostyslav Futornyi
</Display>

// Renders:
// - 86px font size (clamped responsive)
// - Line height 1.02
// - Letter spacing -0.03em
// - Font: Space Grotesk
// - Gradient text effect
```

### **Headline Component**
For section titles:

```jsx
import { Headline } from '../components/Typography'

<Headline level={1}>Projects</Headline>
<Headline level={2}>Articles</Headline>

// Level 1: 64px / 1.05 / -0.02em
// Level 2: 48px / 1.10 / -0.01em
```

### **Body Component**
For paragraphs:

```jsx
import { Body } from '../components/Typography'

<Body size="lg">
  Your article content with perfect rhythm...
</Body>

// Renders:
// - 20px font size
// - Line height 1.55
// - Bottom margin 1.2em
// - Font: Inter
```

---

## 🎨 Global Styles Applied

### **Base Typography**
```css
body {
  font-size: 18px;
  line-height: 1.55;
  font-family: "Inter", -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### **Headings**
All headings use:
- Display font family (Space Grotesk)
- Optical line heights
- Negative letter-spacing (h1-h3)
- Font feature settings enabled
- Antialiasing

### **Paragraphs**
```css
p {
  font-size: 20px;
  line-height: 1.55;
  margin-bottom: 1.2em; /* Not equal spacing! */
}
```

---

## 📱 Responsive Behavior

### **Mobile Adjustments**
```javascript
// h1: 86px → 48px
// h2: 64px → 40px
// h3: 48px → 32px
// h4: 32px → 24px
// body-lg: 20px → 18px
```

All adjustments maintain:
- Optical ratios
- Letter-spacing relationships
- Line-height comfort
- Premium feel at all sizes

---

## 🎭 Before vs After

| Element | Before | After |
|---------|--------|-------|
| **h1** | 56px / 1.2 / 0 | 86px / 1.02 / -0.03em |
| **h2** | 40px / 1.3 / 0 | 64px / 1.05 / -0.02em |
| **h3** | 32px / 1.3 / 0 | 48px / 1.10 / -0.01em |
| **Body** | 16px / 1.9 | 20px / 1.55 |
| **Font** | System | Inter + Space Grotesk |
| **Spacing** | Equal | Cinematic rhythm |
| **Features** | Basic | Optical kerning |

---

## 🚀 Examples in Use

### **Hero Section**
```jsx
<PremiumHero title="🚀 Your Project" />

// Renders h1 with:
// - 86px (responsive clamp)
// - Line height 1.02
// - Letter spacing -0.03em
// - Gradient text effect
// - Premium whitespace (120px sections)
```

### **Article Content**
```jsx
<article>
  <h2>Section Title</h2>  {/* 64px / 1.05 / -0.02em */}
  <p>Body text...</p>      {/* 20px / 1.55 / 1.2em margin */}
  <h3>Subsection</h3>      {/* 48px / 1.10 / -0.01em */}
  <p>More content...</p>   {/* 20px / 1.55 / 1.2em margin */}
</article>

// Creates cinematic rhythm with:
// - 80px spacing between major sections
// - 32-48px spacing between groups
// - 1.2em paragraph rhythm
```

---

## ✅ Quality Checklist

- ✅ Negative letter-spacing on display text (h1-h3)
- ✅ Optical line heights (1.02 → 1.55)
- ✅ Premium fonts (Inter + Space Grotesk)
- ✅ Font features enabled (kern, liga, ss01)
- ✅ Antialiasing enabled
- ✅ Cinematic spacing (80-120px sections)
- ✅ Paragraph rhythm (1.2em not equal)
- ✅ Responsive with optical scaling
- ✅ Consistent across all components
- ✅ Premium feel throughout

---

## 🎯 Token Reference

Quick reference for developers:

```javascript
// Font families
tokens.typography.fontFamily.display  // Space Grotesk
tokens.typography.fontFamily.sans     // Inter
tokens.typography.fontFamily.serif    // Playfair Display

// Sizes
tokens.typography.fontSize.h1         // 86px
tokens.typography.fontSize.h2         // 64px
tokens.typography.fontSize['body-lg'] // 20px

// Line heights
tokens.typography.lineHeight.h1       // 1.02
tokens.typography.lineHeight['body-lg'] // 1.55

// Letter spacing
tokens.typography.letterSpacing.tightest  // -0.03em
tokens.typography.letterSpacing.tighter   // -0.02em

// Spacing
tokens.spacing['section-lg']  // 120px
tokens.spacing['group-md']    // 40px
```

---

## 📚 Production Notes

### **Replace Fonts in Production**

1. **Neue Montreal**
   ```css
   @import url('https://use.typekit.net/your-kit.css');
   /* or */
   @font-face {
     font-family: 'Neue Montreal';
     src: url('/fonts/NeueMontreal-Bold.woff2');
   }
   ```

2. **Editorial New**
   ```css
   @import url('https://use.typekit.net/your-kit.css');
   /* or purchase from fonts.adobe.com */
   ```

3. **Update tokens.js**
   ```javascript
   fontFamily: {
     display: '"Neue Montreal", -apple-system, sans-serif',
     serif: '"Editorial New", Georgia, serif',
   }
   ```

---

## 🎉 Result

The typography system now features:
- ✨ **Premium optical sizing** with negative tracking
- 📐 **86px hero headlines** with ultra-tight line-height (1.02)
- ✍️ **20px body text** with comfortable reading (1.55)
- 🎭 **Cinematic spacing rhythm** (80-120px sections)
- 💎 **Professional font stack** (Inter + Space Grotesk)
- 🎯 **Top-0.1% visual identity**

**Every heading, every paragraph, every space is optically tuned for premium quality.**

---

**Typography is the foundation of premium design. This system ensures futornyi.com looks expensive at every scale. 🎯**


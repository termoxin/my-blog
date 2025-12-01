/**
 * Design Tokens - Apple-inspired Premium Design System
 * Consistent spacing, colors, typography, and effects
 */

export const tokens = {
  // COLORS
  colors: {
    // Backgrounds
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F5F5F7',
    bgTertiary: '#F8F8FA',
    bgElevated: '#FAFAFA',
    
    // Text
    textPrimary: '#111111',
    textSecondary: '#6E6E73',
    textTertiary: '#8E8E93',
    textQuaternary: '#C7C7CC',
    
    // Brand
    brandPurple: '#6C63FF',
    brandPurpleLight: '#8B83FF',
    brandPurpleDark: '#5449E0',
    
    // Borders
    borderLight: '#E5E5E7',
    borderMedium: '#D1D1D6',
    
    // States
    hover: 'rgba(0, 0, 0, 0.04)',
    pressed: 'rgba(0, 0, 0, 0.08)',
    focus: 'rgba(108, 99, 255, 0.12)',
  },

  // SPACING (Premium cinematic rhythm)
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '96px',
    '6xl': '128px',
    // Premium major sections
    'section-sm': '80px',
    'section-md': '96px',
    'section-lg': '120px',
    'section-xl': '160px',
    // Premium groups
    'group-sm': '32px',
    'group-md': '40px',
    'group-lg': '48px',
  },

  // TYPOGRAPHY (Premium Apple-grade)
  typography: {
    fontFamily: {
      // Display: For hero headlines and major titles
      display: '"Neue Montreal", -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      // Body: For all body text and UI
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      // Serif: For accent text and quotes
      serif: '"Editorial New", "Tiempos Text", Georgia, "Times New Roman", serif',
      // Mono: For code
      mono: '"SF Mono", "Consolas", "Monaco", "Courier New", monospace',
    },
    
    // Premium typography scale with optical sizing
    fontSize: {
      // Display headings (h1)
      h1: '86px',
      // Section headings (h2)
      h2: '64px',
      // Subsection headings (h3)
      h3: '48px',
      // Component headings (h4)
      h4: '32px',
      // Small headings (h5)
      h5: '24px',
      // Tiny headings (h6)
      h6: '20px',
      // Body text
      'body-lg': '20px',
      'body-md': '18px',
      'body-sm': '16px',
      'caption': '14px',
      // Legacy support
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '40px',
      '6xl': '48px',
      '7xl': '56px',
      '8xl': '64px',
      '9xl': '80px',
    },
    
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
      black: 900,
    },
    
    // Optical line heights
    lineHeight: {
      // Display headings
      h1: '1.02',
      h2: '1.05',
      h3: '1.10',
      h4: '1.15',
      h5: '1.25',
      h6: '1.30',
      // Body text
      'body-lg': '1.55',
      'body-md': '1.55',
      'body-sm': '1.60',
      'caption': '1.40',
      // Legacy support
      tight: '1.2',
      snug: '1.3',
      normal: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
    
    // Optical letter spacing (negative for display)
    letterSpacing: {
      tightest: '-0.03em',  // h1
      tighter: '-0.02em',   // h2
      tight: '-0.01em',     // h3
      normal: '0',          // h4-h6, body
      wide: '0.02em',
      wider: '0.05em',
      widest: '0.08em',
    },
  },

  // BORDER RADIUS (Premium optical)
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    full: '9999px',
    // Signature curves
    signature: '28px',
    card: '32px',
    hero: '48px',
  },

  // SHADOWS (Premium cinematic)
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.04)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
    md: '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.10), 0 8px 16px rgba(0, 0, 0, 0.05)',
    '2xl': '0 24px 64px rgba(0, 0, 0, 0.12), 0 12px 24px rgba(0, 0, 0, 0.06)',
    // Premium cinematic shadows
    soft: '0 20px 60px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
    float: '0 40px 100px rgba(0, 0, 0, 0.10), 0 16px 40px rgba(0, 0, 0, 0.06)',
    depth: '0 60px 140px rgba(0, 0, 0, 0.14), 0 24px 60px rgba(0, 0, 0, 0.08)',
    // Volumetric glow shadows
    glow: '0 0 40px rgba(108, 99, 255, 0.15), 0 0 80px rgba(108, 99, 255, 0.08)',
    glowStrong: '0 0 60px rgba(108, 99, 255, 0.25), 0 0 120px rgba(108, 99, 255, 0.15)',
  },

  // TRANSITIONS (Premium motion curves)
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '400ms cubic-bezier(0.16, 1, 0.3, 1)', // Apple's signature easing
    // Cinematic motion
    cinematic: '600ms cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: '800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    elastic: '1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    // Micro-physics
    spring: '500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // BREAKPOINTS
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // CONTAINER WIDTHS
  maxWidth: {
    prose: '700px',   // For article content
    article: '800px', // For article layouts
    content: '1040px', // For general content
    wide: '1280px',   // For wide sections
    ultra: '1440px',  // For hero sections
  },

  // CINEMATIC GRADIENTS
  gradients: {
    // Matte gradients (Arc Browser inspired)
    matte1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    matte2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    matte3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    matte4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    matte5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    
    // Ambient backgrounds
    ambient1: 'radial-gradient(circle at 20% 50%, rgba(108, 99, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 131, 255, 0.06) 0%, transparent 50%)',
    ambient2: 'radial-gradient(circle at 50% 0%, rgba(108, 99, 255, 0.05) 0%, transparent 60%)',
    ambient3: 'radial-gradient(ellipse at 50% 100%, rgba(108, 99, 255, 0.12) 0%, transparent 50%)',
    
    // Depth gradients
    depth1: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(245,245,247,0.4) 50%, rgba(245,245,247,1) 100%)',
    depth2: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 50%, rgba(248,248,250,1) 100%)',
    
    // Glass effects
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
    glassStrong: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
    
    // Shimmer overlay
    shimmer: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
  },

  // Z-INDEX LAYERS
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
  },
}

// Helper function to get token values easily
export const getToken = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], tokens)
}

export default tokens


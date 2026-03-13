# Developer Guide

This guide provides comprehensive information for developers working on the Flourish CV project, with special focus on maintaining accessibility and browser compatibility.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── layout/         # Layout components
├── pages/              # Page components
├── templates/          # CV template components
├── utils/              # Utility functions
│   ├── accessibility.ts    # Accessibility utilities
│   ├── colorContrast.ts   # Color contrast validation
│   └── sanitize.ts        # Content sanitization
├── hooks/              # Custom React hooks
├── lib/                # Third-party library configurations
└── styles/             # Global styles and CSS
```

## 🎯 Accessibility Development Guidelines

### Component Development

**Always include:**
```tsx
// Proper ARIA labeling
<button
  aria-label="Delete resume"
  aria-describedby="delete-help"
  onClick={handleDelete}
>
  <TrashIcon />
</button>
<div id="delete-help" className="sr-only">
  This action cannot be undone
</div>

// Focus management
const handleModalOpen = () => {
  setIsOpen(true);
  setTimeout(() => {
    firstFocusableElement.current?.focus();
  }, 100);
};

// Keyboard event handling
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClose();
  }
};
```

**Form Components:**
```tsx
// Proper form labeling
<div className="form-group">
  <label htmlFor="email" className="required">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <div id="email-error" role="alert" className="error">
      Please enter a valid email address
    </div>
  )}
</div>
```

### Color Contrast Utilities

Use the built-in color contrast utilities:

```typescript
import { validateCVColors, getContrastRatio } from '@/utils/colorContrast';

// Validate template colors
const validation = validateCVColors(primaryColor, secondaryColor);

// Check specific contrast ratio
const ratio = getContrastRatio('#000000', '#ffffff'); // Returns 21

// Get accessibility level
const level = getAccessibilityLevel(ratio); // 'AAA', 'AA', or 'Fail'
```

### Skip Links Implementation

```tsx
// Add skip links to main layout
<div className="skip-links">
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
  <a href="#navigation" className="skip-link">
    Skip to navigation
  </a>
</div>
```

```css
/* Skip link styles */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

## 🌐 Browser Compatibility Guidelines

### Supported Features

**Modern JavaScript (ES2015+):**
- Arrow functions
- Template literals
- Destructuring
- Async/await
- Array methods (map, filter, find, etc.)
- Object methods (entries, values, assign)

**CSS Features:**
- Flexbox
- CSS Grid
- Custom properties (CSS variables)
- Media queries
- Transforms and transitions

### Polyfills and Fallbacks

**Automatic Polyfills:**
The build system automatically includes polyfills for:
- Promise
- Array methods
- Object methods
- Fetch API

**Manual Fallbacks:**
```css
/* CSS Grid with Flexbox fallback */
.grid-container {
  display: flex;
  flex-wrap: wrap;
  display: grid; /* Overrides flex for supporting browsers */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* CSS custom properties with fallback */
.button {
  background-color: #3b82f6; /* Fallback */
  background-color: var(--primary, #3b82f6);
}
```

### Testing Browser Compatibility

**Automated Testing:**
```bash
# Run browser compatibility tests
npm run test:browsers

# Test specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari
```

**Manual Testing:**
1. Use the built-in compatibility test script
2. Test in BrowserStack or similar service
3. Validate with real devices when possible

## 🧪 Testing Guidelines

### Accessibility Testing

**Automated Tests:**
```typescript
// Jest + Testing Library example
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<CVTemplate />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Test keyboard navigation
test('should be keyboard navigable', () => {
  render(<Navigation />);
  const firstLink = screen.getByRole('link', { name: /home/i });
  firstLink.focus();
  
  fireEvent.keyDown(firstLink, { key: 'Tab' });
  const secondLink = screen.getByRole('link', { name: /templates/i });
  expect(secondLink).toHaveFocus();
});
```

**Manual Testing Checklist:**
- [ ] Keyboard navigation works completely
- [ ] Screen reader announces all content
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG standards
- [ ] Forms are properly labeled
- [ ] Error messages are accessible
- [ ] Skip links function correctly

### Performance Testing

```typescript
// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🎨 Styling Guidelines

### CSS Architecture

**Use CSS custom properties:**
```css
:root {
  /* Light mode */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
}

[data-theme="dark"] {
  /* Dark mode */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
}
```

**Responsive Design:**
```css
/* Mobile-first approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

**Accessibility-focused CSS:**
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .card {
    border: 2px solid;
  }
}

/* Focus indicators */
.focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 🔧 Build and Deployment

### Build Configuration

**Vite Configuration:**
```typescript
// vite.config.ts highlights
export default defineConfig({
  build: {
    target: ['es2015', 'chrome79', 'firefox67', 'safari12', 'edge79'],
    cssTarget: ['chrome79', 'firefox67', 'safari12', 'edge79'],
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-libs': ['html2canvas', 'jspdf'],
          'ui-radix': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          // ... other chunks
        }
      }
    }
  }
});
```

**Browser Support:**
```
# .browserslistrc
[production]
chrome >= 79
firefox >= 67
safari >= 12
edge >= 79
> 0.5%
last 2 versions
not dead
not ie 11
not op_mini all

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
last 1 edge version
```

### Performance Optimization

**Code Splitting:**
```typescript
// Lazy load components
const CVBuilder = lazy(() => import('./pages/CVBuilder'));
const Templates = lazy(() => import('./pages/Templates'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <CVBuilder />
</Suspense>
```

**Bundle Analysis:**
```bash
# Analyze bundle size
npm run build:analyze

# Check for duplicate dependencies
npm run deps:check
```

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] Run accessibility audit: `npm run audit:a11y`
- [ ] Test browser compatibility: `npm run test:browsers`
- [ ] Check bundle size: `npm run build:analyze`
- [ ] Validate color contrast in all templates
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Test on mobile devices
- [ ] Check PDF export functionality
- [ ] Validate form submissions
- [ ] Test error handling

### Post-deployment

- [ ] Run Lighthouse audit
- [ ] Test with real screen readers
- [ ] Monitor Core Web Vitals
- [ ] Check error tracking
- [ ] Validate analytics
- [ ] Test from different networks
- [ ] Verify CDN performance

## 📊 Monitoring and Maintenance

### Accessibility Monitoring

```typescript
// Monitor accessibility violations
import { axeCore } from '@axe-core/react';

if (process.env.NODE_ENV === 'development') {
  axeCore(React, ReactDOM, 1000);
}
```

### Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 🔄 Contributing Guidelines

### Code Review Checklist

**Accessibility:**
- [ ] ARIA labels are present and descriptive
- [ ] Keyboard navigation works
- [ ] Focus management is proper
- [ ] Color contrast is sufficient
- [ ] Screen reader testing completed

**Browser Compatibility:**
- [ ] Tested in supported browsers
- [ ] Polyfills added if needed
- [ ] Graceful degradation implemented
- [ ] Mobile responsive

**Performance:**
- [ ] Bundle size impact assessed
- [ ] Lazy loading implemented where appropriate
- [ ] Images optimized
- [ ] No memory leaks

### Git Workflow

```bash
# Feature branch naming
git checkout -b feature/accessibility-improvement
git checkout -b fix/browser-compatibility-issue
git checkout -b docs/update-accessibility-guide

# Commit message format
feat(a11y): add skip links to main navigation
fix(compat): add polyfill for Array.includes in IE11
docs(a11y): update screen reader testing guide
```

## 📚 Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [BrowserStack](https://www.browserstack.com/)

### Testing
- [Pa11y](https://pa11y.org/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [Jest Axe](https://github.com/nickcolley/jest-axe)
- [Testing Library](https://testing-library.com/)

Remember: Accessibility and browser compatibility are not one-time tasks but ongoing responsibilities that require continuous attention and testing.
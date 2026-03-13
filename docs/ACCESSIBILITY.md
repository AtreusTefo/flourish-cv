# Accessibility Guide

Flourish CV is built with accessibility as a core principle, ensuring that all users can create professional resumes regardless of their abilities or assistive technologies.

## 🎯 Accessibility Standards

This application meets **WCAG 2.1 AA** compliance standards and includes:

- ✅ **Perceivable**: Information is presentable in ways users can perceive
- ✅ **Operable**: Interface components are operable by all users
- ✅ **Understandable**: Information and UI operation are understandable
- ✅ **Robust**: Content can be interpreted by assistive technologies

## 🔧 Built-in Accessibility Features

### Screen Reader Support

**Compatible with:**
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)
- Orca (Linux)

**Features:**
- Semantic HTML structure
- Comprehensive ARIA labels
- Live regions for dynamic content
- Descriptive alt text for images
- Form labels and error messages

### Keyboard Navigation

**Navigation shortcuts:**
- `Tab` / `Shift+Tab`: Navigate between interactive elements
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close modals and dropdowns
- `Arrow keys`: Navigate within menus and lists
- `Home` / `End`: Jump to beginning/end of lists

**Skip links:**
- `Skip to main content`
- `Skip to navigation`
- `Skip to CV preview`

### Visual Accessibility

**Color and Contrast:**
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Built-in color contrast validator
- No information conveyed by color alone

**Typography:**
- Scalable fonts (supports 200% zoom)
- Clear, readable font families
- Adequate line spacing and letter spacing
- Consistent heading hierarchy

**Visual Indicators:**
- Focus indicators on all interactive elements
- Error states with clear visual cues
- Loading states with progress indicators
- Success/failure feedback

## 🎨 Color Contrast Validation

The application includes a built-in color contrast validator that:

1. **Automatically checks** primary and secondary colors
2. **Displays warnings** for insufficient contrast
3. **Provides recommendations** for accessible alternatives
4. **Shows WCAG compliance level** (AA/AAA)

### Using the Color Validator

1. Navigate to the Templates page
2. Select your preferred colors
3. Look for the contrast indicator next to color inputs
4. Follow recommendations if contrast is insufficient

## ⌨️ Keyboard Navigation Guide

### For Users

**Getting Started:**
1. Use `Tab` to navigate to the main content
2. Press `Enter` on "Create New CV" to start
3. Use `Tab` to move between form fields
4. Use `Arrow keys` in dropdown menus

**Form Navigation:**
- `Tab`: Move to next field
- `Shift+Tab`: Move to previous field
- `Enter`: Submit forms or activate buttons
- `Escape`: Cancel operations or close dialogs

**Template Selection:**
- `Tab` to template cards
- `Enter` to select a template
- `Arrow keys` to navigate template options

### For Developers

**Focus Management:**
```typescript
// Proper focus management example
const handleModalOpen = () => {
  setIsOpen(true);
  // Focus first interactive element
  setTimeout(() => {
    modalRef.current?.querySelector('button')?.focus();
  }, 100);
};
```

**ARIA Labels:**
```jsx
<button
  aria-label="Export CV as PDF"
  aria-describedby="export-help"
>
  Export PDF
</button>
<div id="export-help" className="sr-only">
  Downloads your CV as a PDF file
</div>
```

## 📱 Mobile Accessibility

**Touch Targets:**
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Swipe gestures for navigation

**Mobile Screen Readers:**
- VoiceOver gestures (iOS)
- TalkBack gestures (Android)
- Voice control compatibility

## 🔧 Testing Accessibility

### Automated Testing

**Browser Extensions:**
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

**Command Line:**
```bash
# Run accessibility tests
npm run test:a11y

# Generate accessibility report
npm run audit:a11y
```

### Manual Testing

**Keyboard Testing:**
1. Unplug your mouse
2. Navigate using only keyboard
3. Ensure all functionality is accessible
4. Check focus indicators are visible

**Screen Reader Testing:**
1. Enable screen reader (NVDA/VoiceOver)
2. Navigate with eyes closed
3. Verify all content is announced
4. Test form completion process

**Color Blindness Testing:**
- Use browser extensions like Colorblinding
- Test with different color vision simulations
- Ensure information isn't color-dependent

## 🎯 User Preferences

The application respects system preferences:

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**High Contrast Mode:**
```css
@media (prefers-contrast: high) {
  .card {
    border: 2px solid;
  }
}
```

**Dark Mode:**
- Automatic system preference detection
- Manual toggle available
- Maintains contrast ratios in dark theme

## 🐛 Reporting Accessibility Issues

If you encounter accessibility barriers:

1. **Describe the issue**: What happened vs. what you expected
2. **Provide context**: Browser, assistive technology, operating system
3. **Include steps**: How to reproduce the issue
4. **Suggest solutions**: If you have ideas for fixes

**Contact Information:**
- GitHub Issues: [Report accessibility bug]
- Email: accessibility@flourishcv.com
- Priority: Accessibility issues are treated as high priority

## 📚 Resources for Developers

**Guidelines:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

**Testing Tools:**
- [Pa11y](https://pa11y.org/) - Command line accessibility tester
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility engine
- [Accessibility Insights](https://accessibilityinsights.io/) - Microsoft's testing tools

**React Specific:**
- [React A11y ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [React Testing Library A11y](https://testing-library.com/docs/dom-testing-library/api-accessibility/)

## 🎉 Accessibility Achievements

- ✅ WCAG 2.1 AA Compliant
- ✅ Screen reader compatible
- ✅ Keyboard navigable
- ✅ Color contrast validated
- ✅ Mobile accessible
- ✅ Reduced motion support
- ✅ High contrast mode support
- ✅ Semantic HTML structure
- ✅ ARIA implementation
- ✅ Focus management

## 🔄 Continuous Improvement

Accessibility is an ongoing process. We regularly:

- Audit with automated tools
- Test with real users
- Update based on feedback
- Follow latest WCAG guidelines
- Train development team
- Monitor accessibility metrics

Your feedback helps us improve accessibility for everyone!
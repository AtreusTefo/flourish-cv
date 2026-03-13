/**
 * Color contrast utility functions for accessibility compliance
 * Based on WCAG 2.1 guidelines
 */

type AccessibilityLevel = 'AAA' | 'AA' | 'FAIL';

interface ContrastResult {
  ratio: number;
  level: AccessibilityLevel;
  levelLarge: AccessibilityLevel;
}

interface ValidationResults {
  primaryOnWhite: ContrastResult;
  primaryOnLight: ContrastResult;
  whiteOnPrimary: ContrastResult;
  secondaryOnWhite: ContrastResult;
  whiteOnSecondary: ContrastResult;
}

export interface CVColorValidation {
  results: ValidationResults;
  overall: AccessibilityLevel;
  recommendations: string[];
}

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance of a color
 * Formula from WCAG 2.1 specification
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    return 1; // Return minimum contrast if colors are invalid
  }
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Get accessibility level for a color combination
 */
export function getAccessibilityLevel(
  foreground: string, 
  background: string, 
  isLargeText = false
): 'AAA' | 'AA' | 'FAIL' {
  if (meetsWCAGAAA(foreground, background, isLargeText)) {
    return 'AAA';
  } else if (meetsWCAGAA(foreground, background, isLargeText)) {
    return 'AA';
  } else {
    return 'FAIL';
  }
}

/**
 * Validate CV template colors for accessibility
 */
export function validateCVColors(primaryColor: string, secondaryColor: string): CVColorValidation {
  const white = '#FFFFFF';
  const lightGray = '#F8F9FA';
  
  const results = {
    primaryOnWhite: {
      ratio: getContrastRatio(primaryColor, white),
      level: getAccessibilityLevel(primaryColor, white),
      levelLarge: getAccessibilityLevel(primaryColor, white, true)
    },
    primaryOnLight: {
      ratio: getContrastRatio(primaryColor, lightGray),
      level: getAccessibilityLevel(primaryColor, lightGray),
      levelLarge: getAccessibilityLevel(primaryColor, lightGray, true)
    },
    whiteOnPrimary: {
      ratio: getContrastRatio(white, primaryColor),
      level: getAccessibilityLevel(white, primaryColor),
      levelLarge: getAccessibilityLevel(white, primaryColor, true)
    },
    secondaryOnWhite: {
      ratio: getContrastRatio(secondaryColor, white),
      level: getAccessibilityLevel(secondaryColor, white),
      levelLarge: getAccessibilityLevel(secondaryColor, white, true)
    },
    whiteOnSecondary: {
      ratio: getContrastRatio(white, secondaryColor),
      level: getAccessibilityLevel(white, secondaryColor),
      levelLarge: getAccessibilityLevel(white, secondaryColor, true)
    }
  };
  
  // Overall assessment
  const hasFailures = Object.values(results).some(result => result.level === 'FAIL');
  const allAAA = Object.values(results).every(result => result.level === 'AAA');
  
  return {
    results,
    overall: hasFailures ? 'FAIL' : allAAA ? 'AAA' : 'AA',
    recommendations: generateRecommendations(results)
  };
}

/**
 * Generate accessibility recommendations based on color validation results
 */
function generateRecommendations(results: ValidationResults): string[] {
  const recommendations: string[] = [];
  
  if (results.primaryOnWhite.level === 'FAIL') {
    recommendations.push('Primary color needs better contrast against white backgrounds. Consider using a darker shade.');
  }
  
  if (results.whiteOnPrimary.level === 'FAIL') {
    recommendations.push('White text on primary color background has insufficient contrast. Consider using a darker primary color.');
  }
  
  if (results.secondaryOnWhite.level === 'FAIL') {
    recommendations.push('Secondary color needs better contrast against white backgrounds. Consider using a darker shade.');
  }
  
  if (results.whiteOnSecondary.level === 'FAIL') {
    recommendations.push('White text on secondary color background has insufficient contrast. Consider using a darker secondary color.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Color combination meets accessibility standards!');
  }
  
  return recommendations;
}

/**
 * Suggest accessible color alternatives
 */
export function suggestAccessibleColors(baseColor: string): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [];
  
  const suggestions: string[] = [];
  
  // Generate darker variants for better contrast
  for (let i = 7; i >= 3; i--) {
    const factor = i / 10;
    const darkerR = Math.round(rgb.r * factor);
    const darkerG = Math.round(rgb.g * factor);
    const darkerB = Math.round(rgb.b * factor);
    
    const darkerHex = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
    
    if (meetsWCAGAA(darkerHex, '#FFFFFF')) {
      suggestions.push(darkerHex);
    }
  }
  
  return suggestions.slice(0, 3); // Return top 3 suggestions
}
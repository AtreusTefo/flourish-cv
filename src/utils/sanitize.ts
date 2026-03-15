/**
 * Utility functions for input sanitization.
 * Validation rules are centralised in src/validation/ (Zod schemas).
 */

import { CVData } from '@/types/cv';
import { cvSchema } from '@/validation/cvSchema';

/**
 * Sanitizes HTML content by removing potentially dangerous elements and attributes
 */
export const sanitizeHtml = (input: string): string => {
  if (!input) return '';
  
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: protocol (except for images)
  sanitized = sanitized.replace(/data:(?!image\/)/gi, '');
  
  // Remove dangerous HTML tags
  const dangerousTags = ['script', 'object', 'embed', 'form', 'input', 'button', 'select', 'textarea', 'iframe', 'frame', 'frameset'];
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });
  
  return sanitized.trim();
};

/**
 * Sanitizes plain text input by encoding HTML entities
 */
export const sanitizeText = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sanitizes and validates CV form data
 */
export const sanitizeCVData = (data: CVData): CVData => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  
  // Sanitize personal info
  if (sanitized.personalInfo) {
    Object.keys(sanitized.personalInfo).forEach(key => {
      if (typeof sanitized.personalInfo[key as keyof typeof sanitized.personalInfo] === 'string') {
        (sanitized.personalInfo as Record<string, string>)[key] = sanitizeText(
          (sanitized.personalInfo as Record<string, string>)[key]
        );
      }
    });
  }
  
  // Sanitize summary
  if (typeof sanitized.summary === 'string') {
    sanitized.summary = sanitizeHtml(sanitized.summary);
  }
  
  // Sanitize experience entries
  if (Array.isArray(sanitized.experience)) {
    sanitized.experience = sanitized.experience.map((exp) => ({
      ...exp,
      position: sanitizeText(exp.position || ''),
      company: sanitizeText(exp.company || ''),
      location: sanitizeText(exp.location || ''),
      description: sanitizeHtml(exp.description || ''),
    }));
  }
  
  // Sanitize education entries
  if (Array.isArray(sanitized.education)) {
    sanitized.education = sanitized.education.map((edu) => ({
      ...edu,
      degree: sanitizeText(edu.degree || ''),
      institution: sanitizeText(edu.institution || ''),
      location: sanitizeText(edu.location || ''),
    }));
  }
  
  // Sanitize skills
  if (Array.isArray(sanitized.skills)) {
    sanitized.skills = sanitized.skills.map((skill: string) => sanitizeText(skill));
  }
  
  return sanitized;
};

/**
 * Validates required fields in CV data using the centralised Zod schema.
 */
export const validateCVData = (data: CVData): { isValid: boolean; errors: string[] } => {
  const result = cvSchema.safeParse(data);
  if (result.success) {
    return { isValid: true, errors: [] };
  }
  const errors = result.error.errors.map((e) => e.message);
  return { isValid: false, errors };
};
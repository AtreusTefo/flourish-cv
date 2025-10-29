/**
 * Utility functions for input sanitization and validation
 */

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
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (basic validation)
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Validates URL format
 */
export const validateUrl = (url: string): boolean => {
  if (!url) return true; // URL is optional
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitizes and validates CV form data
 */
export const sanitizeCVData = (data: any): any => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  
  // Sanitize personal info
  if (sanitized.personalInfo) {
    Object.keys(sanitized.personalInfo).forEach(key => {
      if (typeof sanitized.personalInfo[key] === 'string') {
        sanitized.personalInfo[key] = sanitizeText(sanitized.personalInfo[key]);
      }
    });
  }
  
  // Sanitize summary
  if (typeof sanitized.summary === 'string') {
    sanitized.summary = sanitizeHtml(sanitized.summary);
  }
  
  // Sanitize experience entries
  if (Array.isArray(sanitized.experience)) {
    sanitized.experience = sanitized.experience.map((exp: any) => ({
      ...exp,
      title: sanitizeText(exp.title || ''),
      company: sanitizeText(exp.company || ''),
      location: sanitizeText(exp.location || ''),
      description: sanitizeHtml(exp.description || ''),
    }));
  }
  
  // Sanitize education entries
  if (Array.isArray(sanitized.education)) {
    sanitized.education = sanitized.education.map((edu: any) => ({
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
 * Validates required fields in CV data
 */
export const validateCVData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data) {
    errors.push('CV data is required');
    return { isValid: false, errors };
  }
  
  // Validate personal info
  if (!data.personalInfo?.fullName?.trim()) {
    errors.push('Full name is required');
  }
  
  if (!data.personalInfo?.email?.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(data.personalInfo.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (data.personalInfo?.phone && !validatePhone(data.personalInfo.phone)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (data.personalInfo?.website && !validateUrl(data.personalInfo.website)) {
    errors.push('Please enter a valid website URL');
  }
  
  if (data.personalInfo?.linkedin && !validateUrl(data.personalInfo.linkedin)) {
    errors.push('Please enter a valid LinkedIn URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
/**
 * Utility functions for generating better resume titles
 */

export interface ResumeData {
  personalInfo: {
    fullName: string;
  };
  template: string;
  experience?: Array<{
    title?: string;
    company?: string;
  }>;
}

/**
 * Template display names mapping
 */
const TEMPLATE_NAMES: Record<string, string> = {
  modern: "Modern Blue",
  classic: "Minimal Classic", 
  creative: "Creative Edge",
  executive: "Executive Formal",
  tech: "Tech Developer",
  elegant: "Simple Elegant",
  academic: "Academic",
  bold: "Bold Modern",
  compact: "Compact Pro",
};

/**
 * Generate a smart resume title based on user data
 */
export function generateResumeTitle(data: ResumeData): string {
  const { personalInfo, template, experience } = data;
  const templateName = TEMPLATE_NAMES[template] || template;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  // If user has a name, use it as the primary identifier
  if (personalInfo.fullName?.trim()) {
    const name = personalInfo.fullName.trim();
    
    // If user has experience, try to use their current/latest job title
    if (experience && experience.length > 0) {
      const latestJob = experience[0]; // Assuming experience is ordered by recency
      if (latestJob.title?.trim()) {
        return `${name} - ${latestJob.title} Resume (${templateName})`;
      }
    }
    
    // Fallback to name + template
    return `${name} - ${templateName} Resume`;
  }

  // If no name, create a descriptive title with date
  return `${templateName} Resume - ${currentDate}`;
}

/**
 * Generate a short title for display purposes (e.g., in cards)
 */
export function generateShortResumeTitle(data: ResumeData): string {
  const { personalInfo, template } = data;
  const templateName = TEMPLATE_NAMES[template] || template;

  if (personalInfo.fullName?.trim()) {
    return `${personalInfo.fullName.trim()} Resume`;
  }

  return `${templateName} Resume`;
}

/**
 * Generate a filename-safe title for PDF exports
 */
export function generateFilenameSafeTitle(data: ResumeData): string {
  const title = generateShortResumeTitle(data);
  return title
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .toLowerCase();
}
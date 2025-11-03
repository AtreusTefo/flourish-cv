export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

// Blog posts data with placeholder images instead of external Unsplash URLs
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Create a Professional Resume in 2025",
    excerpt: "Learn the latest tips and tricks for crafting a resume that stands out to employers in today's competitive job market.",
    author: "Sarah Johnson",
    date: "2025-01-15",
    category: "Career Tips",
    image: "/images/blog/professional-resume-tips.jpg",
    content: `
# How to Create a Professional Resume in 2025

In today's competitive job market, your resume is often your first impression with potential employers. With the evolving landscape of recruitment technology and changing employer expectations, it's crucial to stay updated on best practices for resume creation.

## Understanding Modern Resume Requirements

The job market in 2025 demands resumes that are both human-readable and ATS (Applicant Tracking System) friendly. This dual requirement means your resume needs to be visually appealing while also being parseable by automated systems.

### Key Elements of a 2025 Resume

1. **Clear Contact Information**: Include your name, phone number, email, and LinkedIn profile at the top of your resume.

2. **Professional Summary**: A concise 2-3 sentence summary highlighting your key qualifications and career objectives.

3. **Relevant Experience**: Focus on achievements rather than just responsibilities. Use metrics and quantifiable results wherever possible.

4. **Skills Section**: List both technical and soft skills relevant to your target position.

5. **Education**: Include your degrees, certifications, and relevant coursework.

## Formatting Best Practices

- Use a clean, professional font like Arial, Calibri, or Poppins
- Maintain consistent formatting throughout
- Use bullet points for easy scanning
- Keep it to 1-2 pages maximum
- Use white space effectively to improve readability

## Common Mistakes to Avoid

- Including irrelevant personal information
- Using outdated email addresses
- Listing responsibilities instead of achievements
- Typos and grammatical errors
- Using complex graphics that confuse ATS systems

## Final Tips

Your resume should tell a story of your professional journey. Tailor it for each application, highlighting the most relevant experiences and skills. Remember, your resume is a living document that should evolve with your career.
    `
  },
  {
    id: 2,
    title: "Top 10 Resume Templates for Tech Professionals",
    excerpt: "Discover the best resume templates designed specifically for software developers, engineers, and IT specialists.",
    author: "Michael Chen",
    date: "2025-01-12",
    category: "Templates",
    image: "/images/blog/tech-resume-templates.jpg",
    content: `
# Top 10 Resume Templates for Tech Professionals

Finding the right resume template can significantly impact your job search success. For tech professionals, the challenge is balancing technical details with readability and visual appeal.

## What Makes a Great Tech Resume Template?

A strong tech resume template should:
- Clearly showcase your technical skills
- Provide space for projects and portfolios
- Be ATS-friendly
- Look professional and modern
- Allow for easy customization

## Our Top 10 Picks

### 1. The Modern Developer
Clean, minimalist design with a dedicated skills section and project showcase area. Perfect for full-stack developers and software engineers.

### 2. Tech Executive
Sophisticated template designed for senior tech roles, with emphasis on leadership and strategic achievements.

### 3. Creative Edge
Ideal for UI/UX designers and creative technologists who want to showcase their design sensibility.

### 4. Academic Tech
Perfect for researchers and academics in computer science, with space for publications and research projects.

### 5. Compact Pro
Maximum information density while maintaining readability, great for experienced professionals with extensive backgrounds.

### 6. Bold Modern
Eye-catching design that stands out while remaining professional and ATS-compatible.

### 7. Simple Elegant
Timeless design that works across all tech specializations, focusing on content over form.

### 8. Minimal Classic
Traditional layout with modern touches, perfect for conservative industries.

### 9. Tech Startup
Dynamic and modern, ideal for those targeting startup environments.

### 10. Enterprise Professional
Conservative yet polished design suitable for large corporation applications.

## Customization Tips

Remember to customize any template you choose:
- Adjust colors to match your personal brand
- Modify sections to highlight your strengths
- Ensure all fonts and formatting are ATS-compatible
- Test the template by exporting to PDF
    `
  },
  {
    id: 3,
    title: "Common Resume Mistakes to Avoid",
    excerpt: "Don't let these common pitfalls ruin your chances. Learn what hiring managers look for and what turns them away.",
    author: "Emily Rodriguez",
    date: "2025-01-10",
    category: "Best Practices",
    image: "/images/blog/resume-mistakes-guide.jpg",
    content: `
# Common Resume Mistakes to Avoid

Your resume is your ticket to landing interviews. However, even experienced professionals make critical mistakes that can cost them opportunities. Here's what to avoid.

## The Top 10 Resume Mistakes

### 1. Spelling and Grammar Errors
Nothing says "unprofessional" faster than typos. Always proofread multiple times and have someone else review your resume.

### 2. Including Irrelevant Information
Your high school achievements from 15 years ago? Not relevant. Focus on recent, applicable experience.

### 3. Using a Generic Resume
Sending the same resume to every job is a rookie mistake. Tailor your resume for each position.

### 4. Listing Duties Instead of Achievements
"Managed team" vs "Led team of 10 to increase productivity by 30%" - which sounds more impressive?

### 5. Poor Formatting
Inconsistent fonts, spacing, and alignment make your resume hard to read and appear unprofessional.

### 6. Including Personal Information
Age, marital status, photo (in most countries), and other personal details have no place on a modern resume.

### 7. Using Unprofessional Email Addresses
partygirl2000@email.com won't get you the job. Create a professional email address.

### 8. Making It Too Long
Unless you're a senior executive, keep it to 1-2 pages maximum.

### 9. Leaving Employment Gaps Unexplained
Brief explanations for gaps show transparency and prevent questions.

### 10. Not Including Keywords
Many companies use ATS systems that scan for specific keywords from the job description.

## How to Fix These Mistakes

1. Use spell-check and manual proofreading
2. Research the company and position before applying
3. Focus on quantifiable achievements
4. Use a clean, professional template
5. Get feedback from peers or career counselors

## Final Thoughts

Avoiding these common mistakes can significantly improve your chances of landing interviews. Remember, your resume is often your only chance to make a first impression - make it count!
    `
  },
  {
    id: 4,
    title: "Optimizing Your Resume for ATS Systems",
    excerpt: "Master the art of creating ATS-friendly resumes that pass automated screening systems and reach human recruiters.",
    author: "David Kim",
    date: "2025-01-08",
    category: "Career Tips",
    image: "/images/blog/ats-optimization-guide.jpg",
    content: `
# Optimizing Your Resume for ATS Systems

Applicant Tracking Systems (ATS) are used by over 90% of Fortune 500 companies to screen resumes. Understanding how to optimize your resume for these systems is crucial for job search success.

## What is an ATS?

An ATS is software that automatically scans and ranks resumes based on specific criteria before they reach human recruiters. These systems look for keywords, formatting, and other factors to determine if a candidate is a good fit.

## ATS Optimization Strategies

### 1. Use Standard Formatting
- Stick to standard fonts (Arial, Calibri, Times New Roman)
- Use standard section headings (Experience, Education, Skills)
- Avoid tables, text boxes, and complex formatting
- Save as .docx or .pdf (check job posting for preference)

### 2. Include Relevant Keywords
- Mirror language from the job description
- Include both acronyms and full terms (e.g., "SEO" and "Search Engine Optimization")
- Use industry-specific terminology
- Include hard and soft skills mentioned in the posting

### 3. Structure Your Content Properly
- Use bullet points for easy scanning
- Include dates in MM/YYYY format
- List experience in reverse chronological order
- Use standard job titles when possible

### 4. Optimize Each Section
- **Contact Information**: Include phone, email, LinkedIn, and location
- **Professional Summary**: Include 2-3 key skills or achievements
- **Experience**: Focus on achievements with metrics
- **Skills**: Create a dedicated skills section with relevant keywords
- **Education**: Include degree, institution, and graduation year

## Common ATS Pitfalls to Avoid

- Using images or graphics
- Fancy fonts or excessive formatting
- Headers and footers (information may not be read)
- Abbreviations without context
- Typos and grammatical errors

## Testing Your Resume

Before submitting, test your resume by:
1. Converting to plain text to see how it appears
2. Using online ATS scanners
3. Having someone else review for clarity
4. Checking that all important information is preserved

Remember, while ATS optimization is important, your resume still needs to impress human readers once it passes the initial screening.
    `
  },
  {
    id: 5,
    title: "The Psychology of Resume Design",
    excerpt: "Understand how visual elements and layout choices impact hiring decisions and learn to design resumes that make lasting impressions.",
    author: "Dr. Lisa Park",
    date: "2025-01-05",
    category: "Design",
    image: "/images/blog/resume-psychology-design.jpg",
    content: `
# The Psychology of Resume Design

The visual presentation of your resume plays a crucial role in how hiring managers perceive you as a candidate. Understanding the psychology behind design choices can give you a significant advantage.

## First Impressions Matter

Research shows that recruiters spend an average of 6-7 seconds on an initial resume scan. During this brief period, visual elements create immediate impressions about your professionalism, attention to detail, and cultural fit.

## Key Psychological Principles

### 1. The Halo Effect
A well-designed resume creates a positive first impression that influences how all other information is perceived. Clean, professional design suggests competence and reliability.

### 2. Cognitive Load Theory
Too much information or complex layouts overwhelm readers. Simple, organized designs help recruiters process information more effectively.

### 3. Color Psychology
- **Blue**: Trust, stability, professionalism
- **Black/Gray**: Sophistication, formality
- **Green**: Growth, harmony (good for environmental/health sectors)
- **Red**: Energy, urgency (use sparingly)

### 4. White Space Utilization
Strategic use of white space:
- Improves readability
- Creates visual hierarchy
- Suggests organization and clarity
- Prevents overwhelming the reader

## Design Elements That Work

### Typography
- Sans-serif fonts appear modern and clean
- Serif fonts convey tradition and reliability
- Consistent font sizing creates hierarchy
- Bold text draws attention to key information

### Layout Principles
- **Alignment**: Creates order and professionalism
- **Contrast**: Helps important information stand out
- **Repetition**: Builds consistency and unity
- **Proximity**: Groups related information together

### Visual Hierarchy
Guide the reader's eye through:
1. Your name (largest text)
2. Contact information
3. Professional summary
4. Key achievements and experience
5. Supporting details

## Industry Considerations

Different industries have varying design expectations:
- **Creative Fields**: More design freedom, showcase creativity
- **Finance/Law**: Conservative, traditional layouts
- **Tech**: Clean, modern designs with subtle innovation
- **Healthcare**: Professional, trustworthy appearance

## Common Design Mistakes

- Overusing colors or fonts
- Poor alignment and spacing
- Inconsistent formatting
- Cluttered layouts
- Inappropriate graphics or images

## Measuring Design Effectiveness

Your resume design is effective if it:
- Passes the 6-second scan test
- Clearly communicates your value proposition
- Matches industry expectations
- Remains readable when printed or viewed digitally
- Creates a positive emotional response

Remember, great design supports your content—it should never overshadow your qualifications and achievements.
    `
  }
];

// Categories derived from blog posts
export const getCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
};

// Get recent posts (first N posts)
export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

// Filter posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};

// Search posts by title or excerpt
export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter((post) => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery)
  );
};

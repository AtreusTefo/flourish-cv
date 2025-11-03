export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
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
    image: "/placeholder.svg?height=400&width=800&text=Professional+Resume+Tips",
  },
  {
    id: 2,
    title: "Top 10 Resume Templates for Tech Professionals",
    excerpt: "Discover the best resume templates designed specifically for software developers, engineers, and IT specialists.",
    author: "Michael Chen",
    date: "2025-01-12",
    category: "Templates",
    image: "/placeholder.svg?height=400&width=800&text=Tech+Resume+Templates",
  },
  {
    id: 3,
    title: "Common Resume Mistakes to Avoid",
    excerpt: "Don't let these common pitfalls ruin your chances. Learn what hiring managers look for and what turns them away.",
    author: "Emily Rodriguez",
    date: "2025-01-10",
    category: "Best Practices",
    image: "/placeholder.svg?height=400&width=800&text=Resume+Mistakes+Guide",
  },
  {
    id: 4,
    title: "Optimizing Your Resume for ATS Systems",
    excerpt: "Master the art of creating ATS-friendly resumes that pass automated screening systems and reach human recruiters.",
    author: "David Kim",
    date: "2025-01-08",
    category: "Career Tips",
    image: "/placeholder.svg?height=400&width=800&text=ATS+Optimization+Guide",
  },
  {
    id: 5,
    title: "How to Write a Compelling Cover Letter",
    excerpt: "Complement your resume with a powerful cover letter that tells your story and captures the employer's attention.",
    author: "Lisa Thompson",
    date: "2025-01-05",
    category: "Writing Tips",
    image: "/placeholder.svg?height=400&width=800&text=Cover+Letter+Writing",
  },
  {
    id: 6,
    title: "LinkedIn Profile vs Resume: Key Differences",
    excerpt: "Understand how to optimize both your LinkedIn profile and resume for maximum career opportunities.",
    author: "James Wilson",
    date: "2025-01-03",
    category: "Best Practices",
    image: "/placeholder.svg?height=400&width=800&text=LinkedIn+vs+Resume",
  },
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
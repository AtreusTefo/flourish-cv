import { useState } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "How to Create a Professional Resume in 2025",
    excerpt: "Learn the latest tips and tricks for crafting a resume that stands out to employers in today's competitive job market.",
    author: "Sarah Johnson",
    date: "2025-01-15",
    category: "Career Tips",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Top 10 Resume Templates for Tech Professionals",
    excerpt: "Discover the best resume templates designed specifically for software developers, engineers, and IT specialists.",
    author: "Michael Chen",
    date: "2025-01-12",
    category: "Templates",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Common Resume Mistakes to Avoid",
    excerpt: "Don't let these common pitfalls ruin your chances. Learn what hiring managers look for and what turns them away.",
    author: "Emily Rodriguez",
    date: "2025-01-10",
    category: "Best Practices",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Optimizing Your Resume for ATS Systems",
    excerpt: "Master the art of creating ATS-friendly resumes that pass automated screening systems and reach human recruiters.",
    author: "David Kim",
    date: "2025-01-08",
    category: "Career Tips",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "How to Write a Compelling Cover Letter",
    excerpt: "Complement your resume with a powerful cover letter that tells your story and captures the employer's attention.",
    author: "Lisa Thompson",
    date: "2025-01-05",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    title: "LinkedIn Profile vs Resume: Key Differences",
    excerpt: "Understand how to optimize both your LinkedIn profile and resume for maximum career opportunities.",
    author: "James Wilson",
    date: "2025-01-03",
    category: "Best Practices",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
  },
];

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  return (
    <>
      <Helmet>
        <title>Blog - CVCraft | Resume Writing Tips & Career Advice</title>
        <meta 
          name="description" 
          content="Get expert resume writing tips, career advice, and professional development insights from CVCraft. Learn how to create standout resumes and advance your career." 
        />
        <meta name="keywords" content="resume tips, career advice, job search, professional development, CV writing" />
        <meta property="og:title" content="CVCraft Blog - Resume & Career Tips" />
        <meta property="og:description" content="Expert advice on resume writing, career development, and job search strategies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://cvcraft.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Header Section */}
        <header className="bg-gradient-hero border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Career & Resume Insights
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Expert tips, guides, and best practices to help you create outstanding resumes and advance your career.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Blog Posts */}
            <section className="lg:col-span-8" aria-label="Blog posts">
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {currentPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 md:mt-12">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          
                          {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                              return <PaginationEllipsis key={page} />;
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found matching your criteria.</p>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="lg:col-span-4" aria-label="Blog sidebar">
              <BlogSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                recentPosts={blogPosts.slice(0, 3)}
              />
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-secondary border-t mt-16">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">CVCraft</h3>
                <p className="text-sm text-muted-foreground">
                  Professional resume builder helping you create standout CVs and advance your career.
                </p>
              </div>
              
              <nav className="md:pl-8" aria-label="Footer navigation">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/templates" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a href="/builder" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Resume Builder
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </nav>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CVCraft. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Blog;
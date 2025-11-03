import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - CVCraft Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, resume, CV, career advice`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        <link rel="canonical" href={`https://cvcraft.com/blog/${post.id}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Content */}
        <main className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-10">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>

              <Badge className="mb-4">{post.category}</Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 mb-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-foreground mt-6 mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-foreground mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-foreground">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-foreground">{children}</em>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <Button variant="outline" asChild>
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Posts
                </Link>
              </Button>
              <Button asChild>
                <Link to="/builder">
                  Build Your Resume
                </Link>
              </Button>
            </div>
          </article>
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
                    <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/templates" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link to="/builder" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Resume Builder
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Blog
                    </Link>
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

export default BlogPost;

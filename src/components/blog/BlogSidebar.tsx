import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Twitter, Linkedin, Github, Facebook } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  date: string;
}

interface BlogSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  recentPosts: BlogPost[];
}

const BlogSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  recentPosts,
}: BlogSidebarProps) => {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search blog posts"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onCategoryChange(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <a
                  href={`/blog/${post.id}`}
                  className="group block"
                >
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <time className="text-xs text-muted-foreground" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              asChild
              aria-label="Follow us on Twitter"
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              aria-label="Follow us on LinkedIn"
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              aria-label="Follow us on GitHub"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              aria-label="Follow us on Facebook"
            >
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
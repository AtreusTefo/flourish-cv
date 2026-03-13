import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { logger } from "@/utils/logger";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        logger.warn(`Invalid date string provided: ${dateString}`, { component: 'BlogCard', action: 'formatDate' });
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      logger.error('Error formatting date', error, { component: 'BlogCard', action: 'formatDate', dateString });
      return 'Invalid Date';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {post.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl md:text-2xl line-clamp-2 hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" aria-hidden="true" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="text-sm md:text-base line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={`/blog/${post.id}`}>
            Read More
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "CVCraft - Professional Resume Builder | Create ATS-Friendly Resumes",
  description = "Create professional, ATS-friendly resumes in minutes with AI-powered suggestions. Choose from beautiful templates, get real-time previews, and download as PDF. Free resume builder with modern templates.",
  keywords = "resume builder, CV maker, ATS-friendly resume, professional resume templates, free resume builder, PDF resume, job application, career tools, resume templates, online resume builder",
  canonical,
  ogImage = "https://cvcraft.app/og-image.png",
  ogType = "website",
  noIndex = false
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    
    if (canonical) {
      updateMetaTag('og:url', canonical, true);
    }

    // Update Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Cleanup function to restore default values when component unmounts
    return () => {
      // Only restore if this component set custom values
      if (title !== "CVCraft - Professional Resume Builder | Create ATS-Friendly Resumes") {
        document.title = "CVCraft - Professional Resume Builder | Create ATS-Friendly Resumes";
      }
    };
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex]);

  return null; // This component doesn't render anything
};

export default SEOHead;
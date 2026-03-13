import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";

interface NavigationProps {
  showDashboardLink?: boolean;
  variant?: "default" | "minimal";
}

const Navigation = ({ 
  showDashboardLink = true,
  variant = "default" 
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Handle keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;

      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const firstFocusableElement = mobileMenuRef.current.querySelector(
        'a, button, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusableElement?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
            aria-label="Go to homepage"
          >
            <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold text-foreground">CVCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {variant === "default" && (
              <>
                <a 
                  href="#features" 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('features');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
                <Link
                  to="/templates"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Templates
                </Link>
                <Link
                  to="/blog"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                <a 
                  href="#how-it-works" 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('how-it-works');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How It Works
                </a>
              </>
            )}
            
            <div className="flex items-center gap-2">
              {showDashboardLink && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              )}
              <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
                <Link to="/builder">Build Resume</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden mt-4 pb-4 border-t pt-4" 
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-3" role="none">
              {variant === "default" && (
                <>
                  <a 
                    href="#features" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('features');
                      element?.scrollIntoView({ behavior: 'smooth' });
                      closeMobileMenu();
                    }}
                  >
                    Features
                  </a>
                  <Link
                    to="/templates"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                    onClick={closeMobileMenu}
                  >
                    Templates
                  </Link>
                  <Link
                    to="/blog"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                  <a 
                    href="#how-it-works" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('how-it-works');
                      element?.scrollIntoView({ behavior: 'smooth' });
                      closeMobileMenu();
                    }}
                  >
                    How It Works
                  </a>
                </>
              )}

              {showDashboardLink && (
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
                </Button>
              )}
              <Button size="sm" className="bg-gradient-primary hover:opacity-90 justify-start" asChild>
                <Link to="/builder" onClick={closeMobileMenu}>Build Resume</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
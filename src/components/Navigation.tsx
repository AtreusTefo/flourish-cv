import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, User, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavigationProps {
  showAuthButtons?: boolean;
  showDashboardLink?: boolean;
  variant?: "default" | "minimal";
}

const Navigation = ({ 
  showAuthButtons = true, 
  showDashboardLink = true,
  variant = "default" 
}: NavigationProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavigation("/")}
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigation("/");
              }
            }}
          >
            <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold text-foreground">CVCraft</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {variant === "default" && (
              <>
                <a 
                  href="#features" 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
                <button
                  onClick={() => handleNavigation("/templates")}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Templates
                </button>
                <button
                  onClick={() => handleNavigation("/blog")}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Blog
                </button>
                <a 
                  href="#how-it-works" 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </a>
              </>
            )}
            
            {user && showDashboardLink ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleNavigation("/profile")}
                >
                  Profile
                </Button>
              </div>
            ) : showAuthButtons ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleNavigation("/auth")}
              >
                Sign In
              </Button>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <button
                    onClick={() => handleNavigation("/templates")}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                  >
                    Templates
                  </button>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                  >
                    Blog
                  </button>
                  <a 
                    href="#how-it-works" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                </>
              )}
              
              {user && showDashboardLink ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleNavigation("/dashboard")}
                    className="justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleNavigation("/profile")}
                    className="justify-start"
                  >
                    Profile
                  </Button>
                </>
              ) : showAuthButtons ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleNavigation("/auth")}
                  className="justify-start"
                >
                  Sign In
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
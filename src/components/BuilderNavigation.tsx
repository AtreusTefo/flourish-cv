import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Save, FolderOpen, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface BuilderNavigationProps {
  onSave?: () => void;
  isSaving?: boolean;
  onLogout?: () => void;
}

const BuilderNavigation = ({ 
  onSave, 
  isSaving = false, 
  onLogout 
}: BuilderNavigationProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      await logout();
      navigate("/");
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CVCraft Builder</span>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                {/* Save Button - Desktop */}
                {onSave && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={onSave}
                    disabled={isSaving}
                    className="hidden sm:inline-flex bg-gradient-primary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Resume"}
                  </Button>
                )}
                
                {/* Save Button - Mobile */}
                {onSave && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onSave}
                    disabled={isSaving}
                    className="sm:hidden"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                )}
                
                {/* My Resumes - Desktop only */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/dashboard")} 
                  className="hidden md:inline-flex"
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  My Resumes
                </Button>
                
                {/* Profile - Desktop only */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/profile")} 
                  className="hidden lg:inline-flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                
                {/* Home */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/")} 
                  className="hidden sm:inline-flex"
                >
                  Home
                </Button>
                
                {/* Logout */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                {/* Home */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/")} 
                  className="hidden sm:inline-flex"
                >
                  Home
                </Button>
                
                {/* Sign In */}
                <Button 
                  size="sm" 
                  className="bg-gradient-primary text-xs sm:text-sm" 
                  onClick={() => navigate("/auth")}
                >
                  <span className="hidden sm:inline">Sign In to Save</span>
                  <span className="sm:hidden">Sign In</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuilderNavigation;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface BuilderNavigationProps {
  onSave?: () => void;
  isSaving?: boolean;
}

const BuilderNavigation = ({ 
  onSave, 
  isSaving = false, 
}: BuilderNavigationProps) => {
  const navigate = useNavigate();

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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/")} 
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuilderNavigation;
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

interface BuilderNavigationProps {
  onSave?: () => void;
  isSaving?: boolean;
}

const BuilderNavigation = ({ 
  onSave, 
  isSaving = false, 
}: BuilderNavigationProps) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CVCraft Builder</span>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuilderNavigation;
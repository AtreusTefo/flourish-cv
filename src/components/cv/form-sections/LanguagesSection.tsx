import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CVData } from "@/types/cv";

interface LanguagesSectionProps {
  languages: CVData["languages"];
  addLanguage: () => void;
  updateLanguage: (id: string, field: string, value: string) => void;
  removeLanguage: (id: string) => void;
}

const LanguagesSection = ({ languages, addLanguage, updateLanguage, removeLanguage }: LanguagesSectionProps) => {
  return (
    <>
      {(languages || []).map((lang, index) => (
        <div key={lang.id} className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3 relative">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm sm:text-base">Language {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLanguage(lang.id)}
              className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Input
              placeholder="e.g., Spanish"
              value={lang.language}
              onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="e.g., Fluent, Intermediate"
              value={lang.proficiency}
              onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
      ))}
      <Button onClick={addLanguage} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </Button>
    </>
  );
};

export default LanguagesSection;

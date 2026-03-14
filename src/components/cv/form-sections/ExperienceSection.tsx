import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { CVData } from "@/types/cv";

interface ExperienceSectionProps {
  experience: CVData["experience"];
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | boolean) => void;
  removeExperience: (id: string) => void;
}

const ExperienceSection = ({ experience, addExperience, updateExperience, removeExperience }: ExperienceSectionProps) => {
  return (
    <>
      {experience.map((exp, index) => (
        <div key={exp.id} className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3 relative">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm sm:text-base">Experience {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Input
              placeholder="Job Title"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="Location"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
              className="text-sm"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor={`current-${exp.id}`} className="text-xs sm:text-sm">
                Current Position
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Input
              type="date"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
              className="text-sm"
            />
            <Input
              type="date"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
              disabled={exp.current}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
            <Label htmlFor={`exp-description-${exp.id}`} className="text-xs sm:text-sm">Description</Label>
            <Button variant="outline" size="sm" className="w-fit">
              <Sparkles className="h-3 w-3 mr-1" />
              <span className="text-xs">Suggest</span>
            </Button>
          </div>
          <Textarea
            id={`exp-description-${exp.id}`}
            placeholder="Describe your responsibilities and achievements..."
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
      ))}
      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </>
  );
};

export default ExperienceSection;

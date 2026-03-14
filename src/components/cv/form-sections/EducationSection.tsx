import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CVData } from "@/types/cv";

interface EducationSectionProps {
  education: CVData["education"];
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
}

const EducationSection = ({ education, addEducation, updateEducation, removeEducation }: EducationSectionProps) => {
  return (
    <>
      {education.map((edu, index) => (
        <div key={edu.id} className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3 relative">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm sm:text-base">Education {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="Location"
              value={edu.location}
              onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
              className="text-sm"
            />
            <Input
              type="date"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
              className="text-sm"
            />
            <Input
              type="date"
              placeholder="Graduation Date"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
              className="text-sm"
            />
          </div>
          <Input
            placeholder="GPA (Optional)"
            value={edu.gpa}
            onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
            className="text-sm"
          />
          <Textarea
            id={`edu-description-${edu.id}`}
            placeholder="Describe your studies, achievements, or relevant coursework..."
            value={edu.description}
            onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
            rows={2}
            className="text-sm"
          />
        </div>
      ))}
      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </>
  );
};

export default EducationSection;

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
  addSkill: () => void;
  updateSkill: (index: number, value: string) => void;
  removeSkill: (index: number) => void;
}

const SkillsSection = ({ skills, addSkill, updateSkill, removeSkill }: SkillsSectionProps) => {
  return (
    <fieldset>
      <legend className="sr-only">Skills</legend>
      <div className="space-y-1.5 sm:space-y-2">
        <Label className="text-sm font-medium">Skills</Label>
        <p className="text-xs text-muted-foreground">
          Add your technical and professional skills
        </p>
      </div>
      {skills.map((skill, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            placeholder="e.g., JavaScript, Project Management, Adobe Photoshop"
            value={skill}
            onChange={(e) => updateSkill(index, e.target.value)}
            className="text-sm flex-1"
          />
          <Button
            onClick={() => removeSkill(index)}
            variant="outline"
            size="sm"
            className="px-2"
            aria-label={`Remove skill ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={addSkill} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </Button>
    </fieldset>
  );
};

export default SkillsSection;

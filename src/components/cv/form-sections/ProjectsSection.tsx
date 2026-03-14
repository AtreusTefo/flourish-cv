import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CVData } from "@/types/cv";

interface ProjectsSectionProps {
  projects: CVData["projects"];
  addProject: () => void;
  updateProject: (id: string, field: string, value: string) => void;
  removeProject: (id: string) => void;
}

const ProjectsSection = ({ projects, addProject, updateProject, removeProject }: ProjectsSectionProps) => {
  return (
    <>
      {(projects || []).map((proj, index) => (
        <div key={proj.id} className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3 relative">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm sm:text-base">Project {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(proj.id)}
              className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <Input
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => updateProject(proj.id, "name", e.target.value)}
            className="text-sm"
          />
          <Input
            placeholder="Project URL (Optional)"
            value={proj.url || ""}
            onChange={(e) => updateProject(proj.id, "url", e.target.value)}
            className="text-sm"
          />
          <Textarea
            placeholder="Describe the project, technologies used, and your contributions..."
            value={proj.description}
            onChange={(e) => updateProject(proj.id, "description", e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
      ))}
      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </>
  );
};

export default ProjectsSection;

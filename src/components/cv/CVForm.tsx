import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { CVData } from "@/pages/Builder";

interface CVFormProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

const CVForm = ({ cvData, setCVData }: CVFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    setCVData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          id: Date.now().toString(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    setCVData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: Date.now().toString(),
          degree: "",
          institution: "",
          location: "",
          graduationDate: "",
          gpa: "",
        },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Build Your Resume</h2>
        <p className="text-muted-foreground text-sm">
          Fill in your information to create a professional resume
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={cvData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={cvData.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={cvData.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input
              id="website"
              value={cvData.personalInfo.website}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary">Professional Summary</Label>
              <Button variant="outline" size="sm">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Suggest
              </Button>
            </div>
            <Textarea
              id="summary"
              value={cvData.summary}
              onChange={(e) => setCVData({ ...cvData, summary: e.target.value })}
              placeholder="Write a brief summary highlighting your key skills and experience..."
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              2-3 sentences about your professional background and goals
            </p>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 mt-4">
          {cvData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-3 relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Experience {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                />
                <Input
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  disabled={exp.current}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="summary">Description</Label>
                <Button variant="outline" size="sm">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Suggest
                </Button>
              </div>
              <Textarea
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                rows={3}
              />
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          {cvData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-3 relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Education {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input
                placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
              />
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
              />
              <Input
                placeholder="Graduation Date"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
              />
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVForm;

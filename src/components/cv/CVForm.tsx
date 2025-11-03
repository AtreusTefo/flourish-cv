import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Trash2, AlertCircle } from "lucide-react";
import { CVData } from "@/pages/Builder";
import { sanitizeText, sanitizeHtml, validateEmail, validatePhone, validateUrl } from "@/utils/sanitize";
import { useState, useEffect } from "react";

interface CVFormProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

const CVForm = ({ cvData, setCVData }: CVFormProps) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateAndUpdatePersonalInfo = (field: string, value: string) => {
    const sanitizedValue = sanitizeText(value);
    const newErrors = { ...errors };
    
    // Validate specific fields
    switch (field) {
      case 'email':
        if (sanitizedValue && !validateEmail(sanitizedValue)) {
          newErrors[field] = 'Please enter a valid email address';
        } else {
          delete newErrors[field];
        }
        break;
      case 'phone':
        if (sanitizedValue && !validatePhone(sanitizedValue)) {
          newErrors[field] = 'Please enter a valid phone number';
        } else {
          delete newErrors[field];
        }
        break;
      case 'website':
      case 'linkedin':
        if (sanitizedValue && !validateUrl(sanitizedValue)) {
          newErrors[field] = 'Please enter a valid URL';
        } else {
          delete newErrors[field];
        }
        break;
      case 'fullName':
        if (!sanitizedValue.trim()) {
          newErrors[field] = 'Full name is required';
        } else {
          delete newErrors[field];
        }
        break;
      default:
        delete newErrors[field];
    }
    
    setErrors(newErrors);
    
    setCVData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [field]: sanitizedValue },
    });
  };

  const updatePersonalInfo = (field: string, value: string) => {
    validateAndUpdatePersonalInfo(field, value);
  };

  const updateSummary = (value: string) => {
    const sanitizedValue = sanitizeHtml(value);
    setCVData({
      ...cvData,
      summary: sanitizedValue,
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
    let sanitizedValue = value;
    
    if (typeof value === 'string') {
      sanitizedValue = field === 'description' ? sanitizeHtml(value) : sanitizeText(value);
    }
    
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: sanitizedValue } : exp
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
    const sanitizedValue = sanitizeText(value);
    
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: sanitizedValue } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill = "";
    setCVData({
      ...cvData,
      skills: [...cvData.skills, newSkill],
    });
  };

  const updateSkill = (index: number, value: string) => {
    const sanitizedValue = sanitizeText(value);
    const updatedSkills = [...cvData.skills];
    updatedSkills[index] = sanitizedValue;
    setCVData({
      ...cvData,
      skills: updatedSkills,
    });
  };

  const removeSkill = (index: number) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Build Your Resume</h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Fill in your information to create a professional resume
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto" role="tablist" aria-label="Resume sections">
          <TabsTrigger value="personal" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="personal-panel">Personal</TabsTrigger>
          <TabsTrigger value="summary" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="summary-panel">Summary</TabsTrigger>
          <TabsTrigger value="experience" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="experience-panel">Experience</TabsTrigger>
          <TabsTrigger value="education" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="education-panel">Education</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="skills-panel">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="personal-panel" aria-labelledby="personal-tab">
          <fieldset>
            <legend className="sr-only">Personal Information</legend>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="fullName" className="text-sm">Full Name *</Label>
            <Input
              id="fullName"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              placeholder="John Doe"
              className={errors.fullName ? "border-red-500" : ""}
              required
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <div id="fullName-error" className="flex items-center gap-1 text-sm text-red-600" role="alert">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                <span>{errors.fullName}</span>
              </div>
            )}
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-sm">Email *</Label>
            <Input
              id="email"
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="john@example.com"
              className={errors.email ? "border-red-500" : ""}
              required
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <div id="email-error" className="flex items-center gap-1 text-sm text-red-600" role="alert">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="phone" className="text-sm">Phone</Label>
            <Input
              id="phone"
              value={cvData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="location" className="text-sm">Location</Label>
            <Input
              id="location"
              value={cvData.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="linkedin" className="text-sm">LinkedIn</Label>
            <Input
              id="linkedin"
              value={cvData.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className={errors.linkedin ? "border-red-500" : ""}
            />
            {errors.linkedin && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.linkedin}</span>
              </div>
            )}
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="website" className="text-sm">Website/Portfolio</Label>
            <Input
              id="website"
              value={cvData.personalInfo.website}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
              placeholder="johndoe.com"
              className={errors.website ? "border-red-500" : ""}
            />
            {errors.website && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.website}</span>
              </div>
            )}
          </div>
          </fieldset>
        </TabsContent>

        <TabsContent value="summary" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="summary-panel" aria-labelledby="summary-tab">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Label htmlFor="summary" className="text-sm">Professional Summary</Label>
              <Button variant="outline" size="sm" className="w-fit">
                <Sparkles className="h-3 w-3 mr-1" />
                <span className="text-xs">AI Suggest</span>
              </Button>
            </div>
            <Textarea
              id="summary"
              value={cvData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder="Write a brief summary highlighting your key skills and experience..."
              rows={4}
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground">
              2-3 sentences about your professional background and goals
            </p>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {cvData.experience.map((exp, index) => (
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
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
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
                <Label htmlFor="summary" className="text-xs sm:text-sm">Description</Label>
                <Button variant="outline" size="sm" className="w-fit">
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span className="text-xs">Suggest</span>
                </Button>
              </div>
              <Textarea
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
        </TabsContent>

        <TabsContent value="education" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {cvData.education.map((edu, index) => (
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
                  placeholder="Graduation Date"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                  className="text-sm"
                />
              </div>
              <Input
                placeholder="GPA (Optional)"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                className="text-sm"
              />
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>

        <TabsContent value="skills" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="skills-panel" aria-labelledby="skills-tab">
          <fieldset>
            <legend className="sr-only">Skills</legend>
            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-sm font-medium">Skills</Label>
              <p className="text-xs text-muted-foreground">
                Add your technical and professional skills
              </p>
            </div>
          </fieldset>
          
          {cvData.skills.map((skill, index) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVForm;

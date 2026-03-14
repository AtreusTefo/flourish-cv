import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CVData } from "@/types/cv";
import PersonalInfoSection from "./form-sections/PersonalInfoSection";
import SummarySection from "./form-sections/SummarySection";
import ExperienceSection from "./form-sections/ExperienceSection";
import EducationSection from "./form-sections/EducationSection";
import SkillsSection from "./form-sections/SkillsSection";
import ProjectsSection from "./form-sections/ProjectsSection";
import LanguagesSection from "./form-sections/LanguagesSection";
import InterestsSection from "./form-sections/InterestsSection";
import { useCVFormHandlers } from "./useCVFormHandlers";

interface CVFormProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

const CVForm = ({ cvData, setCVData }: CVFormProps) => {
  const {
    errors,
    updatePersonalInfo,
    updateSummary,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addProject, updateProject, removeProject,
    addLanguage, updateLanguage, removeLanguage,
    addInterest, updateInterest, removeInterest,
    addSkill, updateSkill, removeSkill,
  } = useCVFormHandlers(cvData, setCVData);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Build Your Resume</h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Fill in your information to create a professional resume
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 h-auto" role="tablist" aria-label="Resume sections">
          <TabsTrigger value="personal" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="personal-panel">Personal</TabsTrigger>
          <TabsTrigger value="summary" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="summary-panel">Summary</TabsTrigger>
          <TabsTrigger value="experience" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="experience-panel">Experience</TabsTrigger>
          <TabsTrigger value="education" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="education-panel">Education</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="skills-panel">Skills</TabsTrigger>
          <TabsTrigger value="projects" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="projects-panel">Projects</TabsTrigger>
          <TabsTrigger value="languages" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="languages-panel">Languages</TabsTrigger>
          <TabsTrigger value="interests" className="text-xs sm:text-sm px-2 sm:px-3 py-2" role="tab" aria-controls="interests-panel">Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="personal-panel" aria-labelledby="personal-tab">
          <PersonalInfoSection personalInfo={cvData.personalInfo} errors={errors} updatePersonalInfo={updatePersonalInfo} />
        </TabsContent>

        <TabsContent value="summary" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="summary-panel" aria-labelledby="summary-tab">
          <SummarySection summary={cvData.summary} updateSummary={updateSummary} />
        </TabsContent>

        <TabsContent value="experience" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <ExperienceSection experience={cvData.experience} addExperience={addExperience} updateExperience={updateExperience} removeExperience={removeExperience} />
        </TabsContent>

        <TabsContent value="education" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <EducationSection education={cvData.education} addEducation={addEducation} updateEducation={updateEducation} removeEducation={removeEducation} />
        </TabsContent>

        <TabsContent value="skills" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="skills-panel" aria-labelledby="skills-tab">
          <SkillsSection skills={cvData.skills} addSkill={addSkill} updateSkill={updateSkill} removeSkill={removeSkill} />
        </TabsContent>

        <TabsContent value="projects" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="projects-panel" aria-labelledby="projects-tab">
          <ProjectsSection projects={cvData.projects} addProject={addProject} updateProject={updateProject} removeProject={removeProject} />
        </TabsContent>

        <TabsContent value="languages" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="languages-panel" aria-labelledby="languages-tab">
          <LanguagesSection languages={cvData.languages} addLanguage={addLanguage} updateLanguage={updateLanguage} removeLanguage={removeLanguage} />
        </TabsContent>

        <TabsContent value="interests" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4" role="tabpanel" id="interests-panel" aria-labelledby="interests-tab">
          <InterestsSection interests={cvData.interests ?? []} addInterest={addInterest} updateInterest={updateInterest} removeInterest={removeInterest} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVForm;

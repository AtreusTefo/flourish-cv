import { useState } from "react";
import { CVData } from "@/types/cv";
import { sanitizeHtml } from "@/utils/sanitize";
import { personalInfoSchema } from "@/validation/cvSchema";

export const useCVFormHandlers = (cvData: CVData, setCVData: (data: CVData) => void) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updatePersonalInfo = (field: string, value: string) => {
    const newErrors = { ...errors };

    // Validate the individual field using the centralised Zod schema
    const fieldKey = field as keyof typeof personalInfoSchema.shape;
    if (fieldKey in personalInfoSchema.shape) {
      const result = personalInfoSchema.shape[fieldKey].safeParse(value);
      if (!result.success) {
        newErrors[field] = result.error.errors[0].message;
      } else {
        delete newErrors[field];
      }
    } else {
      delete newErrors[field];
    }

    setErrors(newErrors);
    setCVData({ ...cvData, personalInfo: { ...cvData.personalInfo, [field]: value } });
  };

  const updateSummary = (value: string) => {
    setCVData({ ...cvData, summary: sanitizeHtml(value) });
  };

  const addExperience = () => {
    setCVData({
      ...cvData,
      experience: [...cvData.experience, { id: Date.now().toString(), position: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" }],
    });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    const processedValue = typeof value === "string" && field === "description" ? sanitizeHtml(value) : value;
    setCVData({ ...cvData, experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: processedValue } : exp)) });
  };

  const removeExperience = (id: string) => {
    setCVData({ ...cvData, experience: cvData.experience.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    setCVData({
      ...cvData,
      education: [...cvData.education, { id: Date.now().toString(), degree: "", institution: "", location: "", startDate: "", endDate: "", current: false, description: "", gpa: "" }],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCVData({ ...cvData, education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)) });
  };

  const removeEducation = (id: string) => {
    setCVData({ ...cvData, education: cvData.education.filter((edu) => edu.id !== id) });
  };

  const addProject = () => {
    setCVData({ ...cvData, projects: [...(cvData.projects || []), { id: Date.now().toString(), name: "", description: "", url: "" }] });
  };

  const updateProject = (id: string, field: string, value: string) => {
    const processedValue = field === "description" ? sanitizeHtml(value) : value;
    setCVData({ ...cvData, projects: (cvData.projects || []).map((proj) => (proj.id === id ? { ...proj, [field]: processedValue } : proj)) });
  };

  const removeProject = (id: string) => {
    setCVData({ ...cvData, projects: (cvData.projects || []).filter((proj) => proj.id !== id) });
  };

  const addLanguage = () => {
    setCVData({ ...cvData, languages: [...(cvData.languages || []), { id: Date.now().toString(), language: "", proficiency: "" }] });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setCVData({ ...cvData, languages: (cvData.languages || []).map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)) });
  };

  const removeLanguage = (id: string) => {
    setCVData({ ...cvData, languages: (cvData.languages || []).filter((lang) => lang.id !== id) });
  };

  const addInterest = () => {
    setCVData({ ...cvData, interests: [...(cvData.interests || []), ""] });
  };

  const updateInterest = (index: number, value: string) => {
    const updated = [...(cvData.interests || [])];
    updated[index] = value;
    setCVData({ ...cvData, interests: updated });
  };

  const removeInterest = (index: number) => {
    setCVData({ ...cvData, interests: (cvData.interests || []).filter((_, i) => i !== index) });
  };

  const addSkill = () => {
    setCVData({ ...cvData, skills: [...cvData.skills, ""] });
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...cvData.skills];
    updated[index] = value;
    setCVData({ ...cvData, skills: updated });
  };

  const removeSkill = (index: number) => {
    setCVData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== index) });
  };

  return {
    errors,
    updatePersonalInfo,
    updateSummary,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addProject, updateProject, removeProject,
    addLanguage, updateLanguage, removeLanguage,
    addInterest, updateInterest, removeInterest,
    addSkill, updateSkill, removeSkill,
  };
};

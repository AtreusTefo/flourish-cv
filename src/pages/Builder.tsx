import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";
import BuilderNavigation from "@/components/BuilderNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa: string;
  }>;
  skills: string[];
  template: "modern" | "classic" | "minimal";
}

const Builder = () => {
  const { user, loading: authLoading } = useAuth();
  const { createResume, updateResume, loading: resumeLoading } = useResumes();
  const navigate = useNavigate();
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    template: "modern",
  });

  const handleSaveResume = async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      return;
    }

    try {
      const resumeData = {
        title: cvData.personalInfo.fullName || "Untitled Resume",
        cv_data: cvData as any,
        template: cvData.template,
      };

      // Mock save functionality - simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentResumeId) {
        // Mock update
        toast.success("Resume updated successfully!");
      } else {
        // Mock create - generate a fake ID
        const mockId = `mock-${Date.now()}`;
        setCurrentResumeId(mockId);
        toast.success("Resume saved successfully!");
      }
      
      // Store in localStorage as a backup
      localStorage.setItem('cv-data', JSON.stringify(resumeData));
      
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cv-bg-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BuilderNavigation onSave={handleSaveResume} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-120px)]">
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-none">
            <CVForm cvData={cvData} setCVData={setCVData} />
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-none">
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;

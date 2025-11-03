import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";
import BuilderNavigation from "@/components/BuilderNavigation";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { ResumeService } from "@/services/resumeService";

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
  template: "modern" | "classic" | "creative" | "executive" | "tech" | "elegant" | "academic" | "bold" | "compact";
}

const Builder = () => {
  const { user, loading: authLoading } = useAuth();
  const { createResume, updateResume, loading: resumeLoading } = useResumes();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  
  // Get template from URL parameters, default to "modern"
  const templateFromUrl = searchParams.get('template') as "modern" | "classic" | "creative" | "executive" | "tech" | "elegant" | "academic" | "bold" | "compact" | null;
  const initialTemplate = templateFromUrl || "modern";
  
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
    template: initialTemplate,
  });

  // Load existing resume data on component mount
  useEffect(() => {
    const loadResumeData = async () => {
      if (!user) return;

      try {
        // Check if there's a resume ID in localStorage
        const savedResumeId = localStorage.getItem('current-resume-id');
        
        if (savedResumeId && savedResumeId !== 'null' && !savedResumeId.startsWith('mock-')) {
          // Try to load the resume from the database
          const resume = await ResumeService.getResume(savedResumeId);
          
          if (resume) {
            setCurrentResumeId(resume.id);
            // Safely cast cv_data to CVData with validation
            if (resume.cv_data && typeof resume.cv_data === 'object' && !Array.isArray(resume.cv_data)) {
              setCVData(resume.cv_data as unknown as CVData);
            } else {
              console.warn('Invalid cv_data format, falling back to localStorage');
            }
            return;
          }
        }

        // Fallback to localStorage data if no database resume found
        const savedData = localStorage.getItem('cv-data');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.cv_data) {
              setCVData(parsedData.cv_data as CVData);
            }
          } catch (error) {
            console.error('Error parsing saved CV data:', error);
          }
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
        // Fallback to localStorage if database fails
        const savedData = localStorage.getItem('cv-data');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.cv_data) {
              setCVData(parsedData.cv_data as CVData);
            }
          } catch (error) {
            console.error('Error parsing saved CV data:', error);
          }
        }
      }
    };

    if (user && !authLoading) {
      loadResumeData();
    }
  }, [user, authLoading]);

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

      if (currentResumeId) {
        // Update existing resume
        const updatedResume = await ResumeService.updateResume(currentResumeId, resumeData);
        toast.success("Resume updated successfully!");
        
        // Store in localStorage as a backup
        localStorage.setItem('cv-data', JSON.stringify(resumeData));
        localStorage.setItem('current-resume-id', updatedResume.id);
      } else {
        // Create new resume
        const newResume = await ResumeService.createResume(resumeData);
        setCurrentResumeId(newResume.id);
        toast.success("Resume saved successfully!");
        
        // Store in localStorage as a backup
        localStorage.setItem('cv-data', JSON.stringify(resumeData));
        localStorage.setItem('current-resume-id', newResume.id);
      }
      
    } catch (error) {
      console.error("Error saving resume:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save resume";
      toast.error(errorMessage);
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
      <SEOHead
        title="Resume Builder - Create Professional CV | CVCraft"
        description="Build your professional resume with our intuitive drag-and-drop builder. Real-time preview, ATS-friendly templates, and instant PDF download. Start creating your perfect CV now."
        keywords="resume builder, CV builder, create resume, professional resume, ATS resume, resume maker, job application, career builder"
        canonical="https://cvcraft.app/builder"
        ogType="website"
      />
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

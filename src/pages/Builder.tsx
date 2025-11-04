import { useState, useEffect, useCallback } from "react";
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
import { logger } from "@/utils/logger";
import { generateResumeTitle } from "@/utils/resumeTitleGenerator";
import { CVData } from "@/types/cv";

const Builder = () => {
  const { user, loading: authLoading } = useAuth();
  const { createResume, updateResume, loading: resumeLoading } = useResumes();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  
  // Auto-save state management
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Get template from URL parameters, default to "modern"
  const templateFromUrl = searchParams.get('template') as "modern" | "classic" | "creative" | "executive" | "tech" | "elegant" | "academic" | "bold" | "compact" | null;
  const initialTemplate = templateFromUrl || "modern";
  
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
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
      if (user) {
        // For authenticated users: Use database as single source of truth
        try {
          const savedResumeId = localStorage.getItem('current-resume-id');
          
          if (savedResumeId && savedResumeId !== 'null' && !savedResumeId.startsWith('mock-')) {
            const resume = await ResumeService.getResume(savedResumeId);
            
            if (resume && resume.cv_data && typeof resume.cv_data === 'object' && !Array.isArray(resume.cv_data)) {
              setCurrentResumeId(resume.id);
              setCVData(resume.cv_data as unknown as CVData);
              return; // Successfully loaded from database
            }
          }
          
          // If no saved resume ID or resume not found, user starts with empty form
          toast.info("Starting with a new resume. Your data will be saved to your account when you save.");
          
        } catch (error) {
          logger.error('Error loading resume from database', error, { component: 'Builder', action: 'loadResumeData' });
          toast.error("Failed to load your resume from the database. Please try refreshing the page.");
        }
      } else {
        // For guest users: Use localStorage ONLY with clear messaging
        try {
          const savedData = localStorage.getItem('cv-data');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (parsedData.cv_data) {
              setCVData(parsedData.cv_data as CVData);
              toast.info("Loaded your draft from local storage. Sign in to save permanently.");
              return;
            }
          }
          
          // No saved data for guest user
          toast.info("Welcome! Your changes will be saved locally. Sign in to save permanently to your account.");
          
        } catch (error) {
          logger.error('Error parsing saved CV data', error, { component: 'Builder', action: 'loadResumeData' });
          toast.error("Failed to load your local draft. Starting with a fresh resume.");
        }
      }
    };

    loadResumeData();
  }, [user]);

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (!user) {
      // For guest users, save to localStorage
      try {
        const title = generateResumeTitle({
          personalInfo: cvData.personalInfo,
          template: cvData.template,
          experience: cvData.experience,
        });
        
        const resumeData = {
          title,
          cv_data: cvData,
          template: cvData.template,
        };
        localStorage.setItem('cv-data', JSON.stringify(resumeData));
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2000);
      } catch (error) {
        logger.error('Error auto-saving to localStorage', error, { component: 'Builder', action: 'autoSave' });
        setAutoSaveStatus('error');
        setTimeout(() => setAutoSaveStatus('idle'), 3000);
      }
      return;
    }

    // For authenticated users, save to database
    try {
      setAutoSaveStatus('saving');
      
      const defaultTitle = generateResumeTitle({
        personalInfo: cvData.personalInfo,
        template: cvData.template,
        experience: cvData.experience,
      });

      const resumeData = {
        title: defaultTitle,
        cv_data: cvData,
        template: cvData.template,
      };

      if (currentResumeId) {
        await ResumeService.updateResume(currentResumeId, resumeData);
      } else {
        const newResume = await ResumeService.createResume(resumeData);
        setCurrentResumeId(newResume.id);
        localStorage.setItem('current-resume-id', newResume.id);
      }
      
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
      
    } catch (error) {
      logger.error('Error auto-saving resume', error, { component: 'Builder', action: 'autoSave', userId: user?.id });
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    }
  }, [user, cvData, currentResumeId, setAutoSaveStatus]);

  // Debounced auto-save effect
  useEffect(() => {
    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Set new timeout for auto-save after 2 seconds of no changes
    const timeout = setTimeout(() => {
      autoSave();
    }, 2000);

    setAutoSaveTimeout(timeout);

    // Cleanup timeout on unmount
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [cvData, user, currentResumeId, autoSave, autoSaveTimeout]); // Trigger on cvData changes

  const handleSaveResume = async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      return;
    }

    try {
      // Generate a better default title using the new utility
      const defaultTitle = generateResumeTitle({
        personalInfo: cvData.personalInfo,
        template: cvData.template,
        experience: cvData.experience,
      });

      const resumeData = {
        title: defaultTitle,
        cv_data: cvData,
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
      logger.error('Error saving resume', error, { component: 'Builder', action: 'handleSaveResume', userId: user?.id });
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
      
      {/* Auto-save status indicator */}
      {autoSaveStatus !== 'idle' && (
        <div className="fixed top-20 right-4 z-50">
          <div className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
            autoSaveStatus === 'saving' ? 'bg-blue-100 text-blue-800' :
            autoSaveStatus === 'saved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {autoSaveStatus === 'saving' && (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                Saving...
              </>
            )}
            {autoSaveStatus === 'saved' && (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Saved
              </>
            )}
            {autoSaveStatus === 'error' && (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Save failed
              </>
            )}
          </div>
        </div>
      )}
      
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

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";
import BuilderNavigation from "@/components/BuilderNavigation";
import SEOHead from "@/components/SEOHead";
import { logger } from "@/utils/logger";
import { generateResumeTitle } from "@/utils/resumeTitleGenerator";
import { CVData } from "@/types/cv";

const Builder = () => {
  const [searchParams] = useSearchParams();
  
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
    try {
      const savedData = localStorage.getItem('cv-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.cv_data) {
          setCVData(parsedData.cv_data as CVData);
        }
      }
    } catch (error) {
      logger.error('Error parsing saved CV data', error, { component: 'Builder', action: 'loadResumeData' });
    }
  }, []);

  // Auto-save function with debouncing
  const autoSave = useCallback(() => {
    try {
      const title = generateResumeTitle({
        personalInfo: cvData.personalInfo,
        template: cvData.template,
        experience: cvData.experience,
      });
      localStorage.setItem('cv-data', JSON.stringify({ title, cv_data: cvData, template: cvData.template }));
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    } catch (error) {
      logger.error('Error auto-saving to localStorage', error, { component: 'Builder', action: 'autoSave' });
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    }
  }, [cvData]);

  // Debounced auto-save effect
  useEffect(() => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    const timeout = setTimeout(() => {
      autoSave();
    }, 2000);
    setAutoSaveTimeout(timeout);
    return () => { clearTimeout(timeout); };
  }, [cvData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveResume = () => {
    try {
      const title = generateResumeTitle({
        personalInfo: cvData.personalInfo,
        template: cvData.template,
        experience: cvData.experience,
      });
      localStorage.setItem('cv-data', JSON.stringify({ title, cv_data: cvData, template: cvData.template }));
      toast.success("Resume saved!");
    } catch (error) {
      logger.error('Error saving resume', error, { component: 'Builder', action: 'handleSaveResume' });
      toast.error("Failed to save resume");
    }
  };

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

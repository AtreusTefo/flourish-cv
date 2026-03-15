import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";
import BuilderNavigation from "@/components/BuilderNavigation";
import SEOHead from "@/components/SEOHead";
import { useBuilderController } from "@/hooks/useBuilderController";

const Builder = () => {
  const { cvData, setCVData, autoSaveStatus, handleSaveResume } = useBuilderController();

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

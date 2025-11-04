import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { CVData } from "@/types/cv";
import { toast } from "sonner";
import { useState } from "react";
import ModernBlueTemplate from "@/components/cv/templates/ModernBlueTemplate";
import MinimalClassicTemplate from "@/components/cv/templates/MinimalClassicTemplate";
import CreativeEdgeTemplate from "@/components/cv/templates/CreativeEdgeTemplate";
import ExecutiveFormalTemplate from "@/components/cv/templates/ExecutiveFormalTemplate";
import TechDeveloperTemplate from "@/components/cv/templates/TechDeveloperTemplate";
import SimpleElegantTemplate from "@/components/cv/templates/SimpleElegantTemplate";
import AcademicTemplate from "@/components/cv/templates/AcademicTemplate";
import BoldModernTemplate from "@/components/cv/templates/BoldModernTemplate";
import CompactProTemplate from "@/components/cv/templates/CompactProTemplate";
import { generateFilenameSafeTitle } from "@/utils/resumeTitleGenerator";

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview = ({ cvData }: CVPreviewProps) => {
  const { personalInfo, summary, experience, education, skills, template } = cvData;
  const [isExporting, setIsExporting] = useState(false);

  // Template mapping
  const templates = {
    modern: ModernBlueTemplate,
    classic: MinimalClassicTemplate,
    creative: CreativeEdgeTemplate,
    executive: ExecutiveFormalTemplate,
    tech: TechDeveloperTemplate,
    elegant: SimpleElegantTemplate,
    academic: AcademicTemplate,
    bold: BoldModernTemplate,
    compact: CompactProTemplate,
  };

  // Convert Builder CVData format to Template CVData format
  const convertToTemplateData = (builderData: CVData): CVData => {
    return {
      personalInfo: {
        fullName: builderData.personalInfo.fullName || "",
        jobTitle: builderData.personalInfo.jobTitle || "",
        email: builderData.personalInfo.email || "",
        phone: builderData.personalInfo.phone || "",
        address: builderData.personalInfo.address || "",
        website: builderData.personalInfo.website || "",
        linkedin: builderData.personalInfo.linkedin || "",
      },
      summary: builderData.summary || "",
      experience: builderData.experience.map(exp => ({
        id: exp.id,
        position: exp.position,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        description: exp.description,
      })),
      education: builderData.education.map(edu => ({
        id: edu.id,
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        startDate: edu.startDate,
        endDate: edu.endDate,
        current: edu.current,
        description: edu.description,
      })),
      skills: builderData.skills || [],
      template: builderData.template || "modern",
    };
  };

  const templateData = convertToTemplateData(cvData);
  const TemplateComponent = templates[template] || templates.modern;

  const handleDownloadPDF = async () => {
    if (!personalInfo.fullName) {
      toast.error("Please fill in your name before exporting to PDF.");
      return;
    }

    try {
      setIsExporting(true);
      
      const elementId = 'cv-preview-content';
      
      // Check if element exists before attempting export
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`CV preview element not found. Expected ID: ${elementId}`);
      }
      
      // Generate a better filename using the utility
      const filename = generateFilenameSafeTitle({
        personalInfo: cvData.personalInfo,
        template: cvData.template,
        experience: cvData.experience,
      }) + '.pdf';
      
      // Dynamic import for PDF export to reduce bundle size
      const { exportToPDF } = await import("@/utils/pdfExportImproved");
      await exportToPDF(elementId, filename);
      
      toast.success("Your resume has been downloaded as PDF.");
    } catch (error) {
      toast.error(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Download Button */}
      <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">Resume Preview</h2>
        <Button 
          onClick={handleDownloadPDF} 
          disabled={isExporting}
          className="bg-gradient-primary"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* CV Content using selected template */}
      <div id="cv-preview-content" className="bg-white">
        <TemplateComponent 
          data={templateData} 
          id="cv-preview-content"
          className="min-h-[800px]"
        />
      </div>
    </div>
  );
};

export default CVPreview;

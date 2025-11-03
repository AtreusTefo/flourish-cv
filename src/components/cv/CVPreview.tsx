import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { CVData } from "@/pages/Builder";
import { exportToPDF } from "@/utils/pdfExportImproved";
import { toast } from "sonner";
import { useState } from "react";

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview = ({ cvData }: CVPreviewProps) => {
  const { personalInfo, summary, experience, education, skills } = cvData;
  const [isExporting, setIsExporting] = useState(false);

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
      
      await exportToPDF(elementId, `${personalInfo.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      
      toast.success("Your resume has been downloaded as PDF.");
    } catch (error) {
      toast.error(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Preview</h2>
        <Button 
          onClick={handleDownloadPDF} 
          className="bg-gradient-primary"
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isExporting ? "Exporting..." : "Download PDF"}
        </Button>
      </div>

      {/* CV Preview Content */}
      <div id="cv-preview-content" className="border rounded-lg p-8 bg-white shadow-sm min-h-[700px] relative">
        {/* Loading overlay during PDF export */}
        {isExporting && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Generating PDF...</p>
            </div>
          </div>
        )}
        {/* Header */}
        <div className="text-center border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-foreground">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-muted-foreground">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-1 text-sm text-primary">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground border-b pb-2 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground border-b pb-2 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.title || "Job Title"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate || "Start"} - {exp.current ? "Present" : exp.endDate || "End"}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-foreground mt-2 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground border-b pb-2 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {edu.degree || "Degree"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution || "Institution"}{edu.location ? `, ${edu.location}` : ""}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {edu.graduationDate || "Graduation Date"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground border-b pb-2 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!personalInfo.fullName && !summary && experience.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Start filling in your information to see the preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;

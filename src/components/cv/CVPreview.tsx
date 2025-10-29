import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CVData } from "@/pages/Builder";
import { exportToPDF } from "@/utils/pdfExport";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview = ({ cvData }: CVPreviewProps) => {
  const { personalInfo, summary, experience, education } = cvData;
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = async () => {
    if (!personalInfo.fullName) {
      toast({
        title: "Error",
        description: "Please fill in your name before exporting to PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      const success = await exportToPDF("cv-preview-content", `${personalInfo.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      
      if (success) {
        toast({
          title: "Export Successful!",
          description: "Your resume PDF is ready",
        });
      } else {
        throw new Error("PDF export validation failed");
      }
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
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
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Download PDF"}
        </Button>
      </div>

      {/* CV Preview Content - optimized for PDF export */}
      <div id="cv-preview-content" className="border rounded-lg p-8 bg-white shadow-sm min-h-[700px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
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

        {/* Empty State */}
        {!personalInfo.fullName && !summary && experience.length === 0 && education.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Start filling in your information to see the preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;

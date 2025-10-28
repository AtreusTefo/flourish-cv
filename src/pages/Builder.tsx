import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Save, FolderOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";
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
  const { user, loading: authLoading, logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSaveResume = async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      navigate("/auth");
      return;
    }

    try {
      const title = cvData.personalInfo.fullName 
        ? `${cvData.personalInfo.fullName}'s Resume`
        : "Untitled Resume";

      if (currentResumeId) {
        await updateResume(currentResumeId, {
          title,
          cv_data: cvData as any,
          template: cvData.template,
        });
        toast.success("Resume updated successfully!");
      } else {
        const newResume = await createResume({
          title,
          cv_data: cvData,
          template: cvData.template,
        });
        if (newResume) {
          setCurrentResumeId(newResume.id);
        }
        toast.success("Resume saved successfully!");
      }
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
    <div className="min-h-screen bg-cv-bg-gray">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="text-base sm:text-xl font-bold truncate">CVCraft Builder</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3">
              {user ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSaveResume}
                    disabled={resumeLoading}
                    className="hidden sm:inline-flex"
                  >
                    <Save className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">{resumeLoading ? "Saving..." : currentResumeId ? "Update" : "Save"}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSaveResume}
                    disabled={resumeLoading}
                    className="sm:hidden"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="hidden md:inline-flex">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    My Resumes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/")} className="hidden sm:inline-flex">
                    Home
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate("/")} className="hidden sm:inline-flex">
                    Home
                  </Button>
                  <Button size="sm" className="bg-gradient-primary text-xs sm:text-sm" onClick={() => navigate("/auth")}>
                    <span className="hidden sm:inline">Sign In to Save</span>
                    <span className="sm:hidden">Sign In</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Optional Login Banner */}
      {!user && (
        <div className="bg-gradient-primary text-white py-2 sm:py-3">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs sm:text-sm">
              💡 <strong>Sign in</strong> to save your resume and access it anytime.{" "}
              <button
                onClick={() => navigate("/auth")}
                className="underline font-semibold hover:opacity-80"
              >
                Create free account
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Split View */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left: Form */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 h-fit lg:sticky lg:top-24 order-2 lg:order-1">
            <CVForm cvData={cvData} setCVData={setCVData} />
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 min-h-[400px] sm:min-h-[600px] lg:min-h-[800px] order-1 lg:order-2">
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CVForm from "@/components/cv/CVForm";
import CVPreview from "@/components/cv/CVPreview";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication but don't redirect if not logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CVCraft Builder</span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                    Home
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                    Home
                  </Button>
                  <Button size="sm" className="bg-gradient-primary" onClick={() => navigate("/auth")}>
                    Sign In to Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Optional Login Banner */}
      {!user && (
        <div className="bg-gradient-primary text-white py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
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
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <CVForm cvData={cvData} setCVData={setCVData} />
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-lg shadow-md p-6 min-h-[800px]">
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;

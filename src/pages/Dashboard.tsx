import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { resumes, loading: resumesLoading, deleteResume, fetchResumes } = useResumes();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchResumes();
    }
  }, [user, authLoading, navigate]); // Removed fetchResumes from dependencies

  const handleDeleteResume = async (id: string) => {
    try {
      await deleteResume(id);
      toast.success("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date string provided: ${dateString}`);
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="My Resume Dashboard | Manage Your CVs - CVCraft"
        description="Access and manage all your resumes in one place. Edit, duplicate, delete, and create new professional resumes with our intuitive dashboard."
        keywords="resume dashboard, manage resumes, my CVs, resume management, edit resume, create resume, resume collection"
        canonical="https://cvcraft.app/dashboard"
        ogType="website"
        noIndex={true}
      />
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <span className="text-muted-foreground text-lg">›</span>
            <h2 className="text-2xl font-semibold text-foreground">My Resumes</h2>
          </div>
          <p className="text-muted-foreground">Manage and edit your resume collection</p>
        </div>

        {/* Create New Resume Button */}
        <div className="mb-6">
          <Button onClick={() => navigate("/builder")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </div>

        {/* Resumes Grid */}
        {resumesLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first resume to get started
              </p>
              <Button onClick={() => navigate("/builder")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">
                        {resume.title || "Untitled Resume"}
                      </CardTitle>
                      <div className="mt-1 flex items-center">
                        {resume.template && (
                          <Badge variant="secondary" className="text-xs">
                            {resume.template}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/builder?resume=${resume.id}`)}
                        className="gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteResume(resume.id)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(resume.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
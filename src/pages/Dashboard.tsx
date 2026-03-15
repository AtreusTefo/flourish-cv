import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { ResumeCardSkeleton } from "@/components/ui/skeleton-loaders";
import { useResumes } from "@/hooks/useResumes";
import { logger } from "@/utils/logger";

const Dashboard = () => {
  const navigate = useNavigate();
  const { resumes, loading: resumesLoading, deleteResume } = useResumes();

  const handleDeleteResume = async (id: string) => {
    try {
      await deleteResume(id);
      toast.success("Resume deleted successfully");
    } catch (error) {
      logger.error("Error deleting resume", error, { component: "Dashboard", action: "handleDeleteResume", resumeId: id });
      toast.error("Failed to delete resume");
    }
  };

  const handleNavigateToBuilder = () => navigate("/builder");
  const handleEditResume = (id: string) => navigate(`/builder?resume=${id}`);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return "Invalid Date";
    }
  };

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
          <Button onClick={handleNavigateToBuilder} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </div>

        {/* Resumes Grid */}
        {resumesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ResumeCardSkeleton key={i} />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first resume to get started
              </p>
              <Button onClick={handleNavigateToBuilder}>
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
                        onClick={() => handleEditResume(resume.id)}
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
                      {formatDate(resume.updated_at)}
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
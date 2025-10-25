import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Sparkles, Download, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CVCraft</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <button
                onClick={() => navigate("/templates")}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Templates
              </button>
              <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Create Your Perfect Resume in
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Professional, ATS-friendly resumes with AI-powered suggestions. Choose from beautiful templates and download as PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-lg" onClick={() => navigate("/builder")}>
                <Sparkles className="mr-2 h-5 w-5" />
                Start Building Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/templates")}>
                View Templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-cv-bg-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build professional resumes that get you noticed by recruiters and pass ATS systems.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
              <p className="text-muted-foreground">
                Get smart content suggestions for job descriptions, summaries, and skills.
              </p>
            </Card>
            <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-muted-foreground">
                Choose from beautiful, recruiter-approved templates that make you stand out.
              </p>
            </Card>
            <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
              <p className="text-muted-foreground">
                Download your resume as a polished PDF ready to send to employers.
              </p>
            </Card>
            <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save & Manage</h3>
              <p className="text-muted-foreground">
                Create an account to save, edit, and manage multiple resumes securely.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple Process, Professional Results
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating your perfect resume is just three easy steps away.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Template</h3>
              <p className="text-muted-foreground">
                Select from our collection of professional, ATS-friendly templates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Fill Information</h3>
              <p className="text-muted-foreground">
                Add your details with AI-powered suggestions for better content.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Download PDF</h3>
              <p className="text-muted-foreground">
                Export your polished resume and start applying to your dream jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have created professional resumes with CVCraft.
          </p>
          <Button size="lg" variant="secondary" className="shadow-xl" onClick={() => navigate("/builder")}>
            Create Your Resume Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 CVCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

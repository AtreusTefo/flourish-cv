import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Check, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModernBlueTemplate from "@/components/cv/templates/ModernBlueTemplate";
import MinimalClassicTemplate from "@/components/cv/templates/MinimalClassicTemplate";
import CreativeEdgeTemplate from "@/components/cv/templates/CreativeEdgeTemplate";
import ExecutiveFormalTemplate from "@/components/cv/templates/ExecutiveFormalTemplate";
import TechDeveloperTemplate from "@/components/cv/templates/TechDeveloperTemplate";
import SimpleElegantTemplate from "@/components/cv/templates/SimpleElegantTemplate";
import { sampleCVData } from "@/data/sampleCV";
import { exportToPDF } from "@/utils/pdfExport";
import { useToast } from "@/hooks/use-toast";

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const templates = [
    {
      id: "modern",
      name: "Modern Blue",
      description: "Two-column layout with blue accents and clean lines. Perfect for tech and creative roles.",
      badge: "Most Popular",
      features: ["Two-column layout", "Blue color accents", "Modern typography", "ATS-friendly"],
      component: ModernBlueTemplate,
    },
    {
      id: "classic",
      name: "Minimal Classic",
      description: "One-column layout with black and gray theme. Ideal for corporate and professional positions.",
      badge: "Traditional",
      features: ["Single column", "Formal styling", "Clear sections", "Timeless design"],
      component: MinimalClassicTemplate,
    },
    {
      id: "creative",
      name: "Creative Edge",
      description: "Two-column layout with colored sidebar. Stylish yet professional for creative industries.",
      badge: "Trendy",
      features: ["Colored sidebar", "Modern design", "Unique layout", "Eye-catching"],
      component: CreativeEdgeTemplate,
    },
    {
      id: "executive",
      name: "Executive Formal",
      description: "Premium corporate design with dark header. Perfect for senior leadership and executive positions.",
      badge: "Premium",
      features: ["Dark header design", "Two-column layout", "Professional styling", "Executive feel"],
      component: ExecutiveFormalTemplate,
    },
    {
      id: "tech",
      name: "Tech Developer",
      description: "Modern tech-focused design with gradient header and card layout. Ideal for developers and IT professionals.",
      badge: "Developer",
      features: ["Gradient header", "Card-based layout", "Tech aesthetic", "Project showcase"],
      component: TechDeveloperTemplate,
    },
    {
      id: "elegant",
      name: "Simple Elegant",
      description: "Ultra-clean minimalist design with maximum readability. Perfect for any professional role.",
      badge: "Minimalist",
      features: ["Maximum simplicity", "Excellent readability", "Timeless design", "Versatile"],
      component: SimpleElegantTemplate,
    },
  ];

  const handleExportPDF = async () => {
    try {
      await exportToPDF("cv-template", `resume-${selectedTemplate}.pdf`);
      toast({
        title: "Success!",
        description: "Your resume has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUseTemplate = () => {
    // In future, this will pass the selected template to the builder
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CVCraft</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Perfect Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All templates are professionally designed, ATS-friendly, and fully customizable.
          </p>
        </div>
      </section>

      {/* Template Preview or Grid */}
      {previewTemplate ? (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                ← Back to Templates
              </Button>
              <Button onClick={handleExportPDF} className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
            <div className="bg-white shadow-2xl">
              {templates.find((t) => t.id === previewTemplate)?.component &&
                (() => {
                  const TemplateComponent = templates.find((t) => t.id === previewTemplate)!.component;
                  return <TemplateComponent data={sampleCVData} />;
                })()}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {templates.map((template) => {
                const TemplateComponent = template.component;
                return (
                  <Card
                    key={template.id}
                    className={`overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
                      selectedTemplate === template.id ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="aspect-[8.5/11] bg-cv-bg-gray p-2 relative overflow-hidden">
                      <div className="scale-[0.25] origin-top-left w-[400%] pointer-events-none">
                        <TemplateComponent data={sampleCVData} />
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {template.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <ul className="space-y-1 mb-4">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTemplate(template.id);
                          }}
                        >
                          Preview
                        </Button>
                        <Button
                          className={`flex-1 ${
                            selectedTemplate === template.id ? "bg-gradient-primary" : ""
                          }`}
                          variant={selectedTemplate === template.id ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template.id);
                            handleUseTemplate();
                          }}
                        >
                          {selectedTemplate === template.id ? "Use Template" : "Select"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-cv-bg-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Select your favorite template and start creating your professional resume in minutes.
          </p>
          <Button size="lg" className="bg-gradient-primary shadow-lg" onClick={handleUseTemplate}>
            Start Building with {templates.find((t) => t.id === selectedTemplate)?.name}
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

export default Templates;

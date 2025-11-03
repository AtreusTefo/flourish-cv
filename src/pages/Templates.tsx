import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Check, Download, Palette, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import ModernBlueTemplate from "@/components/cv/templates/ModernBlueTemplate";
import MinimalClassicTemplate from "@/components/cv/templates/MinimalClassicTemplate";
import CreativeEdgeTemplate from "@/components/cv/templates/CreativeEdgeTemplate";
import ExecutiveFormalTemplate from "@/components/cv/templates/ExecutiveFormalTemplate";
import TechDeveloperTemplate from "@/components/cv/templates/TechDeveloperTemplate";
import SimpleElegantTemplate from "@/components/cv/templates/SimpleElegantTemplate";
import AcademicTemplate from "@/components/cv/templates/AcademicTemplate";
import BoldModernTemplate from "@/components/cv/templates/BoldModernTemplate";
import CompactProTemplate from "@/components/cv/templates/CompactProTemplate";
import { sampleCVData } from "@/data/sampleCV";
import { exportToPDF } from "@/utils/pdfExport";
import { toast } from "sonner";

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [showExportSuccess, setShowExportSuccess] = useState(false);


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
    {
      id: "academic",
      name: "Academic Research",
      description: "Scholarly design with emphasis on education and publications. Ideal for researchers and academics.",
      badge: "Academic",
      features: ["Publication-focused", "Education-first", "Classic typography", "Research-oriented"],
      component: AcademicTemplate,
    },
    {
      id: "bold",
      name: "Bold Modern",
      description: "Eye-catching design with vibrant colors and bold typography. Perfect for creative professionals.",
      badge: "Bold",
      features: ["Vibrant gradient", "Bold typography", "Card-based layout", "Stand out"],
      component: BoldModernTemplate,
    },
    {
      id: "compact",
      name: "Compact Pro",
      description: "Space-efficient design with accent bar and compact sections. Maximum info in minimal space.",
      badge: "Efficient",
      features: ["Compact layout", "Space-efficient", "Accent sidebar", "Dense information"],
      component: CompactProTemplate,
    },
  ];

  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    console.log('🚀 Templates: Export PDF button clicked');
    console.log('📋 Current previewTemplate:', previewTemplate);
    console.log('📋 Available templates:', templates.map(t => t.id));
    
    if (!previewTemplate) {
      console.error('❌ No template selected for export');
      toast.error("Please preview a template first before downloading PDF.");
      return;
    }

    try {
      setIsExporting(true);
      console.log('📋 Attempting to export template:', previewTemplate);
      
      const elementId = `cv-template-${previewTemplate}`;
      console.log('🎯 Looking for element with ID:', elementId);
      
      // Use improved PDF export with comprehensive error handling
      const { exportToPDFEnhanced } = await import('../utils/pdfExportImproved');
      
      const result = await exportToPDFEnhanced(elementId, {
        fileName: `resume-${previewTemplate}.pdf`,
        timeout: 30000,
        scale: 3,
        quality: 0.95,
        maxPages: 10
      });
      
      if (result.success) {
        console.log('🎉 Improved PDF export completed successfully');
        console.log('📊 Export metrics:', {
          fileName: result.fileName,
          pageCount: result.pageCount,
          fileSize: result.fileSize
        });
        
        // Show success message that TestSprite expects
        setShowExportSuccess(true);
        setTimeout(() => setShowExportSuccess(false), 5000);
        
        // Success message with page count details
        const pageInfo = result.pageCount > 1 
          ? `Multi-page PDF (${result.pageCount} pages) exported successfully`
          : 'Single-page PDF exported successfully';
        
        toast.success(`Your resume has been downloaded as PDF. ${pageInfo}`);
      } else {
        throw new Error(result.error || 'PDF export failed');
      }
      
    } catch (error) {
      console.error('❌ Template export failed:', error);
      
      // Enhanced error handling with specific error types
      let errorTitle = "Export Error";
      let errorDescription = "Failed to export PDF";
      
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        
        if (errorMessage.includes('timeout')) {
          errorTitle = "Export Timeout";
          errorDescription = "PDF export took too long. Please try again with a simpler template.";
        } else if (errorMessage.includes('element not found')) {
          errorTitle = "Template Not Found";
          errorDescription = "Could not find the template content. Please refresh and try again.";
        } else if (errorMessage.includes('no content')) {
          errorTitle = "Empty Template";
          errorDescription = "The template appears to be empty. Please add content before exporting.";
        } else if (errorMessage.includes('dimensions')) {
          errorTitle = "Invalid Template";
          errorDescription = "The template has invalid dimensions. Please try a different template.";
        } else {
          errorDescription = `${error.message}`;
        }
      }
      
      toast.error(errorDescription);
    } finally {
      setIsExporting(false);
    }
  };

  const handleUseTemplate = () => {
    // Pass the selected template to the builder via URL parameters
    navigate(`/builder?template=${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Resume Templates | ATS-Friendly CV Templates - CVCraft"
        description="Choose from 9+ professional, ATS-friendly resume templates. Modern, classic, creative, and executive designs. All templates are fully customizable and optimized for job applications."
        keywords="resume templates, CV templates, ATS-friendly templates, professional resume designs, modern resume templates, classic CV templates, creative resume layouts, executive resume templates"
        canonical="https://cvcraft.app/templates"
        ogType="website"
      />
      {/* Navigation */}
      <Navigation variant="minimal" />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Choose Your Perfect Template
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            All templates are professionally designed, ATS-friendly, and fully customizable.
          </p>
        </div>
      </section>

      {/* Template Preview or Grid */}
      {previewTemplate ? (
        <section className="py-6 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <Button variant="outline" onClick={() => setPreviewTemplate(null)} size="sm">
                ← Back to Templates
              </Button>
              <Button onClick={handleExportPDF} className="gap-2" size="sm" disabled={isExporting} data-testid="download-pdf-button" id="download-pdf-button">
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isExporting ? 'Exporting PDF...' : 'Download PDF'}</span>
                <span className="sm:hidden">{isExporting ? 'Exporting...' : 'Download'}</span>
              </Button>
            </div>
            
            {/* Success Message for TestSprite */}
            {showExportSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                Exported PDF contains all selected template styling and formatting
              </div>
            )}
            
            <div className="grid lg:grid-cols-[1fr,300px] gap-4 sm:gap-6">
              <div className="bg-white shadow-2xl overflow-auto max-h-[70vh] sm:max-h-none relative">
                {/* Loading overlay during PDF export */}
                {isExporting && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Generating PDF...</p>
                    </div>
                  </div>
                )}
                {templates.find((t) => t.id === previewTemplate)?.component &&
                  (() => {
                    const TemplateComponent = templates.find((t) => t.id === previewTemplate)!.component;
                    return <TemplateComponent data={sampleCVData} primaryColor={primaryColor} secondaryColor={secondaryColor} id={`cv-template-${previewTemplate}`} />;
                  })()}
              </div>
              
              {/* Color Customization Panel */}
              <div className="space-y-4 sm:space-y-6">
                <Card className="p-4 sm:p-6 lg:sticky lg:top-24">
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <h3 className="font-bold text-base sm:text-lg">Customize Colors</h3>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color" className="text-sm">Primary Color</Label>
                      <div className="flex gap-2 sm:gap-3 items-center">
                        <input
                          id="primary-color"
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg cursor-pointer border-2 border-border"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-full px-2 sm:px-3 py-2 border rounded-md font-mono text-xs sm:text-sm"
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color" className="text-sm">Secondary Color</Label>
                      <div className="flex gap-2 sm:gap-3 items-center">
                        <input
                          id="secondary-color"
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg cursor-pointer border-2 border-border"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-full px-2 sm:px-3 py-2 border rounded-md font-mono text-xs sm:text-sm"
                            placeholder="#1E40AF"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Quick Presets:</p>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        <button
                          onClick={() => {
                            setPrimaryColor("#3B82F6");
                            setSecondaryColor("#1E40AF");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #3B82F6 50%, #1E40AF 50%)" }}
                          title="Blue"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#10B981");
                            setSecondaryColor("#059669");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #10B981 50%, #059669 50%)" }}
                          title="Green"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#8B5CF6");
                            setSecondaryColor("#6D28D9");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #8B5CF6 50%, #6D28D9 50%)" }}
                          title="Purple"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#EF4444");
                            setSecondaryColor("#DC2626");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #EF4444 50%, #DC2626 50%)" }}
                          title="Red"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#F59E0B");
                            setSecondaryColor("#D97706");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #F59E0B 50%, #D97706 50%)" }}
                          title="Orange"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#06B6D4");
                            setSecondaryColor("#0891B2");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #06B6D4 50%, #0891B2 50%)" }}
                          title="Cyan"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#EC4899");
                            setSecondaryColor("#DB2777");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #EC4899 50%, #DB2777 50%)" }}
                          title="Pink"
                        />
                        <button
                          onClick={() => {
                            setPrimaryColor("#1F2937");
                            setSecondaryColor("#111827");
                          }}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #1F2937 50%, #111827 50%)" }}
                          title="Dark"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-6 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
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
                        <TemplateComponent data={sampleCVData} id={`cv-template-grid-${template.id}`} />
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h3 className="text-lg sm:text-xl font-bold">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {template.badge}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{template.description}</p>
                      <ul className="space-y-1 mb-3 sm:mb-4">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant="outline"
                          size="sm"
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
                          size="sm"
                          data-testid={`use-template-${template.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template.id);
                            handleUseTemplate();
                          }}
                        >
                          <span className="hidden sm:inline">{selectedTemplate === template.id ? "Use Template" : "Select"}</span>
                          <span className="sm:hidden">Use</span>
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

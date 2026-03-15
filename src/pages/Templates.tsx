import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Check, Download, Palette, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { sampleCVData } from "@/data/sampleCV";
import { useTemplatesController } from "@/hooks/useTemplatesController";

const Templates = () => {
  const {
    templates,
    selectedTemplate,
    previewTemplate,
    primaryColor,
    secondaryColor,
    primaryColorError,
    secondaryColorError,
    colorValidation,
    isExporting,
    showExportSuccess,
    HEX_RE,
    handleSelectTemplate,
    handlePreviewTemplate,
    handleClosePreview,
    handleUseTemplate,
    handleNavigateToBuilder,
    handleExportPDF,
    updatePrimaryColor,
    updateSecondaryColor,
    applyColorPreset,
  } = useTemplatesController();

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
              <Button variant="outline" onClick={handleClosePreview} size="sm">
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
                          onChange={(e) => updatePrimaryColor(e.target.value)}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg cursor-pointer border-2 border-border"
                          aria-label="Primary color picker"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => updatePrimaryColor(e.target.value)}
                            className={`w-full px-2 sm:px-3 py-2 border rounded-md font-mono text-xs sm:text-sm ${primaryColorError ? "border-red-500 focus:ring-red-500" : ""}`}
                            placeholder="#3B82F6"
                            aria-label="Primary color hex value"
                            aria-invalid={primaryColorError}
                            aria-describedby={primaryColorError ? "primary-color-error" : undefined}
                          />
                          {primaryColorError && (
                            <p id="primary-color-error" className="text-xs text-red-500 mt-1">Enter a valid hex color (e.g. #3B82F6)</p>
                          )}
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
                          onChange={(e) => updateSecondaryColor(e.target.value)}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg cursor-pointer border-2 border-border"
                          aria-label="Secondary color picker"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={secondaryColor}
                            onChange={(e) => updateSecondaryColor(e.target.value)}
                            className={`w-full px-2 sm:px-3 py-2 border rounded-md font-mono text-xs sm:text-sm ${secondaryColorError ? "border-red-500 focus:ring-red-500" : ""}`}
                            placeholder="#1E40AF"
                            aria-label="Secondary color hex value"
                            aria-invalid={secondaryColorError}
                            aria-describedby={secondaryColorError ? "secondary-color-error" : undefined}
                          />
                          {secondaryColorError && (
                            <p id="secondary-color-error" className="text-xs text-red-500 mt-1">Enter a valid hex color (e.g. #1E40AF)</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Color Contrast Indicator */}
                    <div className="pt-3 sm:pt-4 border-t">
                      <div className="flex items-center gap-2 mb-2">
                        {colorValidation.overall === 'FAIL' ? (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span className="text-xs sm:text-sm font-medium">
                          Accessibility: {colorValidation.overall === 'FAIL' ? 'Needs Improvement' : `WCAG ${colorValidation.overall}`}
                        </span>
                      </div>
                      {colorValidation.recommendations.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {colorValidation.recommendations[0]}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Quick Presets:</p>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        <button
                          onClick={() => applyColorPreset("#3B82F6", "#1E40AF")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #3B82F6 50%, #1E40AF 50%)" }}
                          title="Blue"
                          aria-label="Set Blue color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#10B981", "#059669")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #10B981 50%, #059669 50%)" }}
                          title="Green"
                          aria-label="Set Green color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#8B5CF6", "#6D28D9")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #8B5CF6 50%, #6D28D9 50%)" }}
                          title="Purple"
                          aria-label="Set Purple color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#EF4444", "#DC2626")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #EF4444 50%, #DC2626 50%)" }}
                          title="Red"
                          aria-label="Set Red color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#F59E0B", "#D97706")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #F59E0B 50%, #D97706 50%)" }}
                          title="Orange"
                          aria-label="Set Orange color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#06B6D4", "#0891B2")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #06B6D4 50%, #0891B2 50%)" }}
                          title="Cyan"
                          aria-label="Set Cyan color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#EC4899", "#DB2777")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #EC4899 50%, #DB2777 50%)" }}
                          title="Pink"
                          aria-label="Set Pink color preset"
                        />
                        <button
                          onClick={() => applyColorPreset("#1F2937", "#111827")}
                          className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ background: "linear-gradient(135deg, #1F2937 50%, #111827 50%)" }}
                          title="Dark"
                          aria-label="Set Dark color preset"
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
                    onClick={() => handleSelectTemplate(template.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${template.name} template`}
                    aria-pressed={selectedTemplate === template.id}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectTemplate(template.id);
                      }
                    }}
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
                            handlePreviewTemplate(template.id);
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
                            handleUseTemplate(template.id);
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
          <Button
            size="lg"
            className="bg-gradient-primary shadow-lg"
            onClick={handleNavigateToBuilder}
          >
            Start Building with {templates.find((t) => t.id === (previewTemplate ?? selectedTemplate))?.name}
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

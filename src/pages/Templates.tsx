import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean, contemporary design with bold headers and accent colors. Perfect for tech and creative roles.",
      badge: "Most Popular",
      features: ["Two-column layout", "Color accents", "Modern typography", "ATS-friendly"],
      preview: (
        <div className="border rounded-lg p-6 bg-white h-full">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-2xl font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
            <p className="text-xs text-primary mt-1">john@example.com • +1 234 567 890</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-primary text-sm mb-1">PROFESSIONAL SUMMARY</h4>
              <div className="h-2 bg-muted rounded w-full mb-1"></div>
              <div className="h-2 bg-muted rounded w-3/4"></div>
            </div>
            <div>
              <h4 className="font-bold text-primary text-sm mb-1">EXPERIENCE</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">Senior Developer</span>
                    <span className="text-muted-foreground">2020-Present</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded w-full mt-1"></div>
                  <div className="h-1.5 bg-muted rounded w-2/3 mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "classic",
      name: "Classic Professional",
      description: "Traditional, formal layout ideal for corporate, finance, and legal positions.",
      badge: "Traditional",
      features: ["Single column", "Formal styling", "Clear sections", "Timeless design"],
      preview: (
        <div className="border rounded-lg p-6 bg-white h-full">
          <div className="text-center border-b-2 border-foreground pb-3 mb-4">
            <h3 className="text-2xl font-bold uppercase tracking-wide">John Doe</h3>
            <p className="text-xs text-muted-foreground mt-1">
              john@example.com | +1 234 567 890 | New York, NY
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide border-b border-foreground pb-1 mb-2">
                Summary
              </h4>
              <div className="h-2 bg-muted rounded w-full mb-1"></div>
              <div className="h-2 bg-muted rounded w-4/5"></div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide border-b border-foreground pb-1 mb-2">
                Experience
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-xs">Senior Developer</p>
                  <p className="text-xs text-muted-foreground italic">Tech Company | 2020-Present</p>
                  <div className="h-1.5 bg-muted rounded w-full mt-1"></div>
                  <div className="h-1.5 bg-muted rounded w-3/4 mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Sleek, minimalist design with ample white space. Great for design and modern industries.",
      badge: "Trendy",
      features: ["Minimalist layout", "Generous spacing", "Subtle design", "Easy to scan"],
      preview: (
        <div className="border rounded-lg p-6 bg-white h-full">
          <div className="mb-6">
            <h3 className="text-3xl font-light tracking-tight">John Doe</h3>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
              <span>john@example.com</span>
              <span>•</span>
              <span>+1 234 567 890</span>
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-2">
                About
              </h4>
              <div className="h-2 bg-muted rounded w-full mb-1"></div>
              <div className="h-2 bg-muted rounded w-5/6"></div>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Experience
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="font-medium text-xs">Senior Developer</p>
                    <span className="text-xs text-muted-foreground">2020-Now</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded w-full"></div>
                  <div className="h-1.5 bg-muted rounded w-2/3 mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

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

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
                  selectedTemplate === template.id ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="aspect-[8.5/11] bg-cv-bg-gray p-4 relative">
                  {template.preview}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
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
                  <Button
                    className={`w-full ${
                      selectedTemplate === template.id ? "bg-gradient-primary" : ""
                    }`}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTemplate(template.id);
                      handleUseTemplate();
                    }}
                  >
                    {selectedTemplate === template.id ? "Use This Template" : "Preview"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

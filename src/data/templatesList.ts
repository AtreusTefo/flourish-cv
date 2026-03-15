/**
 * Model: Master list of available CV templates.
 * Consumed by the Templates page View via useTemplatesController.
 */
import { ComponentType } from "react";
import ModernBlueTemplate from "@/components/cv/templates/ModernBlueTemplate";
import MinimalClassicTemplate from "@/components/cv/templates/MinimalClassicTemplate";
import CreativeEdgeTemplate from "@/components/cv/templates/CreativeEdgeTemplate";
import ExecutiveFormalTemplate from "@/components/cv/templates/ExecutiveFormalTemplate";
import TechDeveloperTemplate from "@/components/cv/templates/TechDeveloperTemplate";
import SimpleElegantTemplate from "@/components/cv/templates/SimpleElegantTemplate";
import AcademicTemplate from "@/components/cv/templates/AcademicTemplate";
import BoldModernTemplate from "@/components/cv/templates/BoldModernTemplate";
import CompactProTemplate from "@/components/cv/templates/CompactProTemplate";
import { TemplateProps } from "@/types/cv";

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  badge: string;
  features: string[];
  component: ComponentType<TemplateProps>;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "modern",
    name: "Modern Blue",
    description:
      "Two-column layout with blue accents and clean lines. Perfect for tech and creative roles.",
    badge: "Most Popular",
    features: ["Two-column layout", "Blue color accents", "Modern typography", "ATS-friendly"],
    component: ModernBlueTemplate,
  },
  {
    id: "classic",
    name: "Minimal Classic",
    description:
      "One-column layout with black and gray theme. Ideal for corporate and professional positions.",
    badge: "Traditional",
    features: ["Single column", "Formal styling", "Clear sections", "Timeless design"],
    component: MinimalClassicTemplate,
  },
  {
    id: "creative",
    name: "Creative Edge",
    description:
      "Two-column layout with colored sidebar. Stylish yet professional for creative industries.",
    badge: "Trendy",
    features: ["Colored sidebar", "Modern design", "Unique layout", "Eye-catching"],
    component: CreativeEdgeTemplate,
  },
  {
    id: "executive",
    name: "Executive Formal",
    description:
      "Premium corporate design with dark header. Perfect for senior leadership and executive positions.",
    badge: "Premium",
    features: ["Dark header design", "Two-column layout", "Professional styling", "Executive feel"],
    component: ExecutiveFormalTemplate,
  },
  {
    id: "tech",
    name: "Tech Developer",
    description:
      "Modern tech-focused design with gradient header and card layout. Ideal for developers and IT professionals.",
    badge: "Developer",
    features: ["Gradient header", "Card-based layout", "Tech aesthetic", "Project showcase"],
    component: TechDeveloperTemplate,
  },
  {
    id: "elegant",
    name: "Simple Elegant",
    description:
      "Ultra-clean minimalist design with maximum readability. Perfect for any professional role.",
    badge: "Minimalist",
    features: ["Maximum simplicity", "Excellent readability", "Timeless design", "Versatile"],
    component: SimpleElegantTemplate,
  },
  {
    id: "academic",
    name: "Academic Research",
    description:
      "Scholarly design with emphasis on education and publications. Ideal for researchers and academics.",
    badge: "Academic",
    features: ["Publication-focused", "Education-first", "Classic typography", "Research-oriented"],
    component: AcademicTemplate,
  },
  {
    id: "bold",
    name: "Bold Modern",
    description:
      "Eye-catching design with vibrant colors and bold typography. Perfect for creative professionals.",
    badge: "Bold",
    features: ["Vibrant gradient", "Bold typography", "Card-based layout", "Stand out"],
    component: BoldModernTemplate,
  },
  {
    id: "compact",
    name: "Compact Pro",
    description:
      "Space-efficient design with accent bar and compact sections. Maximum info in minimal space.",
    badge: "Efficient",
    features: ["Compact layout", "Space-efficient", "Accent sidebar", "Dense information"],
    component: CompactProTemplate,
  },
];

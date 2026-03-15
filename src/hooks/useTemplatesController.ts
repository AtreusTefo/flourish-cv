/**
 * Controller: Templates page
 *
 * Owns all state and actions for the Templates Gallery.
 * The Templates View simply renders what this hook exposes.
 *
 * Responsibilities (MVC Controller):
 *  - Track selected / previewed template
 *  - Manage primary & secondary color state with hex validation
 *  - Compute WCAG color-contrast validation (memoised)
 *  - Handle PDF export with comprehensive error handling
 *  - Provide navigation helpers
 *  - Expose the template list (Model) to the View
 */
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { validateCVColors } from "@/utils/colorContrast";
import { logger } from "@/utils/logger";
import { TEMPLATES } from "@/data/templatesList";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export const useTemplatesController = () => {
  const navigate = useNavigate();

  // ── Selection / preview ───────────────────────────────────────────────────
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  // ── Color customisation ───────────────────────────────────────────────────
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [primaryColorError, setPrimaryColorError] = useState(false);
  const [secondaryColorError, setSecondaryColorError] = useState(false);

  // ── Export state ──────────────────────────────────────────────────────────
  const [isExporting, setIsExporting] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  // ── WCAG contrast check (computed / derived) ──────────────────────────────
  const colorValidation = useMemo(
    () => validateCVColors(primaryColor, secondaryColor),
    [primaryColor, secondaryColor]
  );

  // ── Colour helpers ────────────────────────────────────────────────────────
  const updatePrimaryColor = (value: string) => {
    setPrimaryColor(value);
    setPrimaryColorError(!HEX_RE.test(value));
  };

  const updateSecondaryColor = (value: string) => {
    setSecondaryColor(value);
    setSecondaryColorError(!HEX_RE.test(value));
  };

  const applyColorPreset = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setPrimaryColorError(false);
    setSecondaryColor(secondary);
    setSecondaryColorError(false);
  };

  // ── Template actions ──────────────────────────────────────────────────────
  const handleSelectTemplate = (id: string) => setSelectedTemplate(id);

  const handlePreviewTemplate = (id: string) => {
    setSelectedTemplate(id);
    setPreviewTemplate(id);
  };

  const handleClosePreview = () => setPreviewTemplate(null);

  const handleUseTemplate = (id?: string) => {
    navigate(`/builder?template=${id ?? selectedTemplate}`);
  };

  const handleNavigateToBuilder = () => {
    navigate(`/builder?template=${previewTemplate ?? selectedTemplate}`);
  };

  // ── PDF export ────────────────────────────────────────────────────────────
  const handleExportPDF = async () => {
    logger.debug("Templates: Export PDF button clicked", {
      component: "useTemplatesController",
      action: "exportPDF",
      previewTemplate,
    });

    if (!previewTemplate) {
      toast.error("Please preview a template first before downloading PDF.");
      return;
    }

    try {
      setIsExporting(true);

      const elementId = `cv-template-${previewTemplate}`;
      const element = document.getElementById(elementId);

      if (!element) {
        toast.error("Template content not found. Please refresh and try again.");
        return;
      }

      const textContent = element.textContent?.trim();
      if (!textContent || textContent.length < 50) {
        toast.error(
          "Template appears to be empty or incomplete. Please ensure the template has loaded properly."
        );
        return;
      }

      const { ImprovedPDFExporter } = await import("../utils/pdfExportImproved");

      const result = await ImprovedPDFExporter.exportToPDF(elementId, {
        fileName: `resume-${previewTemplate}.pdf`,
        timeout: 30000,
        scale: 3,
        quality: 0.95,
        maxPages: 10,
      });

      if (result.success) {
        setShowExportSuccess(true);
        setTimeout(() => setShowExportSuccess(false), 5000);

        const pageInfo =
          result.pageCount > 1
            ? `Multi-page PDF (${result.pageCount} pages) exported successfully`
            : "Single-page PDF exported successfully";

        toast.success(`Your resume has been downloaded as PDF. ${pageInfo}`);
      } else {
        throw new Error(result.error || "PDF export failed");
      }
    } catch (error) {
      let errorDescription = "Failed to export PDF";

      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("timeout")) {
          errorDescription = "PDF export took too long. Please try again with a simpler template.";
        } else if (msg.includes("element not found")) {
          errorDescription = "Could not find the template content. Please refresh and try again.";
        } else if (msg.includes("no content")) {
          errorDescription = "The template appears to be empty. Please add content before exporting.";
        } else if (msg.includes("dimensions")) {
          errorDescription = "The template has invalid dimensions. Please try a different template.";
        } else {
          errorDescription = error.message;
        }
      }

      toast.error(errorDescription);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    // Model
    templates: TEMPLATES,
    // State
    selectedTemplate,
    previewTemplate,
    primaryColor,
    secondaryColor,
    primaryColorError,
    secondaryColorError,
    colorValidation,
    isExporting,
    showExportSuccess,
    // Helpers
    HEX_RE,
    // Actions
    handleSelectTemplate,
    handlePreviewTemplate,
    handleClosePreview,
    handleUseTemplate,
    handleNavigateToBuilder,
    handleExportPDF,
    updatePrimaryColor,
    updateSecondaryColor,
    applyColorPreset,
  };
};

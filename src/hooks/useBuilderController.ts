/**
 * Controller: Builder page
 *
 * Owns all state and side-effects for the CV Builder.
 * The Builder View (page) simply renders what this hook exposes.
 *
 * Responsibilities (MVC Controller):
 *  - Load/persist CV data from localStorage
 *  - Debounced auto-save
 *  - Manual save
 *  - Read template from URL search params
 */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { CVData } from "@/types/cv";
import { generateResumeTitle } from "@/utils/resumeTitleGenerator";
import { logger } from "@/utils/logger";

type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

type TemplateId =
  | "modern"
  | "classic"
  | "creative"
  | "executive"
  | "tech"
  | "elegant"
  | "academic"
  | "bold"
  | "compact";

const STORAGE_KEY = "cv-data";
const AUTO_SAVE_DELAY_MS = 2000;
const STATUS_RESET_MS = 2000;
const ERROR_RESET_MS = 3000;

const DEFAULT_CV_DATA: CVData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  interests: [],
  template: "modern",
};

export const useBuilderController = () => {
  const [searchParams] = useSearchParams();
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("idle");

  const templateFromUrl = searchParams.get("template") as TemplateId | null;
  const initialTemplate: TemplateId = templateFromUrl ?? "modern";

  const [cvData, setCVData] = useState<CVData>({
    ...DEFAULT_CV_DATA,
    template: initialTemplate,
  });

  // ── Load persisted data on mount ──────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cv_data) {
          setCVData(parsed.cv_data as CVData);
        }
      }
    } catch (error) {
      logger.error("Error loading saved CV data", error, {
        component: "useBuilderController",
        action: "loadResumeData",
      });
    }
  }, []);

  // ── Debounced auto-save ───────────────────────────────────────────────────
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const title = generateResumeTitle({
          personalInfo: cvData.personalInfo,
          template: cvData.template,
          experience: cvData.experience,
        });
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ title, cv_data: cvData, template: cvData.template })
        );
        setAutoSaveStatus("saved");
        setTimeout(() => setAutoSaveStatus("idle"), STATUS_RESET_MS);
      } catch (error) {
        logger.error("Error auto-saving CV data", error, {
          component: "useBuilderController",
          action: "autoSave",
        });
        setAutoSaveStatus("error");
        setTimeout(() => setAutoSaveStatus("idle"), ERROR_RESET_MS);
      }
    }, AUTO_SAVE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [cvData]);

  // ── Manual save ───────────────────────────────────────────────────────────
  const handleSaveResume = () => {
    try {
      const title = generateResumeTitle({
        personalInfo: cvData.personalInfo,
        template: cvData.template,
        experience: cvData.experience,
      });
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ title, cv_data: cvData, template: cvData.template })
      );
      toast.success("Resume saved!");
    } catch (error) {
      logger.error("Error saving resume", error, {
        component: "useBuilderController",
        action: "handleSaveResume",
      });
      toast.error("Failed to save resume");
    }
  };

  return {
    cvData,
    setCVData,
    autoSaveStatus,
    handleSaveResume,
  };
};

/**
 * Controller: Dashboard page
 *
 * Owns all state and actions for the Resume Dashboard.
 * The Dashboard View simply renders what this hook exposes.
 *
 * Responsibilities (MVC Controller):
 *  - Fetch resume list via the useResumes data-access hook
 *  - Handle delete with toast feedback
 *  - Provide navigation helpers
 *  - Format dates for display
 */
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useResumes } from "@/hooks/useResumes";
import { logger } from "@/utils/logger";

export const useDashboardController = () => {
  const navigate = useNavigate();
  const { resumes, loading: resumesLoading, deleteResume, fetchResumes } = useResumes();

  const handleDeleteResume = async (id: string) => {
    try {
      await deleteResume(id);
      toast.success("Resume deleted successfully");
    } catch (error) {
      logger.error("Error deleting resume", error, {
        component: "useDashboardController",
        action: "handleDeleteResume",
        resumeId: id,
      });
      toast.error("Failed to delete resume");
    }
  };

  const handleNavigateToBuilder = () => navigate("/builder");

  const handleEditResume = (id: string) => navigate(`/builder?resume=${id}`);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        logger.warn(`Invalid date string: ${dateString}`, {
          component: "useDashboardController",
          action: "formatDate",
        });
        return "Invalid Date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      logger.error("Error formatting date", error, {
        component: "useDashboardController",
        action: "formatDate",
        dateString,
      });
      return "Invalid Date";
    }
  };

  return {
    resumes,
    resumesLoading,
    fetchResumes,
    handleDeleteResume,
    handleNavigateToBuilder,
    handleEditResume,
    formatDate,
  };
};

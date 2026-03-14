import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SummarySectionProps {
  summary: string;
  updateSummary: (value: string) => void;
}

const SummarySection = ({ summary, updateSummary }: SummarySectionProps) => {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Label htmlFor="summary" className="text-sm">Professional Summary</Label>
        <Button variant="outline" size="sm" className="w-fit">
          <Sparkles className="h-3 w-3 mr-1" />
          <span className="text-xs">AI Suggest</span>
        </Button>
      </div>
      <Textarea
        id="summary"
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a brief summary highlighting your key skills and experience..."
        rows={4}
        className="text-sm"
      />
      <p className="text-xs text-muted-foreground">
        2-3 sentences about your professional background and goals
      </p>
    </div>
  );
};

export default SummarySection;

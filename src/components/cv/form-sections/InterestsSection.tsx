import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface InterestsSectionProps {
  interests: string[];
  addInterest: () => void;
  updateInterest: (index: number, value: string) => void;
  removeInterest: (index: number) => void;
}

const InterestsSection = ({ interests, addInterest, updateInterest, removeInterest }: InterestsSectionProps) => {
  return (
    <fieldset>
      <legend className="sr-only">Interests</legend>
      <div className="space-y-1.5 sm:space-y-2">
        <Label className="text-sm font-medium">Interests</Label>
        <p className="text-xs text-muted-foreground">
          Add your hobbies and personal interests
        </p>
      </div>
      {interests.map((interest, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            placeholder="e.g., Open Source, Rock Climbing, Photography"
            value={interest}
            onChange={(e) => updateInterest(index, e.target.value)}
            className="text-sm flex-1"
          />
          <Button
            onClick={() => removeInterest(index)}
            variant="outline"
            size="sm"
            className="px-2"
            aria-label={`Remove interest ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={addInterest} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Interest
      </Button>
    </fieldset>
  );
};

export default InterestsSection;

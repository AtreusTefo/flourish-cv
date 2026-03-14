import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { CVData } from "@/types/cv";

interface PersonalInfoSectionProps {
  personalInfo: CVData["personalInfo"];
  errors: { [key: string]: string };
  updatePersonalInfo: (field: string, value: string) => void;
}

const PersonalInfoSection = ({ personalInfo, errors, updatePersonalInfo }: PersonalInfoSectionProps) => {
  return (
    <fieldset>
      <legend className="sr-only">Personal Information</legend>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="fullName" className="text-sm">Full Name *</Label>
        <Input
          id="fullName"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          placeholder="John Doe"
          className={errors.fullName ? "border-red-500" : ""}
          required
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <div id="fullName-error" className="flex items-center gap-1 text-sm text-red-600" role="alert">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            <span>{errors.fullName}</span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="jobTitle" className="text-sm">Job Title</Label>
        <Input
          id="jobTitle"
          value={personalInfo.jobTitle}
          onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
          placeholder="Software Engineer"
        />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="email" className="text-sm">Email *</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo("email", e.target.value)}
          placeholder="john@example.com"
          className={errors.email ? "border-red-500" : ""}
          required
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <div id="email-error" className="flex items-center gap-1 text-sm text-red-600" role="alert">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="phone" className="text-sm">Phone</Label>
        <Input
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <div className="flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.phone}</span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="location" className="text-sm">Location</Label>
        <Input
          id="location"
          value={personalInfo.address}
          onChange={(e) => updatePersonalInfo("address", e.target.value)}
          placeholder="New York, NY"
        />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="linkedin" className="text-sm">LinkedIn</Label>
        <Input
          id="linkedin"
          value={personalInfo.linkedin}
          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
          placeholder="linkedin.com/in/johndoe"
          className={errors.linkedin ? "border-red-500" : ""}
        />
        {errors.linkedin && (
          <div className="flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.linkedin}</span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="website" className="text-sm">Website/Portfolio</Label>
        <Input
          id="website"
          value={personalInfo.website}
          onChange={(e) => updatePersonalInfo("website", e.target.value)}
          placeholder="johndoe.com"
          className={errors.website ? "border-red-500" : ""}
        />
        {errors.website && (
          <div className="flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.website}</span>
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default PersonalInfoSection;

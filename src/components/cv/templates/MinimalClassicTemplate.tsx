import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const MinimalClassicTemplate = ({ data, className = "", primaryColor = "#111827", secondaryColor = "#1F2937", id = "cv-template" }: TemplateProps) => {
  return (
    <div className={`bg-white p-12 shadow-lg font-['Roboto'] ${className}`} id={id}>
      {/* Header */}
      <div className="text-center pb-6 mb-6 border-b-2" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
          {data.personalInfo.fullName}
        </h1>
        <p className="text-lg text-gray-700 font-medium mb-3">{data.personalInfo.jobTitle}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>{data.personalInfo.email}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{data.personalInfo.address}</span>
          </div>
          {data.personalInfo.website && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{data.personalInfo.website}</span>
              </div>
            </>
          )}
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 italic mb-2">
                  {exp.company} | {exp.location}
                </p>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700 italic">{edu.institution} | {edu.location}</p>
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
            Skills
          </h2>
          <p className="text-gray-700">{data.skills.join(" • ")}</p>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
                {project.url && <p className="text-gray-600 text-sm">{project.url}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Interests */}
      <div className="grid grid-cols-2 gap-6">
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang) => (
                <p key={lang.id} className="text-gray-700">
                  <span className="font-medium">{lang.language}</span> - {lang.proficiency}
                </p>
              ))}
            </div>
          </section>
        )}

        {data.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              Interests
            </h2>
            <p className="text-gray-700">{data.interests.join(", ")}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalClassicTemplate;

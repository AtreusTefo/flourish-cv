import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const ModernBlueTemplate = ({ data, className = "", primaryColor = "#2563EB", secondaryColor = "#1E40AF" }: TemplateProps) => {
  return (
    <div className={`bg-white p-12 shadow-lg font-['Open_Sans'] ${className}`} id="cv-template">
      {/* Header */}
      <div className="border-l-4 pl-6 mb-8" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.name}</h1>
        <p className="text-xl text-gray-600 font-medium">{data.personalInfo.jobTitle}</p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" style={{ color: primaryColor }} />
          <span>{data.personalInfo.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" style={{ color: primaryColor }} />
          <span>{data.personalInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
          <span>{data.personalInfo.address}</span>
        </div>
        {data.personalInfo.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{data.personalInfo.website}</span>
          </div>
        )}
        {data.personalInfo.linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" style={{ color: primaryColor }} />
            <span>{data.personalInfo.linkedin}</span>
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="col-span-2 space-y-6">
          {/* Professional Summary */}
          {data.summary && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Work Experience
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
                    <p className="text-gray-700 font-medium mb-1">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    {project.url && (
                      <p className="text-sm" style={{ color: primaryColor }}>{project.url}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                    <p className="text-gray-600 text-xs">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ 
                      backgroundColor: primaryColor + "15",
                      color: primaryColor
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="font-medium text-gray-900 text-sm">{lang.language}</p>
                    <p className="text-gray-600 text-xs">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b-2 pb-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                Interests
              </h2>
              <p className="text-gray-700 text-sm">{data.interests.join(", ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernBlueTemplate;

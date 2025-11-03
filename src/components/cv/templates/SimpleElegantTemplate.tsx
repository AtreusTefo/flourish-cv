import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const SimpleElegantTemplate = ({ data, className = "", primaryColor = "#374151", secondaryColor = "#6B7280", id = "cv-template" }: TemplateProps) => {
  return (
    <div className={`bg-white p-12 shadow-lg font-['Open_Sans'] ${className}`} id={id}>
      {/* Minimal Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-light mb-3 tracking-tight" style={{ color: primaryColor }}>
          {data.personalInfo.name}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-6">{data.personalInfo.jobTitle}</p>
        
        {/* Contact - Horizontal List */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{data.personalInfo.address}</span>
          </div>
          {data.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="mb-10">
          <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: primaryColor }}></div>
          <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                    <p className="text-gray-700 mt-1">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mt-3">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 mt-1">{edu.institution} • {edu.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid for Skills, Projects, Languages, Interests */}
      <div className="space-y-10">
        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
              Skills
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.skills.join(" · ")}</p>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  {project.url && (
                    <p className="text-gray-500 text-sm mt-1">{project.url}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Row - Languages & Interests */}
        <div className="grid grid-cols-2 gap-8">
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <p key={lang.id} className="text-gray-700">
                    {lang.language} <span className="text-gray-500">({lang.proficiency})</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {data.interests && data.interests.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                Interests
              </h2>
              <p className="text-gray-700">{data.interests.join(", ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleElegantTemplate;

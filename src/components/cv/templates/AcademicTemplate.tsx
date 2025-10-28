import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, GraduationCap } from "lucide-react";

const AcademicTemplate = ({ data, className = "", primaryColor = "#0F172A", secondaryColor = "#1E293B" }: TemplateProps) => {
  return (
    <div className={`bg-white p-6 sm:p-8 md:p-12 shadow-lg font-['Merriweather'] ${className}`} id="cv-template">
      {/* Header - Academic Style */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 pb-4 sm:pb-6 md:pb-8 border-b-2 sm:border-b-4" style={{ borderColor: primaryColor }}>
        <div className="flex justify-center mb-3 sm:mb-4">
          <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" style={{ color: primaryColor }} />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" style={{ color: primaryColor }}>
          {data.personalInfo.name}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 italic">{data.personalInfo.jobTitle}</p>
        
        {/* Contact Info - Inline */}
        <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            {data.personalInfo.email}
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {data.personalInfo.address}
          </div>
          {data.personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {data.personalInfo.website}
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              {data.personalInfo.linkedin}
            </div>
          )}
        </div>
      </div>

      {/* Research Summary */}
      {data.summary && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Research Interests & Summary
          </h2>
          <p className="text-gray-700 leading-loose text-justify">{data.summary}</p>
        </section>
      )}

      {/* Education - Prominent */}
      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Education
          </h2>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="pl-4 border-l-4" style={{ borderColor: primaryColor + "40" }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium mt-1">{edu.institution}</p>
                    <p className="text-gray-600 text-sm mt-0.5">{edu.location}</p>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap ml-4" style={{ color: primaryColor }}>
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 italic mt-1">
                      {exp.company}, {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 leading-loose text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications/Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Publications & Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={project.id}>
                <div className="flex gap-3">
                  <span className="text-gray-400 font-semibold">[{idx + 1}]</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 mt-1 italic">{project.description}</p>
                    {project.url && (
                      <p className="text-sm mt-1" style={{ color: primaryColor }}>{project.url}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Grid - Skills, Languages, Interests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              Skills
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              {data.skills.map((skill, idx) => (
                <div key={idx}>• {skill}</div>
              ))}
            </div>
          </section>
        )}

        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              Languages
            </h2>
            <div className="space-y-1.5 text-sm">
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-gray-700">
                  <span className="font-semibold">{lang.language}</span>
                  <div className="text-xs text-gray-600">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
              Interests
            </h2>
            <p className="text-sm text-gray-700">{data.interests.join(", ")}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default AcademicTemplate;

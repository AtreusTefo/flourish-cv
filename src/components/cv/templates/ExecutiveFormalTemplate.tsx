import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const ExecutiveFormalTemplate = ({ data, className = "" }: TemplateProps) => {
  return (
    <div className={`bg-white p-12 shadow-lg font-['Roboto'] ${className}`} id="cv-template">
      {/* Header with Gray Background */}
      <div className="bg-gray-800 -mx-12 -mt-12 px-12 py-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.name}</h1>
        <p className="text-xl text-gray-300 font-light tracking-wide">{data.personalInfo.jobTitle}</p>
      </div>

      {/* Contact Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pb-6 mb-8 border-b-2 border-gray-300 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">{data.personalInfo.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">{data.personalInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">{data.personalInfo.address}</span>
        </div>
        {data.personalInfo.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{data.personalInfo.website}</span>
          </div>
        )}
        {data.personalInfo.linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{data.personalInfo.linkedin}</span>
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-sm text-gray-900">{edu.degree}</p>
                    <p className="text-xs text-gray-700 mt-1">{edu.institution}</p>
                    <p className="text-xs text-gray-600 mt-1">
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
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Core Skills
              </h2>
              <ul className="space-y-2">
                {data.skills.map((skill, idx) => (
                  <li key={idx} className="text-sm text-gray-700 pl-4 relative">
                    <span className="absolute left-0 top-2 w-2 h-2 bg-gray-800 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="font-semibold text-sm text-gray-900">{lang.language}</p>
                    <p className="text-xs text-gray-600">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Executive Summary */}
          {data.summary && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Executive Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Professional Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Key Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    {project.url && <p className="text-gray-500 text-sm">{project.url}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">
                Professional Interests
              </h2>
              <p className="text-gray-700">{data.interests.join(" • ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveFormalTemplate;

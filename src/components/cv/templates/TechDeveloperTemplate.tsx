import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, Code2 } from "lucide-react";

const TechDeveloperTemplate = ({ data, className = "" }: TemplateProps) => {
  return (
    <div className={`bg-gray-50 p-12 shadow-lg font-['Poppins'] ${className}`} id="cv-template">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 -mx-12 -mt-12 px-12 py-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Code2 className="w-10 h-10 text-white" />
          <div>
            <h1 className="text-4xl font-bold text-white">{data.personalInfo.name}</h1>
            <p className="text-xl text-emerald-100 font-light">{data.personalInfo.jobTitle}</p>
          </div>
        </div>
        
        {/* Contact */}
        <div className="flex flex-wrap gap-4 text-sm text-white/90 mt-4">
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

      {/* About */}
      {data.summary && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-emerald-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-emerald-600 rounded"></div>
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Two Column */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-600 rounded"></div>
                Work Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className={idx > 0 ? "pt-5 border-t border-gray-200" : ""}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-emerald-700 font-medium mb-2">
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
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-600 rounded"></div>
                Featured Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id} className="border-l-2 border-emerald-300 pl-4">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{project.description}</p>
                    {project.url && (
                      <p className="text-emerald-600 text-sm font-mono">{project.url}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technical Skills */}
          {data.skills.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-base font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-600 rounded"></div>
                Tech Stack
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-emerald-50 px-3 py-2 rounded text-sm text-emerald-800 font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-base font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-600 rounded"></div>
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

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-base font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-600 rounded"></div>
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

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-base font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-600 rounded"></div>
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

export default TechDeveloperTemplate;

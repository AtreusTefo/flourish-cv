import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const CreativeEdgeTemplate = ({ data, className = "" }: TemplateProps) => {
  return (
    <div className={`bg-white shadow-lg font-['Poppins'] flex ${className}`} id="cv-template">
      {/* Colored Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-8">
        {/* Personal Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
          <p className="text-purple-200 font-medium">{data.personalInfo.jobTitle}</p>
        </div>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-purple-400">Contact</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{data.personalInfo.address}</span>
            </div>
            {data.personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-purple-400">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="bg-purple-700 px-3 py-2 rounded text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-purple-400">Languages</h2>
            <div className="space-y-2 text-sm">
              {data.languages.map((lang) => (
                <div key={lang.id}>
                  <p className="font-semibold">{lang.language}</p>
                  <p className="text-purple-200">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-purple-400">Interests</h2>
            <p className="text-sm text-purple-100">{data.interests.join(", ")}</p>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 space-y-6">
        {/* Professional Summary */}
        {data.summary && (
          <section>
            <h2 className="text-xl font-bold text-purple-700 mb-3 pb-2 border-b-2 border-purple-300">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-700 mb-3 pb-2 border-b-2 border-purple-300">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-purple-200">
                  <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-purple-700 font-medium mb-2">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-700 mb-3 pb-2 border-b-2 border-purple-300">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-purple-200">
                  <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </span>
                  </div>
                  <p className="text-purple-700 font-medium">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">{edu.location}</p>
                  {edu.description && (
                    <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-700 mb-3 pb-2 border-b-2 border-purple-300">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.url && (
                    <p className="text-purple-600 text-sm">{project.url}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeEdgeTemplate;

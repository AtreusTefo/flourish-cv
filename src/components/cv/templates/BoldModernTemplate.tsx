import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase } from "lucide-react";

const BoldModernTemplate = ({ data, className = "", primaryColor = "#DC2626", secondaryColor = "#991B1B" }: TemplateProps) => {
  return (
    <div className={`bg-gray-50 shadow-lg font-['Inter'] ${className}`}>
      {/* Bold Header Section */}
      <div className="p-6 sm:p-8 md:p-12 text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 sm:border-4 border-white/30">
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 tracking-tight">{data.personalInfo.name}</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-6" style={{ color: primaryColor + "15" }}>{data.personalInfo.jobTitle}</p>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3 text-xs sm:text-sm">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 sm:p-8 md:p-12">
        {/* Summary with Accent */}
        {data.summary && (
          <section className="mb-6 sm:mb-8 md:mb-10 relative pl-4 sm:pl-0">
            <div className="absolute -left-6 sm:-left-12 top-0 w-1 sm:w-2 h-full rounded-r" style={{ backgroundColor: primaryColor }}></div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: primaryColor }}>
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* Main Content - 2/3 */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3" style={{ color: primaryColor }}>
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 rounded" style={{ backgroundColor: primaryColor }}></div>
                  Work Experience
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-l-2 sm:border-l-4" style={{ borderColor: primaryColor }}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 gap-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{exp.position}</h3>
                          <p className="font-semibold mt-1 text-sm sm:text-base" style={{ color: primaryColor }}>
                            {exp.company}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">{exp.location}</p>
                        </div>
                        <span className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap" style={{ backgroundColor: primaryColor + "15", color: primaryColor }}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: primaryColor }}>
                  <div className="w-2 h-8 rounded" style={{ backgroundColor: primaryColor }}></div>
                  Featured Projects
                </h2>
                <div className="grid gap-4">
                  {data.projects.map((project) => (
                    <div key={project.id} className="bg-white p-5 rounded-lg shadow-sm">
                      <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                      <p className="text-gray-600 mt-2">{project.description}</p>
                      {project.url && (
                        <p className="text-sm font-medium mt-2" style={{ color: primaryColor }}>{project.url}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Education */}
            {data.education.length > 0 && (
              <section className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 pb-2 sm:pb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-700 mt-1">{edu.institution}</p>
                      <p className="text-xs font-medium mt-1" style={{ color: primaryColor }}>
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4 pb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4 pb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Languages
                </h2>
                <div className="space-y-3">
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
                <h2 className="text-lg font-bold mb-4 pb-3 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Interests
                </h2>
                <p className="text-sm text-gray-700">{data.interests.join(", ")}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoldModernTemplate;

import { TemplateProps } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Linkedin, User } from "lucide-react";

const CompactProTemplate = ({ data, className = "", primaryColor = "#0891B2", secondaryColor = "#0E7490" }: TemplateProps) => {
  return (
    <div className={`bg-white shadow-lg font-['Lato'] flex ${className}`} id="cv-template">
      {/* Left Accent Bar with Icons */}
      <div className="w-8 sm:w-12 md:w-16 flex flex-col items-center py-4 sm:py-6 md:py-8 gap-3 sm:gap-4 md:gap-6" style={{ backgroundColor: primaryColor }}>
        <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
        <div className="flex-1 w-0.5 sm:w-1 bg-white/30 rounded-full"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Compact Header */}
        <div className="bg-gray-50 px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 border-b-2 sm:border-b-4" style={{ borderColor: primaryColor }}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: primaryColor }}>
                {data.personalInfo.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-700 font-medium">{data.personalInfo.jobTitle}</p>
            </div>
            <div className="sm:text-right text-xs text-gray-600 space-y-1">
              <div className="flex items-center justify-end gap-2">
                <Mail className="w-3 h-3" />
                {data.personalInfo.email}
              </div>
              <div className="flex items-center justify-end gap-2">
                <Phone className="w-3 h-3" />
                {data.personalInfo.phone}
              </div>
              <div className="flex items-center justify-end gap-2">
                <MapPin className="w-3 h-3" />
                {data.personalInfo.address}
              </div>
              {data.personalInfo.website && (
                <div className="flex items-center justify-end gap-2">
                  <Globe className="w-3 h-3" />
                  {data.personalInfo.website}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center justify-end gap-2">
                  <Linkedin className="w-3 h-3" />
                  {data.personalInfo.linkedin}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-10">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {/* Profile */}
            {data.summary && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Profile
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                        <span className="text-xs font-medium whitespace-nowrap ml-4" style={{ color: primaryColor }}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        {exp.company} | {exp.location}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Key Projects
                </h2>
                <div className="space-y-3">
                  {data.projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-bold text-sm text-gray-900">{project.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                      {project.url && (
                        <p className="text-xs mt-1" style={{ color: primaryColor }}>{project.url}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-xs text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-700 mt-1">{edu.institution}</p>
                      <p className="text-xs text-gray-600 mt-0.5">
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
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Core Skills
                </h2>
                <div className="space-y-2">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                      <span className="text-xs text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Languages
                </h2>
                <div className="space-y-2">
                  {data.languages.map((lang) => (
                    <div key={lang.id}>
                      <p className="font-semibold text-xs text-gray-900">{lang.language}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              backgroundColor: primaryColor,
                              width: lang.proficiency.toLowerCase().includes('native') || lang.proficiency.toLowerCase().includes('fluent') ? '100%' : 
                                     lang.proficiency.toLowerCase().includes('advanced') ? '80%' : 
                                     lang.proficiency.toLowerCase().includes('intermediate') ? '60%' : '40%'
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{lang.proficiency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: primaryColor, borderColor: primaryColor }}>
                  Interests
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded"
                      style={{ backgroundColor: primaryColor + "15", color: primaryColor }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactProTemplate;

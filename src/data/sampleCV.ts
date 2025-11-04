import { CVData } from "@/types/cv";

export const sampleCVData: CVData = {
  template: "modern",
  personalInfo: {
    fullName: "Sarah Johnson",
    jobTitle: "Senior Software Engineer",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    website: "www.sarahjohnson.dev",
    linkedin: "linkedin.com/in/sarahjohnson"
  },
  summary: "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and agile methodologies. Proven track record of delivering scalable solutions and leading cross-functional teams to success. Passionate about clean code, user experience, and continuous learning.",
  experience: [
    {
      id: "1",
      position: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description: "Lead development of cloud-native applications serving 2M+ users. Architected microservices infrastructure reducing deployment time by 60%. Mentor junior developers and conduct code reviews to maintain high quality standards."
    },
    {
      id: "2",
      position: "Software Engineer",
      company: "Digital Solutions Corp",
      location: "Seattle, WA",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      current: false,
      description: "Developed responsive web applications using React and Node.js. Implemented CI/CD pipelines improving release frequency by 40%. Collaborated with product team to define technical requirements and project roadmaps."
    },
    {
      id: "3",
      position: "Junior Developer",
      company: "StartUp Labs",
      location: "Portland, OR",
      startDate: "Jan 2016",
      endDate: "May 2017",
      current: false,
      description: "Built RESTful APIs and database schemas for mobile applications. Participated in agile ceremonies and contributed to sprint planning. Gained experience in modern JavaScript frameworks and cloud platforms."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2012",
      endDate: "2016",
      current: false,
      description: "GPA: 3.8/4.0. Focus on Software Engineering and Algorithms."
    }
  ],
  skills: [
    "JavaScript/TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "CI/CD",
    "Agile/Scrum"
  ],
  projects: [
    {
      id: "1",
      name: "Open Source Task Manager",
      description: "Built a collaborative task management tool with real-time updates. 500+ GitHub stars.",
      url: "github.com/sarahjohnson/task-manager"
    },
    {
      id: "2",
      name: "E-commerce Platform",
      description: "Developed scalable e-commerce solution processing 10K+ daily transactions.",
      url: "www.example-commerce.com"
    }
  ],
  languages: [
    {
      id: "1",
      language: "English",
      proficiency: "Native"
    },
    {
      id: "2",
      language: "Spanish",
      proficiency: "Professional Working"
    }
  ],
  interests: [
    "Open Source Contribution",
    "Tech Blogging",
    "Hiking",
    "Photography"
  ]
};

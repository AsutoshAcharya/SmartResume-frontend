import { ResumeForm } from "../Home/type";

export const dummyResumeData: ResumeForm = {
  id: "",
  title: "resume",
  updatedAt: new Date(),
  createdAt: new Date(),
  resume: {
    personalInfo: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+91 9876543210",
      address: "123, Main Street, New Delhi, India",
      links: ["https://github.com/janedoe", "https://linkedin.com/in/janedoe"],
    },
    experience: [
      {
        companyName: "Tech Solutions Ltd.",
        companyLocation: "Bangalore, India",
        role: "Frontend Developer",
        dateOfJoining: "2021-04-01",
        dateOfLeaving: "2023-03-31",
        isCurrentlyEmployed: false,
        descriptions: [
          "Developed and maintained UI components using React and TypeScript.",
          "Collaborated with designers to implement responsive layouts.",
          "Improved performance and accessibility across several modules.",
        ],
      },
      {
        companyName: "NextGen Tech",
        companyLocation: "Remote",
        role: "Software Engineer Intern",
        dateOfJoining: "2020-06-01",
        dateOfLeaving: "2020-12-31",
        isCurrentlyEmployed: false,
        descriptions: [
          "Built REST APIs using Node.js and Express.",
          "Created unit tests and documentation for core services.",
        ],
      },
    ],
    projects: [
      {
        title: "Portfolio Website",
        repoLink: "https://github.com/janedoe/portfolio",
        techStack: ["React", "Tailwind CSS", "Vite"],
        descriptions: [
          "Designed and built a personal portfolio site to showcase projects.",
          "Implemented dark mode and responsive design.",
        ],
        projectLink: "",
        startDate: "",
        endDate: "",
      },
      {
        title: "Task Tracker API",
        repoLink: "https://github.com/janedoe/task-tracker-api",
        techStack: ["Node.js", "Express", "MongoDB"],
        descriptions: [
          "Created a RESTful API for task tracking with user auth.",
          "Integrated MongoDB for data storage and retrieval.",
        ],
        projectLink: "",
        startDate: "",
        endDate: "",
      },
    ],
    education: [
      {
        course: "B.Tech in Computer Science",
        college: "ABC Institute of Technology",
        endDate: "2021-06-30",
        totalMarks: "10",
        markSecured: " 8.2",
        startDate: "",
      },
      {
        course: "12th Grade",
        college: "XYZ Senior Secondary School",
        endDate: "2017-03-31",
        totalMarks: "10",
        markSecured: " 8.2",
        startDate: "",
      },
    ],
    skills: [
      {
        title: "Languages",
        info: ["JavaScript", "TypeScript"],
      },
      {
        title: "Frameworks",
        info: ["Node.js", "Express.js", "Nest.js"],
      },
      {
        title: "Libraries",
        info: [
          "React.js",
          "React Query",
          "Material UI",
          "Tailwind CSS",
          "Redux",
          "Zustand",
        ],
      },
      {
        title: "Tools",
        info: ["Git", "GitHub", "Jira", "SonarQube"],
      },
      {
        title: "Web",
        info: ["HTML", "CSS3"],
      },
      {
        title: "Database",
        info: ["MongoDB"],
      },
    ],
    others: [
      {
        title: "Languages",
        info: ["English", "Hindi", "odia"],
      },
      {
        title: "Certification",
        info: ["Hackerrank Certification"],
      },
    ],
  },
};

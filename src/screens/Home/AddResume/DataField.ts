import {
  Education,
  Experience,
  Field,
  OtherInfo,
  Project,
  ResumeForm,
} from "../type";

export const emptyResumeFormData: ResumeForm = {
  id: "",
  title: "",
  resume: {
    personalInfo: {
      name: "",
      address: "",
      phone: "",
      email: "",
      links: [],
    },
    experience: [],
    projects: [],
    education: [],
    others: [],
  },
};
export const emptyExperience: Experience = {
  companyName: "",
  companyLocation: "",
  role: "",
  dateOfJoining: "",
  dateOfLeaving: "",
  isCurrentlyEmployed: false,
  descriptions: [],
};

export const emptyProject: Project = {
  title: "",
  repoLink: "",
  projectLink: "",
  startDate: "",
  endDate: "",
  descriptions: [],
  techStack: [],
};

export const emptyEducation: Education = {
  course: "",
  college: "",
  totalMarks: "",
  markSecured: "",
  startDate: "",
  endDate: "",
};
export const emptyOther: OtherInfo = {
  title: "",
  info: [],
};

export const personalInfoFields: Array<Field> = [
  {
    label: "Name",
    key: "name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    label: "Address",
    key: "address",
    type: "text",
    placeholder: "Enter address (comma separated)",
    maxLength: 100,
  },
  {
    label: "Phone Number",
    key: "phone",
    type: "number",
    placeholder: "Enter phone no.",
    maxLength: 10,
  },
  {
    label: "Email",
    key: "email",
    type: "text",
    placeholder: "Enter email",
  },
];

export const experienceInfoFields: Array<Field> = [
  {
    label: "Company Name",
    key: "companyName",
    type: "text",
    placeholder: "Enter company name",
    required: true,
  },
  {
    label: "Company Location",
    key: "companyLocation",
    type: "text",
    placeholder: "Enter company location",
  },
  {
    label: "Role",
    key: "role",
    type: "text",
    placeholder: "Enter your role",
    required: true,
  },
  {
    label: "Are You Employed In Current Company?",
    key: "isCurrentlyEmployed",
    type: "question",
    placeholder: "",
    required: false,
  },
  {
    label: "Date of Joining",
    key: "dateOfJoining",
    type: "date",
    placeholder: "",
    required: true,
  },
  {
    label: "Date of Leaving",
    key: "dateOfLeaving",
    type: "date",
    placeholder: "",
    required: false,
  },
];

export const projectFields: Array<Field> = [
  {
    label: "Project Title",
    key: "title",
    type: "text",
    required: true,
    placeholder: "Enter title",
  },
  {
    label: "Repository Link",
    key: "repoLink",
    type: "text",
    placeholder: "Provide project repository link",
  },
  {
    label: "Project Live Link",
    key: "projectLink",
    type: "text",
    placeholder: "Provide project live link",
  },
];

export const projectDateFields: Array<Field> = [
  {
    label: "Project Start Date",
    key: "startDate",
    type: "date",
    placeholder: "Enter project start date",
  },
  {
    label: "Project End Name",
    key: "endDate",
    type: "date",
    placeholder: "Enter project end date",
  },
];

export const educationDataFields: Array<Field> = [
  {
    label: "Course Taken",
    key: "course",
    type: "text",
    placeholder: "Enter course details",
    required: true,
  },
  {
    label: "College Name",
    key: "college",
    type: "text",
    placeholder: "Enter college name",
    required: true,
  },
  {
    label: "Total Marks",
    key: "totalMarks",
    type: "number",
    placeholder: "Enter total marks or total CGPA",
    maxLength: 5,
  },
  {
    label: "Marks Secured",
    key: "markSecured",
    type: "number",
    placeholder: "Enter marks secured",
    maxLength: 5,
  },
];

export const educationDateFields: Array<Field> = [
  {
    label: "Start Date",
    key: "startDate",
    placeholder: "Enter college start date",
    type: "date",
  },
  {
    label: "End Date",
    key: "endDate",
    placeholder: "Enter college end date",
    type: "date",
  },
];

export const otherFields: Array<Field> = [
  {
    label: "Other Info",
    key: "title",
    placeholder: "Enter title of other info. e.g. Skills or Language etc.",
    type: "text",
    maxLength: 15,
  },
];

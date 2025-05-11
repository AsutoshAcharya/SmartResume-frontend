import { Experience, Field, ResumeForm } from "../type";

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
    skills: {},
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
  {
    label: "Are You Employed In Current Company?",
    key: "isCurrentlyEmployed",
    type: "question",
    placeholder: "",
    required: false,
  },
];

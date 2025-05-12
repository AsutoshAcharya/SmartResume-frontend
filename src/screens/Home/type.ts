import { User } from "lucide-react";
import { ReactElement } from "react";

export type Resume = {
  id: string;
  title: string;
  updatedAt: string;
};
export enum State {
  Default = "Default",
  Edit = "Edit",
  View = "View",
  Download = "Download",
  Delete = "Delete",
}
export type Action = {
  state: State;
  Icon: ReactElement;
  onClick: () => void;
};
export type Step = {
  name: string;
  Icon: typeof User;
};
export interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  links: Array<string>;
}
export interface Experience {
  companyName: string;
  companyLocation: string;
  role: string;
  dateOfJoining: string;
  dateOfLeaving: string;
  isCurrentlyEmployed: boolean;
  descriptions: Array<string>;
}
export interface Project {
  title: string;
  repoLink: string;
  projectLink: string;
  startDate: string;
  endDate: string;
  descriptions: Array<string>;
  techStack: Array<string>;
}

export interface Education {
  course: string;
  college: string;
  range: { start: Date; end: Date };
}
export interface OtherInfo {
  title: string;
  info: Array<string>;
}
export type ResumeForm = {
  id: string;
  title: string;
  resume: {
    personalInfo: PersonalInfo;
    experience: Array<Experience>;
    projects: Array<Project>;
    skills: Record<string, Array<string>>;
    education: Array<Education>;
    others: Array<OtherInfo>;
  };
};
export type InputType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "radio"
  | "question";
export type PersonalInfoKeys = Exclude<keyof PersonalInfo, "links">;
export type ExperienceInfoKeys = Exclude<keyof Experience, "descriptions">;
export type ProjectInfoKeys = Exclude<
  keyof Project,
  "descriptions" | "techStack"
>;

export type Field = {
  label?: string;
  type: InputType;
  key: PersonalInfoKeys | ExperienceInfoKeys | ProjectInfoKeys;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
};

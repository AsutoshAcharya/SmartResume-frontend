import { useState } from "react";
import {
  User,
  Briefcase,
  BookOpen,
  Code2,
  Layers3,
  X,
  DiamondPlus,
} from "lucide-react";
import {
  Education,
  EducationKeys,
  Experience,
  OtherInfo,
  PersonalInfo as PersonalInfoType,
  Project,
  ResumeForm,
  Step,
} from "../type";
import PersonalInfo from "./PersonalInfo";
import Stepper from "./Stepper";
import Text from "../../../Components/Text";
import { Button } from "../../../Components/Button";
import {
  emptyEducation,
  emptyExperience,
  emptyOther,
  emptyProject,
  emptyResumeFormData,
} from "./DataField";
import ExperienceInfo from "./ExperienceInfo";
import ProjectInfo from "./ProjectInfo";
import EducationInfo from "./EducationInfo";
import Modal from "../../../Components/Modal";
import { useAuthStore } from "../../../store";
import OtherInformation from "./OtherInformation";
import SkillInfo from "./SkillInfo";

export const steps: Array<Step> = [
  { name: "Personal Info", Icon: User },
  { name: "Experience", Icon: Briefcase },
  { name: "Projects", Icon: Code2 },
  { name: "Education", Icon: BookOpen },
  { name: "Skills", Icon: DiamondPlus },
  { name: "Others", Icon: Layers3 },
  // { name: "Review", Icon: FileText },
];

interface Props {
  open: boolean;
  onClose: () => void;
  resumeFormData?: ResumeForm;
}

const AddResume = ({ open, onClose, resumeFormData }: Props) => {
  const [step, setStep] = useState(0);
  const { addResumeToStore } = useAuthStore();
  const [formData, setFormData] = useState<ResumeForm>(
    resumeFormData ?? emptyResumeFormData
  );
  console.warn(formData);
  const updatePersonalInfo = (
    field: keyof PersonalInfoType,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        personalInfo: {
          ...prev.resume.personalInfo,
          [field]: value,
        },
      },
    }));
  };

  function updateExperience<T extends keyof Experience>(
    index: number,
    key: T,
    value: Experience[T]
  ) {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        experience: prev.resume.experience.map((exp, i) => {
          if (i !== index) return exp;
          return { ...exp, [key]: value };
        }),
      },
    }));
  }

  function updateproject<T extends keyof Project>(
    index: number,
    key: T,
    value: Project[T]
  ) {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        projects: prev.resume.projects.map((proj, i) => {
          if (i !== index) return proj;
          return { ...proj, [key]: value };
        }),
      },
    }));
  }

  function updateEducation<T extends EducationKeys>(
    index: number,
    key: T,
    value: Education[T]
  ) {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        education: prev.resume.education.map((ed, i) => {
          if (i !== index) return ed;
          return { ...ed, [key]: value };
        }),
      },
    }));
  }

  function updateOther<T extends keyof OtherInfo>(
    index: number,
    key: T,
    value: OtherInfo[T]
  ) {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        others: prev.resume.others.map((other, i) => {
          if (i !== index) return other;
          return { ...other, [key]: value };
        }),
      },
    }));
  }

  function updateSkills<T extends keyof OtherInfo>(
    index: number,
    key: T,
    value: OtherInfo[T]
  ) {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        skills: prev.resume.skills.map((skill, i) => {
          if (i !== index) return skill;
          return { ...skill, [key]: value };
        }),
      },
    }));
  }

  function handleAddOrRemove(
    type: "add" | "remove",
    update: "experience" | "project" | "education" | "others" | "skills",
    index?: number
  ) {
    setFormData((prev) => {
      const newResume = { ...prev.resume };

      switch (update) {
        case "experience":
          newResume.experience =
            type === "add"
              ? newResume.experience.concat(emptyExperience)
              : newResume.experience.filter((_r, idx) => idx !== index);
          break;

        case "project":
          newResume.projects =
            type === "add"
              ? newResume.projects.concat(emptyProject)
              : newResume.projects.filter((_r, idx) => idx !== index);
          break;

        case "education":
          newResume.education =
            type === "add"
              ? newResume.education.concat(emptyEducation)
              : newResume.education.filter((_r, idx) => idx !== index);
          break;

        case "others":
          newResume.others =
            type === "add"
              ? newResume.others.concat(emptyOther)
              : newResume.others.filter((_r, idx) => idx !== index);
          break;
        case "skills":
          newResume.skills =
            type === "add"
              ? newResume.skills.concat(emptyOther) //same empt
              : newResume.skills.filter((_r, idx) => idx !== index);
          break;

        default:
          break;
      }

      return {
        ...prev,
        resume: newResume,
      };
    });
  }
  function handleSubmit() {
    addResumeToStore(formData);
  }

  if (!open) return <></>;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-row justify-between items-center">
        <Text children="Add Resume" weight="bold" size="xl" />
        <button
          className="rounded-full hover:bg-blue-200 text-gray-400 transition cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <Stepper steps={steps} current={step} />
        <div className="overflow-y-auto max-h-[60vh]">
          {step === 0 && (
            <PersonalInfo
              data={formData.resume.personalInfo}
              update={updatePersonalInfo}
            />
          )}
          {step === 1 && (
            <ExperienceInfo
              experiences={formData.resume.experience}
              updateExperience={updateExperience}
              addExperience={() => handleAddOrRemove("add", "experience")}
              removeExperience={(idx) => {
                handleAddOrRemove("remove", "experience", idx);
              }}
            />
          )}
          {step === 2 && (
            <ProjectInfo
              projects={formData.resume.projects}
              updateProject={updateproject}
              addProject={() => handleAddOrRemove("add", "project")}
              removeProject={(idx) => {
                handleAddOrRemove("remove", "project", idx);
              }}
            />
          )}
          {step === 3 && (
            <EducationInfo
              educations={formData.resume.education}
              updateEducation={updateEducation}
              addEducation={() => handleAddOrRemove("add", "education")}
              removeEducation={(idx) => {
                handleAddOrRemove("remove", "education", idx);
              }}
            />
          )}
          {step === 4 && (
            <SkillInfo
              skills={formData.resume.skills}
              updateSkills={updateSkills}
              addSkill={() => handleAddOrRemove("add", "skills")}
              removeSkill={(idx) => {
                handleAddOrRemove("remove", "skills", idx);
              }}
            />
          )}
          {step === 5 && (
            <OtherInformation
              others={formData.resume.others}
              updateOther={updateOther}
              addOther={() => handleAddOrRemove("add", "others")}
              removeOther={(idx) => {
                handleAddOrRemove("remove", "others", idx);
              }}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="secondary"
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            step === steps.length - 1
              ? handleSubmit()
              : setStep((prev) => prev + 1)
          }
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddResume;

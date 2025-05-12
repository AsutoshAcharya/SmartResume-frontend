import { useState } from "react";
import {
  User,
  Briefcase,
  BookOpen,
  Code2,
  Layers3,
  FileText,
  X,
} from "lucide-react";
import {
  Education,
  EducationKeys,
  Experience,
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
  emptyProject,
  emptyResumeFormData,
} from "./DataField";
import ExperienceInfo from "./ExperienceInfo";
import ProjectInfo from "./ProjectInfo";
import EducationInfo from "./EducationInfo";

export const steps: Array<Step> = [
  { name: "Personal Info", Icon: User },
  { name: "Experience", Icon: Briefcase },
  { name: "Projects", Icon: Code2 },
  { name: "Education", Icon: BookOpen },
  { name: "Skills & Others", Icon: Layers3 },
  // { name: "Review", Icon: FileText },
];

interface Props {
  open: boolean;
  onClose: () => void;
  resumeFormData?: ResumeForm;
}

const AddResume = ({ open, onClose, resumeFormData }: Props) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ResumeForm>(
    resumeFormData ?? emptyResumeFormData
  );

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

  function handleExperienceOrProjectAddOrRemove(
    type: "add" | "remove",
    update: "experience" | "project" | "education" | "others",
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

        // case "others":
        //   newResume.others =
        //     type === "add"
        //       ? newResume.others.concat(emptyOther)
        //       : newResume.others.filter((_r, idx) => idx !== index);
        //   break;

        default:
          break;
      }

      return {
        ...prev,
        resume: newResume,
      };
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg p-6 relative">
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
                addExperience={() =>
                  handleExperienceOrProjectAddOrRemove("add", "experience")
                }
                removeExperience={(idx) => {
                  handleExperienceOrProjectAddOrRemove(
                    "remove",
                    "experience",
                    idx
                  );
                }}
              />
            )}
            {step === 2 && (
              <ProjectInfo
                projects={formData.resume.projects}
                updateProject={updateproject}
                addProject={() =>
                  handleExperienceOrProjectAddOrRemove("add", "project")
                }
                removeProject={(idx) => {
                  handleExperienceOrProjectAddOrRemove(
                    "remove",
                    "project",
                    idx
                  );
                }}
              />
            )}
            {step === 3 && (
              <EducationInfo
                educations={formData.resume.education}
                updateEducation={updateEducation}
                addEducation={() =>
                  handleExperienceOrProjectAddOrRemove("add", "education")
                }
                removeEducation={(idx) => {
                  handleExperienceOrProjectAddOrRemove(
                    "remove",
                    "education",
                    idx
                  );
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
                ? onClose()
                : setStep((prev) => prev + 1)
            }
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddResume;

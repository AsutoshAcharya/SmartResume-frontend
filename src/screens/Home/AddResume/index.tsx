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

import { PersonalInfo as PersonalInfoType, ResumeForm, Step } from "../type";

import {
  emptyEducation,
  emptyExperience,
  emptyOther,
  emptyProject,
  emptyResumeFormData,
} from "./DataField";

import PersonalInfo from "./PersonalInfo";
import ExperienceInfo from "./ExperienceInfo";
import ProjectInfo from "./ProjectInfo";
import EducationInfo from "./EducationInfo";
import SkillInfo from "./SkillInfo";
import OtherInformation from "./OtherInformation";
import Stepper from "./Stepper";
import Text from "../../../Components/Text";
import Modal from "../../../Components/Modal";
import { Button } from "../../../Components/Button";
import { useAuthStore } from "../../../store";
import apiCall from "../../../helpers/apiCall";
import Resume from "../../../services/Resume";
import { toast } from "react-toastify";

export const steps: Array<Step> = [
  { name: "Personal Info", Icon: User },
  { name: "Experience", Icon: Briefcase },
  { name: "Projects", Icon: Code2 },
  { name: "Education", Icon: BookOpen },
  { name: "Skills", Icon: DiamondPlus },
  { name: "Others", Icon: Layers3 },
];

interface Props {
  open: boolean;
  onClose: () => void;
  resumeFormData?: ResumeForm;
}

const AddResume = ({ open, onClose, resumeFormData }: Props) => {
  const [step, setStep] = useState(0);
  const { cred, addResumeToStore, resumeForms } = useAuthStore();
  const [formData, setFormData] = useState<ResumeForm>(
    resumeFormData ?? emptyResumeFormData
  );

  const updateSection = <T,>(
    section: keyof ResumeForm["resume"],
    index: number,
    key: string,
    value: T
  ) => {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        [section]: (prev.resume[section] as any).map((item: any, i: number) =>
          i === index ? { ...item, [key]: value } : item
        ),
      },
    }));
  };

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

  const handleAddOrRemove = (
    type: "add" | "remove",
    section: keyof ResumeForm["resume"],
    index?: number
  ) => {
    setFormData((prev) => {
      const dataMap: Record<any, any> = {
        experience: emptyExperience,
        projects: emptyProject,
        education: emptyEducation,
        others: emptyOther,
        skills: emptyOther,
      };

      const currentArray = prev.resume[section] as any[];

      const updatedArray =
        type === "add"
          ? currentArray.concat(dataMap[section])
          : currentArray.filter((_, idx) => idx !== index);

      return {
        ...prev,
        resume: {
          ...prev.resume,
          [section]: updatedArray,
        },
      };
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...cred,
      data: {
        title: "resume",
        resume: resumeForms[0],
      },
    };

    // return console.log(formData);
    // addResumeToStore(resumeForms[0]);
    apiCall({
      fn: () => Resume.addResume(payload),
      onSuccess: () => toast.success("Resume has been added"),
      onError: (err) => toast.error(err?.message || "Something went wrong"),
      // afterCall: () => {
      //   setFormData(emptyResumeFormData);
      //   setStep(0);
      //   onClose();
      // },
    });
  };

  if (!open) return null;

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            data={formData.resume.personalInfo}
            update={updatePersonalInfo}
          />
        );
      case 1:
        return (
          <ExperienceInfo
            experiences={formData.resume.experience}
            updateExperience={(i, key, val) =>
              updateSection("experience", i, key, val)
            }
            addExperience={() => handleAddOrRemove("add", "experience")}
            removeExperience={(i) =>
              handleAddOrRemove("remove", "experience", i)
            }
          />
        );
      case 2:
        return (
          <ProjectInfo
            projects={formData.resume.projects}
            updateProject={(i, key, val) =>
              updateSection("projects", i, key, val)
            }
            addProject={() => handleAddOrRemove("add", "projects")}
            removeProject={(i) => handleAddOrRemove("remove", "projects", i)}
          />
        );
      case 3:
        return (
          <EducationInfo
            educations={formData.resume.education}
            updateEducation={(i, key, val) =>
              updateSection("education", i, key, val)
            }
            addEducation={() => handleAddOrRemove("add", "education")}
            removeEducation={(i) => handleAddOrRemove("remove", "education", i)}
          />
        );
      case 4:
        return (
          <SkillInfo
            skills={formData.resume.skills}
            updateSkills={(i, key, val) => updateSection("skills", i, key, val)}
            addSkill={() => handleAddOrRemove("add", "skills")}
            removeSkill={(i) => handleAddOrRemove("remove", "skills", i)}
          />
        );
      case 5:
        return (
          <OtherInformation
            others={formData.resume.others}
            updateOther={(i, key, val) => updateSection("others", i, key, val)}
            addOther={() => handleAddOrRemove("add", "others")}
            removeOther={(i) => handleAddOrRemove("remove", "others", i)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-row justify-between items-center mb-4">
        <Text weight="bold" size="xl">
          Add Resume
        </Text>
        <button
          className="rounded-full hover:bg-blue-200 text-gray-400 transition cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <Stepper steps={steps} current={step} />
      <div className="overflow-y-auto max-h-[60vh]">{renderStepContent()}</div>

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

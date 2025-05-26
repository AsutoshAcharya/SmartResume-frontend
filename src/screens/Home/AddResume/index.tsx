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
  PersonalInfo as PersonalInfoType,
  Resume as ResumeType,
  ResumeForm,
  Step,
  DroppableIds,
} from "../type";

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
import { useQueryClient } from "@tanstack/react-query";
import { TextField } from "../../../Components/TextField";
import { Some } from "../../../helpers/Some";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  prevResumeData?: ResumeForm;
  isViewing?: boolean;
}

const AddResume = ({ open, onClose, prevResumeData, isViewing }: Props) => {
  const [step, setStep] = useState(0);
  const { cred } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ResumeForm>(
    prevResumeData ?? emptyResumeFormData
  );
  const client = useQueryClient();
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
        title: formData.title,
        resume: formData.resume,
        ...(formData.id.length > 0 && {
          id: formData.id,
        }),
      },
    };
    const isUpdating = formData.id.length > 0;

    apiCall({
      fn: () => Resume[isUpdating ? "updateResume" : "addResume"](payload),
      onSuccess: () => {
        toast.success(
          `Resume ${isUpdating ? "updated" : "added"} successfully`
        );
        setFormData(emptyResumeFormData);
        setStep(0);
        onClose();
        client.invalidateQueries(["get-user-resumes", cred.userId]);
      },
      onError: (err) => {
        toast.error(
          Some.Array(err?.message).join(",") || "Something went wrong",
          { toastId: "err" }
        );
      },
      setLoading,
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
  function updateAfterDrop<T extends keyof Omit<ResumeType, "personalInfo">>(
    key: T,
    val: ResumeType[T]
  ) {
    setFormData({
      ...formData,
      resume: { ...formData.resume, [key]: val },
    });
  }

  const onDragEnd = <K extends keyof Omit<ResumeType, "personalInfo">>(
    result: DropResult
  ) => {
    const { source, destination } = result;
    if (!destination) return;
    const droppableId = source.droppableId as K;
    const items = [...formData.resume[droppableId]] as ResumeType[K];
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem as any);
    updateAfterDrop(droppableId, items);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-4">
          <Text weight="bold" size="xl">
            {formData.id !== "" ? "Edit Resume" : "Add Resume"}
          </Text>
          <TextField
            value={formData.title}
            placeholder="Enter Resume Title"
            type="text"
            maxLength={50}
            width={80}
            onChange={(val) => setFormData({ ...formData, title: val })}
          />
        </div>

        <button
          className="rounded-full hover:bg-blue-200 text-gray-400 transition cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <Stepper steps={steps} current={step} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>
      </DragDropContext>
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
          loading={loading}
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddResume;

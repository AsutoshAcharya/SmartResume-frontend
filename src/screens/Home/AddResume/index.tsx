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
import { PersonalInfo as PersonalInfoType, ResumeForm, Step } from "../type";
import PersonalInfo from "./PersonalInfo";
import Stepper from "./Stepper";
import Text from "../../../Components/Text";
import { Button } from "../../../Components/Button";
import { emptyExperience, emptyResumeFormData } from "./DataField";
import ExperienceInfo from "./ExperienceInfo";

export const steps: Array<Step> = [
  { name: "Personal Info", Icon: User },
  { name: "Experience", Icon: Briefcase },
  { name: "Projects", Icon: Code2 },
  { name: "Education", Icon: BookOpen },
  { name: "Skills & Others", Icon: Layers3 },
  { name: "Review", Icon: FileText },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddResume = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ResumeForm>(emptyResumeFormData);

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
  function handleExperienceAddOrRemove(type: "add" | "remove", index?: number) {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        experience:
          type === "add"
            ? prev.resume.experience.concat(emptyExperience)
            : prev.resume.experience.filter((_r, idx) => idx !== index),
      },
    }));
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
                updateExperience={(idx, key, value) => {}}
                addExperience={() => handleExperienceAddOrRemove("add")}
                removeExperience={(idx) => {
                  handleExperienceAddOrRemove("remove", idx);
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

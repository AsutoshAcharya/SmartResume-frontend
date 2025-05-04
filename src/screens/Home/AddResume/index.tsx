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
import clsx from "clsx";
import { PersonalInfo as PersonalInfoType, ResumeForm, Step } from "../type";

import PersonalInfo from "./PersonalInfo";
import Stepper from "./Stepper";
import Text from "../../../Components/Text";

export const steps: Array<Step> = [
  { name: "Personal Info", Icon: User },
  { name: "Experience", Icon: Briefcase },
  { name: "Projects", Icon: Code2 },
  { name: "Education", Icon: BookOpen },
  { name: "Skills & Others", Icon: Layers3 },
  { name: "Review", Icon: FileText },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const btnPrimaryClass =
  "bg-blue-600 text-white px-4 py-2 rounded cursor-pointer";
const btnSecondaryClass =
  "bg-gray-200 text-gray-800 px-4 py-2 rounded ursor-pointer";

const AddResume = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ResumeForm>({
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
  });

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

  if (!isOpen) return null;

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
          {step === 0 && (
            <PersonalInfo
              data={formData.resume.personalInfo}
              update={updatePersonalInfo}
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className={clsx("btn-secondary", btnSecondaryClass)}
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            className={clsx("btn-primary", btnPrimaryClass)}
            onClick={() =>
              step === steps.length - 1
                ? onClose()
                : setStep((prev) => prev + 1)
            }
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResume;

import React, { FC } from "react";
import { Template } from "./type";
import { Eye } from "lucide-react";

interface Props {
  template: Template;
  onView: () => void;
}

const TemplateCard: FC<Props> = ({ template, onView }) => {
  return (
    <div
      key={template.id}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={template.image || "/placeholder.svg"}
          alt={template.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <img
            src={template.image || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover scale-110 blur-sm"
          />
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
            <button
              onClick={onView}
              className="bg-white cursor-pointer text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="Preview template"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        <div className="absolute top-3 left-3 z-30">
          <span className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {template.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {template.name}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {template.description}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;

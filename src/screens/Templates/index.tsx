import template1Img from "../../assets/Template1.png";
import { useState } from "react";
import Modal from "../../Components/Modal";
import { X } from "lucide-react";
import Flex from "../../Components/Flex";
import { Category, Template } from "./type";
import TemplateCard from "./TemplateCard";
const templateList: Array<Template> = [
  {
    id: "template1",
    name: "Modern Professional",
    image: template1Img,
    category: "Professional",
    rating: 4.8,
    downloads: "12.5k",
    description: "Clean and modern design perfect for corporate roles",
  },
];

const categories: Array<Category> = [
  "All",
  "Professional",
  "Creative",
  "Minimal",
  "Technical",
  "Academic",
];
const Templates = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates =
    activeCategory === "All"
      ? templateList
      : templateList.filter((template) => template.category === activeCategory);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Choose Your Perfect Resume Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates to create a resume
            that stands out
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              onView={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Templates Found
            </h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>

      {isOpen && (
        <Modal open onClose={() => setIsOpen(false)}>
          <Flex
            onClick={(e) => e.stopPropagation()}
            className="items-center relative"
          >
            <div className="bg-white rounded-2xl overflow-hidden  max-w-4xl w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {templateList[photoIndex].name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {templateList[photoIndex].description}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <img
                      src={templateList[photoIndex].image || "/placeholder.svg"}
                      alt={templateList[photoIndex].name}
                      className="w-full max-h-[60vh] object-contain rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="lg:w-80 space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Template Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">
                            {templateList[photoIndex].category}
                          </span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star
                              size={16}
                              fill="currentColor"
                              className="text-yellow-500"
                            />
                            <span className="font-medium">
                              {templateList[photoIndex].rating}
                            </span>
                          </div>
                        </div> */}
                        {/* <div className="flex justify-between">
                           <span className="text-gray-600">Downloads:</span> 
                          <span className="font-medium">
                            {templateList[photoIndex].downloads}
                          </span>
                        </div> */}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* <button
                        onClick={() => {
                          handleUseTemplate(templateList[photoIndex].id);
                          setIsOpen(false);
                        }}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download size={20} />
                        Use This Template
                      </button> */}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-gray-100 text-gray-700 cursor-pointer py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Continue Browsing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Flex>
        </Modal>
      )}
    </div>
  );
};

export default Templates;

import { FC, useState } from "react";
import GenerateHTMLFromResume from "../generateHTMLFromResume";
import { useAuthStore } from "../../../store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Flex from "../../../Components/Flex";
import ResumeTemplate from "../ResumeTemplate";

interface Props {}
const TextEditor: FC<Props> = ({}) => {
  const { resumeForms } = useAuthStore();
  const html = GenerateHTMLFromResume(resumeForms[0]);
  const [value, setValue] = useState(html);

  return (
    <Flex className="justify-center items-center max-w-[40vw]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: false }}
        style={{ width: "100%", backgroundColor: "#FFF" }}
      />
      <br />
      <ResumeTemplate data={resumeForms[0]} />
    </Flex>
  );
};

export default TextEditor;

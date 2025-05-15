import { FC, useState } from "react";
import GenerateHTMLFromResume from "../generateHTMLFromResume";
import { useAuthStore } from "../../../store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Flex from "../../../Components/Flex";

interface Props {}
const TextEditor: FC<Props> = ({}) => {
  const { resumeForms } = useAuthStore();
  const html = GenerateHTMLFromResume(resumeForms[0]);
  const [value, setValue] = useState(html);

  return (
    <Flex className="justify-center items-center min-w-[70vw]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: false }}
      />
    </Flex>
  );
};

export default TextEditor;

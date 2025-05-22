import { FC } from "react";

import { useAuthStore } from "../../../store";

import "react-quill/dist/quill.snow.css";
import Flex from "../../../Components/Flex";

interface Props {}
const TextEditor: FC<Props> = ({}) => {
  // const html = GenerateHTMLFromResume(resumeForms[0]);
  // const [value, setValue] = useState(html);

  return (
    <Flex className="justify-center items-center max-w-[40vw]">
      {/* <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: false }}
        style={{ width: "100%", backgroundColor: "#FFF" }}
      />
      <br />
      <ResumeTemplate data={resumeForms[0]} /> */}
    </Flex>
  );
};

export default TextEditor;

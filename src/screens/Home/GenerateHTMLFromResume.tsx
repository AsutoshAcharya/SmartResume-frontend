import ReactDOMServer from "react-dom/server";
import ResumeTemplate from "./ResumeTemplate";
import { ResumeForm } from "./type";

const GenerateHTMLFromResume = (resumeData: ResumeForm): string => {
  return ReactDOMServer.renderToStaticMarkup(
    <ResumeTemplate data={resumeData} />
  );
};
export default GenerateHTMLFromResume;

import { User } from "lucide-react";
import Text from "../../Components/Text";
import ResumeCard from "./ResumeCard";
import SearchFIeld from "../../Components/SearchField";
import { useState } from "react";
import { Button } from "../../Components/Button";
import { useAuthStore } from "../../store";
import HomeSkeleton from "./HomeSkeleton";
import Loading from "../../Components/Loading";
import useGetResumes from "./hooks/useGetResumes";
import AddResume from "./AddResume";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { cred } = useAuthStore();
  const { data: resumeData, isFetching } = useGetResumes();

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <Text
            children={`Hello ${cred.name}`}
            weight="bold"
            size="xl"
            className="text-gray-600"
          />
          <SearchFIeld value={search} onChange={(val) => setSearch(val)} />
        </div>
        <div className="grow" />
        <div className="flex flex-row items-center justify-center gap-4">
          <Button variant="primary" onClick={() => setOpen(true)}>
            + Add Resume
          </Button>
        </div>
        <div className="flex w-13 h-13 justify-center items-center gap-4 bg-blue-300 rounded-full overflow-clip">
          {cred?.avatar ? (
            <img
              src={`${cred?.avatar}`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="text-blue-600" />
          )}
        </div>
      </div>
      <Loading
        loading={isFetching}
        className="flex grow"
        Loader={<HomeSkeleton />}
      >
        <div className="w-full">
          <div className="p-4 grid grid-cols-3 place-content-center gap-4 w-full">
            {resumeData.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onEdit={() => {}}
                onView={() => {}}
                onDownload={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      </Loading>

      {open && <AddResume open={open} onClose={() => setOpen(false)} />}

      {/* <PDFDownloadLink
        document={<ExportToPdf data={resumeForms[0]} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (loading ? "Loading..." : "Download Resume")}
      </PDFDownloadLink> */}
    </div>
  );
};

export default Home;

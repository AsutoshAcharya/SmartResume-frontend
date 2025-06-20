import { User } from "lucide-react";
import Text from "../../Components/Text";
import ResumeCard from "./ResumeCard";
import { useMemo, useState } from "react";
import { Button } from "../../Components/Button";
import { useAuthStore } from "../../store";
import HomeSkeleton from "./HomeSkeleton";
import Loading from "../../Components/Loading";
import useGetResumes from "./hooks/useGetResumes";
import AddResume from "./AddResume";
import SearchField from "../../Components/SearchField";
import Flex from "../../Components/Flex";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { cred } = useAuthStore();
  const { data: resumeData, isFetching } = useGetResumes();

  const filteredResumes = useMemo(() => {
    if (!resumeData) return [];
    return resumeData.filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [resumeData]);
  console.log(filteredResumes);
  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <Text
            children={`Hello ${cred.name}`}
            weight="bold"
            size="xl"
            className="text-gray-600 w-fit"
          />
          <SearchField
            placeholder="Search Resumes..."
            value={search}
            onChange={(val) => setSearch(val)}
          />
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
        className="flex grow min-h-0  overflow-y-auto blue-scrollbar"
        Loader={<HomeSkeleton />}
      >
        {filteredResumes.length !== 0 ? (
          <div className="w-full">
            <div className="p-4 grid grid-cols-3 place-content-center gap-4 w-full ">
              {filteredResumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        ) : (
          <Flex className="grow -1 text-gray-500 font-bold justify-center items-center">
            No Resume Found
          </Flex>
        )}
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

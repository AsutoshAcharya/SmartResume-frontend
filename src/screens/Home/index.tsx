import { User } from "lucide-react";
import Text from "../../Components/Text";
import ResumeCard from "./ResumeCard";
import SearchFIeld from "../../Components/SearchField";
import { useState } from "react";
import AddResume from "./AddResume";
import { Button } from "../../Components/Button";
import { useAuthStore } from "../../store";
import ResumeTemplate from "./ResumeTemplate";
import TextEditor from "./TextEditor";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { cred, resumeForms } = useAuthStore();
  return (
    <div className="h-full p-4">
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
      <div className="p-4 grid grid-cols-2 place-content-center gap-4">
        <ResumeCard
          title="Frontend Developer Resume"
          updatedAt="May 2, 2025"
          onEdit={() => {}}
          onView={() => {}}
          onDownload={() => {}}
          onDelete={() => {}}
        />
      </div>
      <TextEditor />
      <AddResume open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Home;

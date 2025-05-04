import { User } from "lucide-react";
import Text from "../../Components/Text";
import ResumeCard from "./ResumeCard";
import SearchFIeld from "../../Components/SearchField";
import { useState } from "react";
import AddResume from "./AddResume";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-4">
          <Text
            children="Hello,John"
            weight="bold"
            size="xl"
            className="text-gray-600"
          />
          <SearchFIeld value={search} onChange={(val) => setSearch(val)} />
        </div>
        <div className="flex w-7 h-7 justify-center items-center bg-blue-300 rounded-full">
          <User className="text-blue-600" />
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
      <AddResume isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default Home;

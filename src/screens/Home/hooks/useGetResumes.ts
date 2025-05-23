import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Resume as ResumeType, ResumeForm } from "../type";
import { useAuthStore } from "../../../store";
import Resume from "../../../services/Resume";
import { Some } from "../../../helpers/Some";

type Options = Omit<
  UseQueryOptions<Array<any>, unknown, Array<ResumeForm>, Array<string>>,
  "initialData"
>;

function useGetResumes(options: Options = {}) {
  const { cred } = useAuthStore();

  function toResume(d: Record<string, any>): ResumeForm {
    return {
      id: Some.String(d?._id),
      title: Some.String(d?.title),
      resume: d?.resume as ResumeType,
      updatedAt: new Date(d?.updatedAt),
    };
  }
  async function getAllUserSpecificResume() {
    const resp = await Resume.getResumesByUserId({ ...cred });
    console.log(resp);
    return Some.Array(resp?.data);
  }
  return useQuery({
    queryKey: ["get-user-resumes", cred.userId],
    queryFn: getAllUserSpecificResume,
    refetchOnWindowFocus: false,
    initialData: [],
    select: (d) => d.map(toResume),
    ...options,
  });
}

export default useGetResumes;

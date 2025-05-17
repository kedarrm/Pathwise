import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export const metadata = {
  title: "AI Career Coach | Resume Builder",
  description: "Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.",
};

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
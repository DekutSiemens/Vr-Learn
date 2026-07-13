import InstructorLessonsList from "@/components/instructor/InstructorLessonsList";
import "@/styles/instructorModule.css";

type PageProps = {
  params: Promise<{ id: string; moduleId: string }>;
};

export default async function InstructorLessonsPage({ params }: PageProps) {
  const { id, moduleId } = await params;

  return <InstructorLessonsList appId={id} moduleId={moduleId} />;
}

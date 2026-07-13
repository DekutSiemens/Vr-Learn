import LessonForm from "@/components/instructor/LessonForm";
import "@/styles/instructor.css";

type PageProps = {
  params: Promise<{ id: string; moduleId: string }>;
};

export default async function NewLessonPage({ params }: PageProps) {
  const { id, moduleId } = await params;

  return (
    <div className="instructor-dashboard-page">
      <LessonForm appId={id} moduleId={moduleId} />
    </div>
  );
}

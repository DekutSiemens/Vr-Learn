import EditLessonLoader from "./EditLessonLoader";
import "@/styles/instructor.css";

type PageProps = {
  params: Promise<{ id: string; moduleId: string; lessonId: string }>;
};

export default async function EditLessonPage({ params }: PageProps) {
  const { id, moduleId, lessonId } = await params;

  return (
    <div className="instructor-dashboard-page">
      <EditLessonLoader appId={id} moduleId={moduleId} lessonId={lessonId} />
    </div>
  );
}

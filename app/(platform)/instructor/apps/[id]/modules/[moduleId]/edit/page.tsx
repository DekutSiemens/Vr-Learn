import EditModuleLoader from "./EditModuleLoader";
import "@/styles/instructor.css";

type PageProps = {
  params: Promise<{ id: string; moduleId: string }>;
};

export default async function EditModulePage({ params }: PageProps) {
  const { id, moduleId } = await params;

  return (
    <div className="instructor-dashboard-page">
      <EditModuleLoader appId={id} moduleId={moduleId} />
    </div>
  );
}

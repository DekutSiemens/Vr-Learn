import ModuleForm from "@/components/instructor/ModuleForm";
import "@/styles/instructor.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewModulePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="instructor-dashboard-page">
      <ModuleForm appId={id} />
    </div>
  );
}

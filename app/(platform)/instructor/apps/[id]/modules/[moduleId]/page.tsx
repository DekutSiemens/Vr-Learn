import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string; moduleId: string }>;
};

export default async function InstructorModulePage({ params }: PageProps) {
  const { id, moduleId } = await params;

  redirect(`/instructor/apps/${id}/modules/${moduleId}/lessons`);
}

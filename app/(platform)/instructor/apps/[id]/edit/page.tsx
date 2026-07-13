import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditInstructorAppPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/instructor/apps/${id}`);
}

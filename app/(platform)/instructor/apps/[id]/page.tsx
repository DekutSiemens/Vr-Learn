import InstructorAppDetails from "@/components/instructor/InstructorAppDetails";
import "@/styles/instructorSingleApp.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InstructorSingleAppPage({ params }: PageProps) {
  const { id } = await params;

  return <InstructorAppDetails appId={id} />;
}

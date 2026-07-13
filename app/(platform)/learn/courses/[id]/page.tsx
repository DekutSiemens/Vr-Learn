import LearnerCourseDetails from "@/components/learn/LearnerCourseDetails";
import "@/styles/singleApp.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LearnerCoursePage({ params }: PageProps) {
  const { id } = await params;

  return <LearnerCourseDetails slug={id} />;
}

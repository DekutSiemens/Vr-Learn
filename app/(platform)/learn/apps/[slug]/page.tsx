import LearnerCourseDetails from "@/components/learn/LearnerCourseDetails";
import "@/styles/singleApp.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SingleLearningAppPage({ params }: PageProps) {
  const { slug } = await params;

  return <LearnerCourseDetails slug={slug} />;
}

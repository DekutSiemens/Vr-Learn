import LearnerModuleDetails from "@/components/learn/LearnerModuleDetails";
import "@/styles/module.css";

type PageProps = {
  params: Promise<{ slug: string; modulesSlug: string }>;
};

export default async function LearningModulePage({ params }: PageProps) {
  const { slug, modulesSlug } = await params;

  return <LearnerModuleDetails slug={slug} moduleId={modulesSlug} />;
}

"use client";

import { useEffect, useState } from "react";
import ModuleForm from "@/components/instructor/ModuleForm";
import { instructorModulesApi } from "@/lib/api/services";
import type { LearningModule } from "@/lib/api/types";

type EditModuleLoaderProps = {
  appId: string;
  moduleId: string;
};

export default function EditModuleLoader({
  appId,
  moduleId,
}: EditModuleLoaderProps) {
  const [module, setModule] = useState<LearningModule | null>(null);

  useEffect(() => {
    const loadModule = async () => {
      setModule((await instructorModulesApi.get(moduleId)) ?? null);
    };

    void loadModule();
  }, [moduleId]);

  if (!module) {
    return <p className="instructor-muted-message">Loading module...</p>;
  }

  return <ModuleForm appId={appId} module={module} />;
}

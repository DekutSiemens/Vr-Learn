"use client";

import { useEffect, useState } from "react";
import LessonForm from "@/components/instructor/LessonForm";
import { instructorLessonsApi } from "@/lib/api/services";
import type { LearningLesson } from "@/lib/api/types";

type EditLessonLoaderProps = {
  appId: string;
  moduleId: string;
  lessonId: string;
};

export default function EditLessonLoader({
  appId,
  moduleId,
  lessonId,
}: EditLessonLoaderProps) {
  const [lesson, setLesson] = useState<LearningLesson | null>(null);

  useEffect(() => {
    const loadLesson = async () => {
      setLesson((await instructorLessonsApi.get(lessonId)) ?? null);
    };

    void loadLesson();
  }, [lessonId]);

  if (!lesson) {
    return <p className="instructor-muted-message">Loading lesson...</p>;
  }

  return <LessonForm appId={appId} moduleId={moduleId} lesson={lesson} />;
}

import type {
  LearningLesson,
  LearningModule,
  LessonPayload,
  ModulePayload,
} from "./types";

const MODULES_KEY = "vr_learn_mock_modules";
const LESSONS_KEY = "vr_learn_mock_lessons";

const readStored = <T>(key: string, fallback: T[]): T[] => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = window.localStorage.getItem(key);

  if (!value) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(value) as T[];
  } catch {
    return fallback;
  }
};

const writeStored = <T>(key: string, value: T[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const defaultModules: LearningModule[] = [
  {
    id: "m1",
    appId: "1",
    title: "Introduction to Fluid Power System Lab",
    description: "Foundation concepts and lab workflow.",
    order: 1,
    status: "Published",
    lessons: 2,
  },
  {
    id: "m2",
    appId: "1",
    title: "pH Test Module",
    description: "Guided content for pH testing procedure.",
    order: 2,
    status: "Draft",
    lessons: 1,
  },
];

const defaultLessons: LearningLesson[] = [
  {
    id: "lesson-1",
    moduleId: "m1",
    title: "Introduction to the pH Meter",
    description: "Understand the parts and role of the pH meter.",
    order: 1,
    status: "Published",
    content: "Review the purpose, parts, and safe handling of the pH meter.",
  },
  {
    id: "lesson-2",
    moduleId: "m1",
    title: "Prepare the Buffer Solution",
    description: "Set up the right solution for calibration.",
    order: 2,
    status: "Draft",
    content: "Prepare calibration buffer and avoid sample contamination.",
  },
  {
    id: "lesson-3",
    moduleId: "m2",
    title: "Calibrate the Meter",
    description: "Perform accurate calibration step by step.",
    order: 1,
    status: "Draft",
    content: "Wait for stable readings and confirm calibration points.",
  },
];

const nextId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const mockModulesStore = {
  list(appId: string) {
    const lessons = readStored<LearningLesson>(LESSONS_KEY, defaultLessons);

    return readStored<LearningModule>(MODULES_KEY, defaultModules)
      .filter((module) => module.appId === appId)
      .map((module) => ({
        ...module,
        lessons: lessons.filter((lesson) => lesson.moduleId === module.id).length,
      }))
      .sort((a, b) => a.order - b.order);
  },
  get(moduleId: string) {
    return readStored<LearningModule>(MODULES_KEY, defaultModules).find(
      (module) => module.id === moduleId,
    );
  },
  create(appId: string, payload: ModulePayload) {
    const modules = readStored<LearningModule>(MODULES_KEY, defaultModules);
    const learningModule: LearningModule = {
      id: nextId("module"),
      appId,
      title: payload.title,
      description: payload.description,
      order:
        payload.order ??
        modules.filter((item) => item.appId === appId).length + 1,
      status: payload.status ?? "Draft",
      lessons: 0,
    };

    writeStored(MODULES_KEY, [...modules, learningModule]);
    return learningModule;
  },
  update(moduleId: string, payload: ModulePayload) {
    const modules = readStored<LearningModule>(MODULES_KEY, defaultModules);
    let updated: LearningModule | undefined;

    writeStored(
      MODULES_KEY,
      modules.map((module) => {
        if (module.id !== moduleId) {
          return module;
        }

        updated = {
          ...module,
          title: payload.title,
          description: payload.description,
          order: payload.order ?? module.order,
          status: payload.status ?? module.status,
        };

        return updated;
      }),
    );

    return updated;
  },
  delete(moduleId: string) {
    writeStored(
      MODULES_KEY,
      readStored<LearningModule>(MODULES_KEY, defaultModules).filter(
        (module) => module.id !== moduleId,
      ),
    );
    writeStored(
      LESSONS_KEY,
      readStored<LearningLesson>(LESSONS_KEY, defaultLessons).filter(
        (lesson) => lesson.moduleId !== moduleId,
      ),
    );
  },
};

export const mockLessonsStore = {
  list(moduleId: string) {
    return readStored<LearningLesson>(LESSONS_KEY, defaultLessons)
      .filter((lesson) => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  },
  get(lessonId: string) {
    return readStored<LearningLesson>(LESSONS_KEY, defaultLessons).find(
      (lesson) => lesson.id === lessonId,
    );
  },
  create(moduleId: string, payload: LessonPayload) {
    const lessons = readStored<LearningLesson>(LESSONS_KEY, defaultLessons);
    const lesson: LearningLesson = {
      id: nextId("lesson"),
      moduleId,
      title: payload.title,
      description: payload.description,
      order:
        payload.order ??
        lessons.filter((item) => item.moduleId === moduleId).length + 1,
      status: payload.status ?? "Draft",
      videoUrl: payload.videoUrl,
      documentUrl: payload.documentUrl,
      content: payload.content,
    };

    writeStored(LESSONS_KEY, [...lessons, lesson]);
    return lesson;
  },
  update(lessonId: string, payload: LessonPayload) {
    const lessons = readStored<LearningLesson>(LESSONS_KEY, defaultLessons);
    let updated: LearningLesson | undefined;

    writeStored(
      LESSONS_KEY,
      lessons.map((lesson) => {
        if (lesson.id !== lessonId) {
          return lesson;
        }

        updated = {
          ...lesson,
          title: payload.title,
          description: payload.description,
          order: payload.order ?? lesson.order,
          status: payload.status ?? lesson.status,
          videoUrl: payload.videoUrl,
          documentUrl: payload.documentUrl,
          content: payload.content,
        };

        return updated;
      }),
    );

    return updated;
  },
  delete(lessonId: string) {
    writeStored(
      LESSONS_KEY,
      readStored<LearningLesson>(LESSONS_KEY, defaultLessons).filter(
        (lesson) => lesson.id !== lessonId,
      ),
    );
  },
};

export type UserRole = "USER" | "DEVELOPER" | "REVIEWER" | "ADMIN";

export type AuthUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  role: UserRole;
  developerEnabled?: boolean;
  developer?: {
    id: string;
    organizationName?: string;
    isVerified?: boolean;
  };
};

export type ApiListResponse<T> = T[] | { data?: T[]; items?: T[]; results?: T[] };

export type ApiApp = {
  id?: string | number;
  _id?: string;
  slug?: string;
  title?: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  iconUrl?: string | null;
  icon?: string | null;
  heroImageUrl?: string | null;
  screenshots?: string[] | null;
  status?: string;
  published?: boolean;
  modulesCount?: number;
  lessonsCount?: number;
  modules?: unknown[] | number;
  lessons?: unknown[] | number;
  updatedAt?: string;
  progress?: LearningApp["progress"];
};

export type LearningApp = {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconUrl?: string;
  heroImageUrl?: string;
  status: string;
  modules: number;
  lessons: number;
  updatedAt?: string;
  progress?: {
    totalLessons: number;
    completedLessons: number;
    percent: number;
    selected?: boolean;
  };
};

export type AppPayload = {
  title: string;
  description: string;
  status?: string;
};

export type LearningModule = {
  id: string;
  appId: string;
  title: string;
  description: string;
  order: number;
  status: string;
  lessons: number;
};

export type ModulePayload = {
  title: string;
  description: string;
  order?: number;
  status?: string;
};

export type LearningLesson = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  status: string;
  videoUrl?: string;
  documentUrl?: string;
  content?: string;
};

export type ContinueLearning = {
  app: LearningApp;
  lesson: {
    id: string;
    title: string;
    description: string;
    moduleId: string;
    moduleTitle: string;
  } | null;
  progress: {
    totalLessons: number;
    completedLessons: number;
    percent: number;
    complete: boolean;
  };
  resumeUrl: string;
};

export type LearnerDashboard = {
  apps: LearningApp[];
  continueLearning: ContinueLearning | null;
  stats: {
    availableApps: number;
    selectedApps: number;
    totalLessons: number;
    completedLessons: number;
    overallPercent: number;
  };
};

export type LessonPayload = {
  title: string;
  description: string;
  order?: number;
  status?: string;
  videoUrl?: string;
  documentUrl?: string;
  content?: string;
};

export const normalizeApp = (app: ApiApp): LearningApp => {
  const id = String(app.id ?? app._id ?? app.slug ?? "");
  const title = app.title ?? app.name ?? "Untitled app";
  const iconUrl = resolveAssetUrl(app.iconUrl ?? app.icon);
  const heroImageUrl = resolveAssetUrl(app.heroImageUrl ?? app.screenshots?.[0]);
  const slug =
    app.slug ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return {
    id,
    slug,
    title,
    description: app.description ?? app.shortDescription ?? "",
    iconUrl,
    heroImageUrl,
    status: app.status ?? (app.published ? "Published" : "Draft"),
    modules: app.modulesCount ?? countItems(app.modules),
    lessons: app.lessonsCount ?? countItems(app.lessons),
    updatedAt: app.updatedAt,
    progress: app.progress,
  };
};

function countItems(value: unknown[] | number | undefined) {
  if (Array.isArray(value)) {
    return value.length;
  }

  return Number(value ?? 0);
}

export function resolveAssetUrl(path: string | null | undefined): string | undefined {
  if (!path) {
    return undefined;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const lowerPath = cleanPath.toLowerCase();

  if (lowerPath.startsWith("public/") || lowerPath.startsWith("uploads/")) {
    return `${baseUrl}/${cleanPath}`;
  }

  if (
    lowerPath.startsWith("icons/") ||
    lowerPath.startsWith("hero/") ||
    lowerPath.startsWith("screens/")
  ) {
    return `${baseUrl}/public/${cleanPath}`;
  }

  return `${baseUrl}/uploads/${cleanPath}`;
}

export const listFromResponse = <T>(response: ApiListResponse<T>): T[] => {
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected API response format:", response);

  return response.data ?? response.items ?? response.results ?? [];
};

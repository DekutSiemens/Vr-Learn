import { apiRequest } from "./client";
import type {
  ApiApp,
  AppPayload,
  AuthUser,
  LearnerDashboard,
  LearningApp,
  LearningLesson,
  LearningModule,
  LessonPayload,
  ModulePayload,
} from "./types";
import { listFromResponse, normalizeApp } from "./types";

type ApiLearningModule = {
  id?: string | number;
  appId?: string | number;
  title?: string;
  description?: string;
  order?: number;
  orderIndex?: number;
  status?: string;
  lessons?: number | unknown[];
  lessonsCount?: number;
  _count?: {
    lessons?: number;
  };
};

type ApiLearningLesson = {
  id?: string | number;
  moduleId?: string | number;
  title?: string;
  description?: string;
  content?: string | null;
  videoUrl?: string | null;
  documentUrl?: string | null;
  order?: number;
  orderIndex?: number;
  status?: string;
};

const countLessons = (lessons?: number | unknown[]) =>
  Array.isArray(lessons) ? lessons.length : Number(lessons ?? 0);

const normalizeModule = (module: ApiLearningModule): LearningModule => ({
  id: String(module.id),
  appId: String(module.appId),
  title: module.title ?? "Untitled module",
  description: module.description ?? "",
  order: Number(module.order ?? module.orderIndex ?? 1),
  status: module.status ?? "Draft",
  lessons: countLessons(module.lessons ?? module.lessonsCount ?? module._count?.lessons),
});

const normalizeLesson = (lesson: ApiLearningLesson): LearningLesson => ({
  id: String(lesson.id),
  moduleId: String(lesson.moduleId),
  title: lesson.title ?? "Untitled lesson",
  description: lesson.description ?? "",
  content: lesson.content ?? undefined,
  videoUrl: lesson.videoUrl ?? undefined,
  documentUrl: lesson.documentUrl ?? undefined,
  order: Number(lesson.order ?? lesson.orderIndex ?? 1),
  status: lesson.status ?? "Draft",
});

export const authApi = {
  me() {
    return apiRequest<AuthUser>("/auth/me");
  },
};

type AdminUsersResponse = {
  users: AuthUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const adminUsersApi = {
  async listLearners() {
    const response = await apiRequest<AdminUsersResponse>(
      "/admin/users?role=USER",
    );

    return response.users;
  },
};

export const publicAppsApi = {
  async list() {
    const response = await apiRequest<unknown>("/public/apps", {
      protected: false,
    });

    return listFromResponse(response as ApiApp[]).map(normalizeApp);
  },
  async get(slug: string) {
    const response = await apiRequest<ApiApp>(`/public/apps/${slug}`, {
      protected: false,
    });

    return normalizeApp(response);
  },
  async listModules(slug: string) {
    const response = await apiRequest<unknown>(`/public/apps/${slug}/modules`, {
      protected: false,
    });

    return listFromResponse(response as ApiLearningModule[]).map(normalizeModule);
  },
  async getModule(moduleId: string) {
    const response = await apiRequest<ApiLearningModule>(`/public/apps/modules/${moduleId}`, {
      protected: false,
    });

    return normalizeModule(response);
  },
  async listLessons(moduleId: string) {
    const response = await apiRequest<ApiLearningLesson>(
      `/public/apps/modules/${moduleId}/lessons`,
      { protected: false },
    );

    return listFromResponse(response as ApiLearningLesson[]).map(normalizeLesson);
  },
};

export const learnerProgressApi = {
  async dashboard() {
    const response = await apiRequest<LearnerDashboard>("/learn/progress");

    return {
      ...response,
      apps: response.apps.map(normalizeApp),
      continueLearning: response.continueLearning
        ? {
            ...response.continueLearning,
            app: normalizeApp(response.continueLearning.app),
          }
        : null,
    };
  },
  async selectApp(appId: string) {
    const response = await apiRequest<LearnerDashboard>(
      `/learn/progress/apps/${appId}/select`,
      {
        method: "POST",
      },
    );

    return {
      ...response,
      apps: response.apps.map(normalizeApp),
      continueLearning: response.continueLearning
        ? {
            ...response.continueLearning,
            app: normalizeApp(response.continueLearning.app),
          }
        : null,
    };
  },
  async completeLesson(lessonId: string) {
    const response = await apiRequest<LearnerDashboard>(
      `/learn/progress/lessons/${lessonId}/complete`,
      {
        method: "POST",
      },
    );

    return response;
  },
  async listCompletedLessons(moduleId: string) {
    const response = await apiRequest<{ lessonIds: string[] }>(
      `/learn/progress/modules/${moduleId}/completed-lessons`,
    );

    return response.lessonIds;
  },
};

export const instructorAppsApi = {
  async list() {
    const response = await apiRequest<unknown>("/developer/apps");

    return listFromResponse(response as ApiApp[]).map(normalizeApp);
  },
  async create(payload: AppPayload) {
    const response = await apiRequest<ApiApp>("/developer/apps", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return normalizeApp(response);
  },
  async get(id: string) {
    const response = await apiRequest<ApiApp>(`/developer/apps/${id}`);

    return normalizeApp(response);
  },
  async update(id: string, payload: AppPayload) {
    const response = await apiRequest<ApiApp>(`/developer/apps/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return normalizeApp(response);
  },
  async getListingDraft(id: string) {
    return apiRequest<Record<string, unknown>>(
      `/developer/apps/${id}/listing-draft`,
    );
  },
  async updateListingDraft(id: string, payload: Record<string, unknown>) {
    return apiRequest<Record<string, unknown>>(
      `/developer/apps/${id}/listing-draft`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );
  },
  async delete(id: string) {
    try {
      await apiRequest<void>(`/developer/apps/${id}`, {
        method: "DELETE",
      });
    } catch {
      await apiRequest<ApiApp>(`/developer/apps/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Archived" }),
      });
    }
  },
};

export const instructorModulesApi = {
  async list(appId: string) {
    const response = await apiRequest<unknown>(`/developer/apps/${appId}/modules`);

    return listFromResponse(response as ApiLearningModule[]).map(normalizeModule);
  },
  async create(appId: string, payload: ModulePayload) {
    const response = await apiRequest<ApiLearningModule>(`/developer/apps/${appId}/modules`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return normalizeModule(response);
  },
  async get(moduleId: string) {
    const response = await apiRequest<ApiLearningModule>(`/developer/apps/modules/${moduleId}`);

    return normalizeModule(response);
  },
  async update(moduleId: string, payload: ModulePayload) {
    const response = await apiRequest<ApiLearningModule>(`/developer/apps/modules/${moduleId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return normalizeModule(response);
  },
  async delete(moduleId: string) {
    await apiRequest<void>(`/developer/apps/modules/${moduleId}`, {
      method: "DELETE",
    });
  },
};

export const instructorLessonsApi = {
  async list(moduleId: string) {
    const response = await apiRequest<ApiLearningLesson>(
      `/developer/apps/modules/${moduleId}/lessons`,
    );

    return listFromResponse(response as ApiLearningLesson[]).map(normalizeLesson);
  },
  async create(moduleId: string, payload: LessonPayload) {
    const response = await apiRequest<ApiLearningLesson>(
      `/developer/apps/modules/${moduleId}/lessons`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    return normalizeLesson(response);
  },
  async get(lessonId: string) {
    const response = await apiRequest<ApiLearningLesson>(`/developer/apps/lessons/${lessonId}`);

    return normalizeLesson(response);
  },
  async update(lessonId: string, payload: LessonPayload) {
    const response = await apiRequest<ApiLearningLesson>(`/developer/apps/lessons/${lessonId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return normalizeLesson(response);
  },
  async delete(lessonId: string) {
    await apiRequest<void>(`/developer/apps/lessons/${lessonId}`, {
      method: "DELETE",
    });
  },
};

export const formatAppStatus = (app: LearningApp) =>
  app.status || "Draft";

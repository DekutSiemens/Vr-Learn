const TOKEN_KEY = "vr_learn_token";

const readCookie = (name: string) => {
  if (typeof document === "undefined") {
    return null;
  }

  return (
    document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? null
  );
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const tokenStorage = {
  get() {
    if (typeof window === "undefined") {
      return null;
    }

    const token =
      readCookie("token") ??
      window.localStorage.getItem(TOKEN_KEY) ??
      window.localStorage.getItem("token") ??
      window.localStorage.getItem("accessToken") ??
      window.localStorage.getItem("jwt");

    return token ? decodeURIComponent(token) : null;
  },
  set(token: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  },
  clear() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  },
};

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new ApiError("NEXT_PUBLIC_API_URL is not configured.", 500);
  }

  return baseUrl.replace(/\/$/, "");
};

const readMessage = async (response: Response) => {
  const text = await response.text();

  if (!text) {
    return response.statusText || "Request failed.";
  }

  try {
    const parsed = JSON.parse(text) as {
      message?: string;
      error?: string;
      errors?: unknown;
    };

    return (
      parsed.message ??
      parsed.error ??
      (Array.isArray(parsed.errors) ? parsed.errors.join(", ") : undefined) ??
      text
    );
  } catch {
    return text;
  }
};

type RequestOptions = RequestInit & {
  protected?: boolean;
};

export const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> => {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = tokenStorage.get();

  if (options.protected !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(await readMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

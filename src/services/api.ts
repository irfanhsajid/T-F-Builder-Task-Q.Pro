/**
 * API Service Layer
 * All external API calls are centralized here.
 */

import type { Todo, User } from "@/types/todos";

const BASE_URL = "https://jsonplaceholder.typicode.com";

/** JSONPlaceholder (json-server) query params for /todos. */
export type FetchTodosPageParams = {
  /** When omitted, the request is unpaged: no `_page` / `_limit` (full result set for current filters). */
  page?: number;
  limit?: number;
  userId?: string;
  status?: "completed" | "pending";
  search?: string;
};

export const api = {
  /**
   * Todos with server-side filters (see
   * https://jsonplaceholder.typicode.com/todos?_page=1&_limit=20&userId=1&completed=true ).
   * Pass `page` + `limit` for pagination; omit both to fetch all matching rows (no cap).
   * Total row count comes from the `X-Total-Count` response header when present.
   */
  async fetchTodosPage(params: FetchTodosPageParams): Promise<{
    todos: Todo[];
    total: number;
  }> {
    const sp = new URLSearchParams();
    const paginated =
      params.page !== undefined && params.limit !== undefined;
    if (paginated) {
      sp.set("_page", String(params.page));
      sp.set("_limit", String(params.limit));
    }
    if (params.userId) sp.set("userId", params.userId);
    if (params.status === "completed") sp.set("completed", "true");
    if (params.status === "pending") sp.set("completed", "false");
    const q = params.search?.trim();
    if (q) sp.set("q", q);

    const res = await fetch(`${BASE_URL}/todos?${sp.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    const todos: Todo[] = await res.json();
    const totalHeader = res.headers.get("X-Total-Count");
    const total =
      totalHeader !== null && totalHeader !== ""
        ? Number.parseInt(totalHeader, 10)
        : todos.length;
    return { todos, total: Number.isFinite(total) ? total : todos.length };
  },

  async fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
};

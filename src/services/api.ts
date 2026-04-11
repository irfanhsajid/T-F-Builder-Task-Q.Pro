/**
 * API Service Layer
 * All external API calls are centralized here.
 */

import type { Todo, User } from "@/features/todos/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  async fetchTodos(): Promise<Todo[]> {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  },

  async fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
};

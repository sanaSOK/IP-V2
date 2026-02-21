import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3100';
        const res = await fetch(`${apiBase}/tasks`);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        this.todos = data;
      } catch (err) {
        console.error(err);
      }
    },
    async toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex < 0) return;
      const todo = this.todos[foundIndex];
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3100';
        if (todo.completedAt) {
          const res = await fetch(`${apiBase}/tasks/${id}/pending`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedAt: null }),
          });
          if (!res.ok) throw new Error('Failed to mark pending');
        } else {
          const res = await fetch(`${apiBase}/tasks/${id}/done`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedAt: new Date().toISOString() }),
          });
          if (!res.ok) throw new Error('Failed to mark done');
        }
        // refresh from server
        await this.fetchTodos();
      } catch (err) {
        console.error(err);
      }
    },
    async addTodo(todo) {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3100';
        const res = await fetch(`${apiBase}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: todo }),
        });
        if (!res.ok) throw new Error('Failed to create todo');
        await this.fetchTodos();
      } catch (err) {
        console.error(err);
      }
    },
    async deleteTodo(id) {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3100';
        const res = await fetch(`${apiBase}/tasks/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete todo');
        await this.fetchTodos();
      } catch (err) {
        console.error(err);
      }
    },
    async clearAll() {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3100';
        await Promise.all(
          this.todos.map((t) => fetch(`${apiBase}/tasks/${t.id}`, { method: 'DELETE' })),
        );
        this.todos = [];
      } catch (err) {
        console.error(err);
      }
    },
  },
});

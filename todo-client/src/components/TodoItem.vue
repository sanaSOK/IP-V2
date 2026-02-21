<template>
  <li class="list pending" @click="toggleStatus(todo.id)">
    <input type="checkbox" :checked="todo.completedAt != null" />
    <span class="task">{{ todo.name }}</span>
    <button class="delete-btn" @click.stop="deleteTodo(todo.id)">
      <i class="uil uil-trash-alt"></i>
    </button>
  </li>
</template>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  props: ["todo"],
  methods: {
    toggleStatus(todoId) {
      this.todoStore.toggleStatus(todoId);
    },
    deleteTodo(todoId) {
      if (!confirm('Delete this todo?')) return;
      this.todoStore.deleteTodo(todoId);
    },
  },
};
</script>

<style scoped>
.list {
  position: relative;
}
.delete-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}
.delete-btn:hover {
  background: rgba(0,0,0,0.04);
  color: #ef4444;
}
.delete-btn i {
  font-size: 18px;
}
</style>

<template>
  <div class="container">
    <AddTodo @added="handleAddTodo" />
    <h3 v-if="nbOfTodo > 0">Pending Tasks:</h3>
    <TodoList status="pending" />

    <h3 v-if="nbOfTodo > 0">Completed Tasks:</h3>
    <TodoList status="completed" />
    <div class="pending-tasks">
      <span
        >You have <span class="pending-num"> {{ nbOfTodo }} </span> tasks
        pending.</span
      >
      <button class="clear-button floating" @click="clearAllTodos" :disabled="nbOfTodo === 0">Clear All</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import AddTodo from "./components/AddTodo.vue";
import TodoList from "./components/TodoList.vue";

import { useTodoStore } from "./stores/todo";
export default {
  name: "App",
  setup() {
    const todoStore = useTodoStore();
    return {
      todoStore,
    };
  },
  components: {
    AddTodo,
    TodoList,
  },
  computed: {
    ...mapState(useTodoStore, {
      nbOfTodo: "countTodos",
    }),
  },
  methods: {
    handleAddTodo(todo) {
      this.todoStore.addTodo(todo);
    },
    clearAllTodos() {
      if (!confirm('Clear all todos? This cannot be undone.')) return;
      this.todoStore.clearAll();
    },
  },
};
</script>
<style>
@import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";

.container {
  max-width: 420px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(15, 50, 80, 0.08);
  position: relative;
}

.pending-tasks {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
}

.clear-button {
  background: #2f8bfd;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(47,139,253,0.2);
  cursor: pointer;
  font-weight: 600;
}

.clear-button:disabled {
  background: #cfd8e3;
  box-shadow: none;
  cursor: default;
}

/* float the button to bottom-right inside the card like the screenshot */
.clear-button.floating {
  position: absolute;
  right: 18px;
  bottom: 18px;
}

/* responsive tweaks */
@media (max-width: 480px) {
  .container { margin: 16px; padding: 18px; }
  .clear-button.floating { right: 12px; bottom: 12px; }
}

</style>

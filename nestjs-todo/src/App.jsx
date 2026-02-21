import axios from 'axios';

async fetchTodos() {
  try {
    const response = await axios.get('http://localhost:3100/tasks');
    this.todos = response.data; // assuming the API returns an array of todos
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
}
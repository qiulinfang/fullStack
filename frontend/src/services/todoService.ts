import api from '../api/axios';
import { Todo } from '../types/todo';

const todoService = {
  getAll: async () => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },
  create: async (todo: Todo) => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
  },
  update: async (id: number, todo: Todo) => {
    const response = await api.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/todos/${id}`);
  },
};

export default todoService;

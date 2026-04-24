import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/todo';
import todoService from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string) => {
    try {
      const newTodo = await todoService.create({ title, completed: false });
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    if (!todo.id) return;
    try {
      const updatedTodo = await todoService.update(todo.id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo, refresh: fetchTodos };
};

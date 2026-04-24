import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, CheckCircle, Circle, Plus } from 'lucide-react';

interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

const API_URL = 'http://localhost:8080/api/todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(API_URL, {
        title: newTodo,
        completed: false
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await axios.put(`${API_URL}/${todo.id}`, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === todo.id ? response.data : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Todo List
          </h2>
        </div>
        
        <form onSubmit={addTodo} className="mt-8 flex gap-2">
          <input
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={20} />
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => toggleTodo(todo)}
              >
                {todo.completed ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <Circle className="text-gray-400" size={20} />
                )}
                <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => todo.id && deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

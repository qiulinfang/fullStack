import React from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Todo List
          </h2>
        </div>
        
        <TodoInput onAdd={addTodo} />

        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        ) : (
          <div className="mt-6 space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
            {todos.length === 0 && !error && (
              <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

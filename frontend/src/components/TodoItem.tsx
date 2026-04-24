import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div
        className="flex items-center gap-3 cursor-pointer flex-1"
        onClick={() => onToggle(todo)}
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
        onClick={() => todo.id && onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 p-1"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

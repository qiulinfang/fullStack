import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={styles.todoItem}>
      <div
        className={styles.todoContent}
        onClick={() => onToggle(todo)}
      >
        {todo.completed ? (
          <CheckCircle className="icon-success" color="#10b981" size={20} />
        ) : (
          <Circle className="icon-muted" color="#9ca3af" size={20} />
        )}
        <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => todo.id && onDelete(todo.id)}
        className={styles.deleteBtn}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

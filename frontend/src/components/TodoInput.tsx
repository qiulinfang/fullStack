import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './TodoInput.module.css';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formInline}>
      <input
        type="text"
        required
        className="input-field"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="btn"
      >
        <Plus size={20} />
      </button>
    </form>
  );
};

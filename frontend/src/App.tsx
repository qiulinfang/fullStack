import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Login } from './components/Login';
import styles from './App.module.css';

const TodoList = () => {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const username = localStorage.getItem('username');

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.todoHeader}>
          <h2 className={styles.title}>
            Todo List
          </h2>
          <span className={styles.userInfo}>Hi, {username}</span>
        </div>
        
        <TodoInput onAdd={addTodo} />

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {loading ? (
          <div className={styles.emptyMsg}>Loading...</div>
        ) : (
          <div className={styles.todoList}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
            {todos.length === 0 && !error && (
              <p className={styles.emptyMsg}>No tasks yet. Add one above!</p>
            )}
          </div>
        )}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;

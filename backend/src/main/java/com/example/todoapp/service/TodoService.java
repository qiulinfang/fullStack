package com.example.todoapp.service;

import com.example.todoapp.dto.TodoDTO;
import java.util.List;

public interface TodoService {
    List<TodoDTO> getAllTodos();
    TodoDTO createTodo(TodoDTO todoDTO);
    TodoDTO updateTodo(Long id, TodoDTO todoDTO);
    void deleteTodo(Long id);
}

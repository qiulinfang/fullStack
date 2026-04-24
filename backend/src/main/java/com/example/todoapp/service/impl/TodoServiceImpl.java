package com.example.todoapp.service.impl;

import com.example.todoapp.dto.TodoDTO;
import com.example.todoapp.entity.Todo;
import com.example.todoapp.repository.TodoRepository;
import com.example.todoapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<TodoDTO> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TodoDTO createTodo(TodoDTO todoDTO) {
        Todo todo = convertToEntity(todoDTO);
        Todo savedTodo = todoRepository.save(todo);
        return convertToDTO(savedTodo);
    }

    @Override
    @Transactional
    public TodoDTO updateTodo(Long id, TodoDTO todoDTO) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        
        todo.setTitle(todoDTO.getTitle());
        todo.setCompleted(todoDTO.isCompleted());
        
        Todo updatedTodo = todoRepository.save(todo);
        return convertToDTO(updatedTodo);
    }

    @Override
    @Transactional
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    private TodoDTO convertToDTO(Todo todo) {
        return new TodoDTO(todo.getId(), todo.getTitle(), todo.isCompleted());
    }

    private Todo convertToEntity(TodoDTO todoDTO) {
        Todo todo = new Todo();
        todo.setId(todoDTO.getId());
        todo.setTitle(todoDTO.getTitle());
        todo.setCompleted(todoDTO.isCompleted());
        return todo;
    }
}

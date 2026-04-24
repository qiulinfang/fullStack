package com.example.todoapp.service;

import com.example.todoapp.dto.LoginRequest;
import com.example.todoapp.entity.User;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> login(LoginRequest loginRequest);
    ResponseEntity<?> register(User user);
}

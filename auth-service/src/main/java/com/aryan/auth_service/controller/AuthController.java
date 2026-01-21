package com.aryan.auth_service.controller;

import com.aryan.auth_service.dto.AuthResponse;
import com.aryan.auth_service.dto.LoginRequest;
import com.aryan.auth_service.dto.RegisterRequest;
import com.aryan.auth_service.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    public final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        service.register(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        String token = service.login(loginRequest);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/me")
    public String me(Authentication auth){
        return "Logged in as " + auth.getName();

    }

}

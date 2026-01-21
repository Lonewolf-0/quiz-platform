package com.aryan.auth_service.service;

import com.aryan.auth_service.dto.LoginRequest;
import com.aryan.auth_service.dto.RegisterRequest;
import com.aryan.auth_service.entity.Role;
import com.aryan.auth_service.entity.User;
import com.aryan.auth_service.repository.UserRepository;
import com.aryan.auth_service.security.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {
        if (repo.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(encoder.encode(request.password()));
        user.setRole(Role.USER);

        repo.save(user);
    }

    public String login(LoginRequest request) {
        User user = repo.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));

        if(!encoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        return jwtService.generateToken(user);
    }


}

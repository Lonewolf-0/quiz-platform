package com.aryan.attempt_service.controller;


import com.aryan.attempt_service.dto.AttemptHistoryResponse;
import com.aryan.attempt_service.dto.AttemptResponse;
import com.aryan.attempt_service.dto.SubmitAttemptRequest;
import com.aryan.attempt_service.service.AttemptService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/attempt")
public class AttemptController {

    private final AttemptService service;

    public AttemptController(AttemptService service) {
        this.service = service;
    }



    @PostMapping
    public AttemptResponse submitAttempt(
            @RequestBody SubmitAttemptRequest request,
            Authentication auth,
            HttpServletRequest httpRequest
    ) {
        UUID userId = UUID.fromString(auth.getName());

        String authHeader = httpRequest.getHeader("Authorization");
        String token = authHeader.substring(7);

        return service.submitAttempt(userId, request, token);
    }

    @GetMapping
    public List<AttemptHistoryResponse> getMyAttempts(
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return service.getAllAttempts(userId);
    }

    @GetMapping("/quiz/{quizId}")
    public List<AttemptHistoryResponse> getAttemptsByQuiz(
            @PathVariable UUID quizId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return service.getAttemptsByQuiz(userId, quizId);
    }


}


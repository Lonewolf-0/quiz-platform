package com.aryan.quiz_service.controller;

import com.aryan.quiz_service.dto.CreateQuizRequest;
import com.aryan.quiz_service.dto.QuizListResponse;
import com.aryan.quiz_service.dto.QuizResponse;
import com.aryan.quiz_service.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> createQuiz(
            @RequestBody CreateQuizRequest request) {

        service.createQuiz(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<QuizListResponse> getAll() {
        return service.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public QuizResponse getById(@PathVariable UUID id) {
        return service.getQuizById(id);
    }
}


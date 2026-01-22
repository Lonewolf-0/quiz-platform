package com.aryan.quiz_service.controller;


import com.aryan.quiz_service.entity.Question;
import com.aryan.quiz_service.repository.QuestionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/internal/quiz")
public class InternalQuizController {

    private final QuestionRepository questionRepository;

    public InternalQuizController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping("/{quizId}/answers")
    public Map<UUID, String> getCorrectAnswers(
            @PathVariable UUID quizId
    ) {
        return questionRepository.findByQuizId(quizId)
                .stream()
                .collect(Collectors.toMap(
                        Question::getId,
                        q -> (String) q.getContent().get("correctAnswer")
                ));
    }
}


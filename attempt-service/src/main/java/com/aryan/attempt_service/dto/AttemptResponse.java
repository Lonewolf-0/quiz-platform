package com.aryan.attempt_service.dto;

import java.util.Map;
import java.util.UUID;

public record AttemptResponse(UUID quizId,
                              int score,
                              int totalQuestions,
                              Map<String, String> correctAnswers) {
}

package com.aryan.attempt_service.dto;

import java.time.Instant;
import java.util.UUID;

public record AttemptHistoryResponse(
        UUID attemptId,
        UUID quizId,
        int score,
        int totalQuestions,
        Instant submittedAt
) {}

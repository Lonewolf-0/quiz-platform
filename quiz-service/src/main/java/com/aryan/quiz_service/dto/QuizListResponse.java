package com.aryan.quiz_service.dto;

import java.util.UUID;

public record QuizListResponse(UUID id,
                               String title,
                               String description,
                               Integer durationMinutes,
                               int questionCount) {
}

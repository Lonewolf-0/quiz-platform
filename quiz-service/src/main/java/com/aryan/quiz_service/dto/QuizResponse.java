package com.aryan.quiz_service.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public record QuizResponse(UUID id,
                           String title,
                           String description,
                           Integer durationMinutes,
                           List<Map<String, Object>> questions) {
}

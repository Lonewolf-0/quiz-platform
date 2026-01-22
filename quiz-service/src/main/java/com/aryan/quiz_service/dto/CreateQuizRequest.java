package com.aryan.quiz_service.dto;

import java.util.List;

public record CreateQuizRequest(String title,
                                String description,
                                Integer durationMinutes,
                                List<QuestionDto> questions) {
}

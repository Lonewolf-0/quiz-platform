package com.aryan.quiz_service.dto;

import java.util.List;

public record QuestionDto(String question,
                          List<String> options,
                          String correctAnswer) {
}

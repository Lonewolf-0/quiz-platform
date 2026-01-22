package com.aryan.attempt_service.dto;

public record SubmitAttemptRequest(UUID quizId,
                                   Map<UUID, String> answers) {
}

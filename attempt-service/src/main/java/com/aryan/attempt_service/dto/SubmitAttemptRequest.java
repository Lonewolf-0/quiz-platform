package com.aryan.attempt_service.dto;

import java.util.Map;
import java.util.UUID;

public record SubmitAttemptRequest(UUID quizId,
                                   Map<String, String> answers) {
}

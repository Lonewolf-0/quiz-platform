package com.aryan.attempt_service.service;


import com.aryan.attempt_service.dto.AttemptResponse;
import com.aryan.attempt_service.dto.SubmitAttemptRequest;
import com.aryan.attempt_service.entity.Attempt;
import com.aryan.attempt_service.repository.AttemptRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
public class AttemptService {

    private static final Logger logger = LoggerFactory.getLogger(AttemptService.class);

    private final AttemptRepository repository;
    private final RestTemplate restTemplate;

    public AttemptService(
            AttemptRepository repository,
            RestTemplate restTemplate
    ) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("unchecked")
    public AttemptResponse submitAttempt(
            UUID userId,
            SubmitAttemptRequest request,
            String jwtToken
    ) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwtToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        String url = "http://QUIZ-SERVICE/internal/quiz/"
                + request.quizId() + "/answers";

        ResponseEntity<Map<String, String>> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        (Class<Map<String, String>>) (Class<?>) Map.class
                );

        Map<String, String> correctAnswers = response.getBody();

        if (correctAnswers == null) {
            logger.error("No correct answers received from quiz service");
            throw new IllegalArgumentException("Failed to fetch correct answers for quiz");
        }

        logger.info("Received correct answers: {}", correctAnswers);
        logger.info("User answers: {}", request.answers());

        int score = 0;
        for (UUID qId : request.answers().keySet()) {
            String userAnswer = request.answers().get(qId);
            String qIdString = qId.toString();
            String correctAnswer = correctAnswers.get(qIdString);

            logger.info("Comparing question {}: user answer='{}' vs correct answer='{}' (from key: {})",
                    qId, userAnswer, correctAnswer, qIdString);

            if (userAnswer != null && correctAnswer != null && userAnswer.equalsIgnoreCase(correctAnswer)) {
                score++;
                logger.info("Question {} is CORRECT", qId);
            } else {
                logger.info("Question {} is INCORRECT (user: '{}', correct: '{}')", qId, userAnswer, correctAnswer);
            }
        }

        Attempt attempt = repository.save(
                Attempt.builder()
                        .userId(userId)
                        .quizId(request.quizId())
                        .score(score)
                        .totalQuestions(correctAnswers.size())
                        .build()
        );

        return new AttemptResponse(
                attempt.getQuizId(),
                attempt.getScore(),
                attempt.getTotalQuestions()
        );
    }

}


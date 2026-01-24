package com.aryan.quiz_service.service;

import com.aryan.quiz_service.dto.CreateQuizRequest;
import com.aryan.quiz_service.dto.QuizResponse;
import com.aryan.quiz_service.entity.Question;
import com.aryan.quiz_service.entity.Quiz;
import com.aryan.quiz_service.repository.QuestionRepository;
import com.aryan.quiz_service.repository.QuizRepository;
import com.aryan.quiz_service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService {
    private final QuizRepository quizRepo;
    private final QuestionRepository questionRepo;
    public QuizService(QuizRepository quizRepo, QuestionRepository questionRepo) {
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
    }

    public void createQuiz(CreateQuizRequest request) {
        Quiz quiz = quizRepo.save(
                Quiz.builder()
                        .title(request.title())
                        .description(request.description())
                        .durationMinutes(request.durationMinutes())
                        .build()
        );

        List<Question> questions = request.questions().stream()
                .map(q -> Question.builder()
                        .quiz(quiz)
                        .content(Map.of(
                                "question", q.question(),
                                "options", q.options(),
                                "correctAnswer", q.correctAnswer()
                        ))
                        .build()
                ).toList();

        questionRepo.saveAll(questions);

    }

    public List<Quiz> getAllQuizzes(){
        return quizRepo.findAll();
    }

    public QuizResponse getQuizById(UUID quizId){
        Quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        List<Map<String, Object>> questions = questionRepo.findByQuizId(quizId).stream()
                .map(q -> {
                    Map<String, Object> map = new HashMap<>(q.getContent());
                    map.remove("correctAnswer");
                    return map;
                }).toList();

        return new QuizResponse(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.getDurationMinutes(),
                questions
        );
    }
}

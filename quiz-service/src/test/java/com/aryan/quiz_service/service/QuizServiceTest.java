package com.aryan.quiz_service.service;

import com.aryan.quiz_service.exception.ResourceNotFoundException;
import com.aryan.quiz_service.repository.QuestionRepository;
import com.aryan.quiz_service.repository.QuizRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock
    private QuizRepository quizRepo;

    @Mock
    private QuestionRepository questionRepo;

    @InjectMocks
    private QuizService quizService;

    @Test
    void getQuizById_ShouldThrowResourceNotFoundException_WhenQuizDoesNotExist() {
        // Arrange
        UUID quizId = UUID.randomUUID();
        when(quizRepo.findById(quizId)).thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            quizService.getQuizById(quizId);
        });

        assertEquals("Quiz not found with id: " + quizId, exception.getMessage());
    }
}

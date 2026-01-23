package com.aryan.attempt_service.repository;

import com.aryan.attempt_service.entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AttemptRepository extends JpaRepository<Attempt, UUID> {
    List<Attempt> findByUserId(UUID userId);
    List<Attempt> findByUserIdAndQuizId(UUID userId, UUID quizId);

}

package com.aryan.attempt_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "attempt")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attempt {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID userId;
    @Column(nullable = false)
    private UUID quizId;

    private int score;
    private int totalQuestions;
    @Builder.Default
    private Instant submittedAt = Instant.now();

}

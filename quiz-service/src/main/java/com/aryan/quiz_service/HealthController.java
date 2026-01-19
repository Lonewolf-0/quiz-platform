package com.aryan.quiz_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz")
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "AUTH SERVICE OK";
    }
}

package com.aryan.attempt_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attempt")
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "ATTEMPT SERVICE OK";
    }
}

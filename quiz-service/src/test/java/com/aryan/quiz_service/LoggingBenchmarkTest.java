package com.aryan.quiz_service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
@Slf4j
public class LoggingBenchmarkTest {

    @Test
    public void benchmarkLogging() {
        int iterations = 10000;

        // Warmup
        for (int i = 0; i < 1000; i++) {
            System.out.println("Warmup " + i);
            log.info("Warmup {}", i);
        }

        // Benchmark System.out.println
        long startSysOut = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            System.out.println("JWT FILTER HIT: /benchmark/path/to/resource " + i);
        }
        long endSysOut = System.nanoTime();
        long durationSysOut = endSysOut - startSysOut;

        // Benchmark Logger
        long startLogger = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            log.info("JWT FILTER HIT: /benchmark/path/to/resource " + i);
        }
        long endLogger = System.nanoTime();
        long durationLogger = endLogger - startLogger;

        System.out.println("\n\n---------------------------------------------------");
        System.out.println("Benchmark Results (" + iterations + " iterations):");
        System.out.println("System.out.println duration: " + (durationSysOut / 1_000_000.0) + " ms");
        System.out.println("Logger.info duration:        " + (durationLogger / 1_000_000.0) + " ms");
        System.out.println("---------------------------------------------------\n\n");
    }
}

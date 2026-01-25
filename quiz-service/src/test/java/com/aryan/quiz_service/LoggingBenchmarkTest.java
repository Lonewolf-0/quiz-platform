package com.aryan.quiz_service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

/**
 * Performance benchmark test for comparing System.out.println vs Logger performance.
 * This test is disabled by default as performance benchmarks should not run during regular test execution.
 * To run this benchmark, remove the @Disabled annotation or run it explicitly via your IDE.
 * For more accurate benchmarking, consider using a dedicated framework like JMH (Java Microbenchmark Harness).
 */
@Slf4j
public class LoggingBenchmarkTest {

    /**
     * Performance benchmark test for comparing System.out.println vs Logger.info.
     * This test is disabled to prevent it from running during regular test execution.
     * Enable this test manually when you need to verify logging performance.
     */
    @Test
    @Disabled("Performance benchmark - not meant for regular test execution")
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
            log.info("JWT FILTER HIT: /benchmark/path/to/resource {}", i);
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

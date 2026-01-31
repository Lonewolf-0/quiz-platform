-- =====================================================
-- Quiz Platform Database Initialization Script
-- =====================================================
-- This script creates schemas and populates sample data
-- for the Quiz Platform microservices
-- =====================================================

-- Create schemas for each microservice
CREATE SCHEMA IF NOT EXISTS auth_schema;
CREATE SCHEMA IF NOT EXISTS quiz_schema;
CREATE SCHEMA IF NOT EXISTS attempt_schema;

-- =====================================================
-- AUTH SCHEMA - Users Table
-- =====================================================
CREATE TABLE IF NOT EXISTS auth_schema.users
(
    id
    UUID
    PRIMARY
    KEY
    DEFAULT
    gen_random_uuid
(
),
    email VARCHAR
(
    255
) NOT NULL UNIQUE,
    password VARCHAR
(
    255
) NOT NULL,
    role VARCHAR
(
    50
) DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

-- Sample users (password is 'password123' hashed with BCrypt)
INSERT INTO auth_schema.users (id, email, password, role, created_at)
VALUES ('11111111-1111-1111-1111-111111111111', 'admin@test.com',
        '$2a$10$pQDq7GjTLk6EsFtm9XUTyuFarOD1gyR2i1gJlhrc/1kBJHScKjzzS', 'ADMIN', NOW()) ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- QUIZ SCHEMA - Quiz and Question Tables
-- =====================================================
CREATE TABLE IF NOT EXISTS quiz_schema.quiz
(
    id
    UUID
    PRIMARY
    KEY
    DEFAULT
    gen_random_uuid
(
),
    title VARCHAR
(
    255
) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS quiz_schema.question
(
    id
    UUID
    PRIMARY
    KEY
    DEFAULT
    gen_random_uuid
(
),
    quiz_id UUID NOT NULL REFERENCES quiz_schema.quiz
(
    id
) ON DELETE CASCADE,
    content JSONB NOT NULL
    );

-- =====================================================
-- Sample Quizzes
-- =====================================================

-- Quiz 1: Java Fundamentals
INSERT INTO quiz_schema.quiz (id, title, description, duration_minutes, created_at)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Java Fundamentals',
        'Test your knowledge of core Java concepts including OOP, collections, and exception handling.', 15,
        NOW()) ON CONFLICT DO NOTHING;

-- Questions for Java Fundamentals Quiz
INSERT INTO quiz_schema.question (id, quiz_id, content)
VALUES ('a1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "text": "Which of the following is NOT a primitive data type in Java?",
            "options": [
                {"id": "opt1", "text": "int"},
                {"id": "opt2", "text": "boolean"},
                {"id": "opt3", "text": "String"},
                {"id": "opt4", "text": "char"}
            ],
            "correctOptionId": "opt3"
        }'::jsonb),
       ('a2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "text": "What is the default value of a boolean variable in Java?",
            "options": [
                {"id": "opt1", "text": "true"},
                {"id": "opt2", "text": "false"},
                {"id": "opt3", "text": "null"},
                {"id": "opt4", "text": "0"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('a3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "text": "Which keyword is used to inherit a class in Java?",
            "options": [
                {"id": "opt1", "text": "implements"},
                {"id": "opt2", "text": "extends"},
                {"id": "opt3", "text": "inherits"},
                {"id": "opt4", "text": "super"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('a4444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "text": "What is the output of System.out.println(10 + 20 + \"Hello\")?",
            "options": [
                {"id": "opt1", "text": "1020Hello"},
                {"id": "opt2", "text": "30Hello"},
                {"id": "opt3", "text": "Hello1020"},
                {"id": "opt4", "text": "Hello30"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('a5555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "text": "Which collection class allows null keys and null values?",
            "options": [
                {"id": "opt1", "text": "Hashtable"},
                {"id": "opt2", "text": "TreeMap"},
                {"id": "opt3", "text": "HashMap"},
                {"id": "opt4", "text": "ConcurrentHashMap"}
            ],
            "correctOptionId": "opt3"
        }'::jsonb) ON CONFLICT DO NOTHING;

-- Quiz 2: Spring Boot Basics
INSERT INTO quiz_schema.quiz (id, title, description, duration_minutes, created_at)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Spring Boot Basics',
        'Test your understanding of Spring Boot framework, annotations, and REST APIs.', 20,
        NOW()) ON CONFLICT DO NOTHING;

-- Questions for Spring Boot Basics Quiz
INSERT INTO quiz_schema.question (id, quiz_id, content)
VALUES ('b1111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "text": "Which annotation is used to mark a class as a Spring Boot main application?",
            "options": [
                {"id": "opt1", "text": "@SpringApplication"},
                {"id": "opt2", "text": "@SpringBootApplication"},
                {"id": "opt3", "text": "@EnableSpring"},
                {"id": "opt4", "text": "@SpringMain"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('b2222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "text": "What is the default embedded server in Spring Boot?",
            "options": [
                {"id": "opt1", "text": "Jetty"},
                {"id": "opt2", "text": "Undertow"},
                {"id": "opt3", "text": "Tomcat"},
                {"id": "opt4", "text": "GlassFish"}
            ],
            "correctOptionId": "opt3"
        }'::jsonb),
       ('b3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "text": "Which annotation is used to inject dependencies in Spring?",
            "options": [
                {"id": "opt1", "text": "@Inject"},
                {"id": "opt2", "text": "@Autowired"},
                {"id": "opt3", "text": "@Resource"},
                {"id": "opt4", "text": "All of the above"}
            ],
            "correctOptionId": "opt4"
        }'::jsonb),
       ('b4444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "text": "Which HTTP method is typically used to update an existing resource?",
            "options": [
                {"id": "opt1", "text": "GET"},
                {"id": "opt2", "text": "POST"},
                {"id": "opt3", "text": "PUT"},
                {"id": "opt4", "text": "DELETE"}
            ],
            "correctOptionId": "opt3"
        }'::jsonb),
       ('b5555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "text": "What annotation is used to map a method to an HTTP GET request?",
            "options": [
                {"id": "opt1", "text": "@Get"},
                {"id": "opt2", "text": "@GetMapping"},
                {"id": "opt3", "text": "@RequestMapping(GET)"},
                {"id": "opt4", "text": "@HttpGet"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb) ON CONFLICT DO NOTHING;

-- Quiz 3: React Fundamentals
INSERT INTO quiz_schema.quiz (id, title, description, duration_minutes, created_at)
VALUES ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'React Fundamentals',
        'Test your knowledge of React concepts including components, hooks, and state management.', 15,
        NOW()) ON CONFLICT DO NOTHING;

-- Questions for React Fundamentals Quiz
INSERT INTO quiz_schema.question (id, quiz_id, content)
VALUES ('c1111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "text": "What hook is used to manage state in a functional component?",
            "options": [
                {"id": "opt1", "text": "useEffect"},
                {"id": "opt2", "text": "useState"},
                {"id": "opt3", "text": "useContext"},
                {"id": "opt4", "text": "useReducer"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('c2222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "text": "Which method is used to render a React component to the DOM?",
            "options": [
                {"id": "opt1", "text": "ReactDOM.render()"},
                {"id": "opt2", "text": "React.render()"},
                {"id": "opt3", "text": "createRoot().render()"},
                {"id": "opt4", "text": "Both A and C"}
            ],
            "correctOptionId": "opt4"
        }'::jsonb),
       ('c3333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "text": "What is JSX?",
            "options": [
                {"id": "opt1", "text": "A JavaScript library"},
                {"id": "opt2", "text": "A syntax extension for JavaScript"},
                {"id": "opt3", "text": "A CSS framework"},
                {"id": "opt4", "text": "A build tool"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('c4444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "text": "Which hook is used for side effects in React?",
            "options": [
                {"id": "opt1", "text": "useState"},
                {"id": "opt2", "text": "useEffect"},
                {"id": "opt3", "text": "useMemo"},
                {"id": "opt4", "text": "useCallback"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('c5555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "text": "How do you pass data from parent to child component?",
            "options": [
                {"id": "opt1", "text": "Using state"},
                {"id": "opt2", "text": "Using props"},
                {"id": "opt3", "text": "Using context"},
                {"id": "opt4", "text": "Using refs"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb) ON CONFLICT DO NOTHING;

-- Quiz 4: SQL Basics
INSERT INTO quiz_schema.quiz (id, title, description, duration_minutes, created_at)
VALUES ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'SQL Basics',
        'Test your knowledge of SQL queries, joins, and database concepts.', 20, NOW()) ON CONFLICT DO NOTHING;

-- Questions for SQL Basics Quiz
INSERT INTO quiz_schema.question (id, quiz_id, content)
VALUES ('d1111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "text": "Which SQL clause is used to filter records?",
            "options": [
                {"id": "opt1", "text": "FILTER"},
                {"id": "opt2", "text": "WHERE"},
                {"id": "opt3", "text": "HAVING"},
                {"id": "opt4", "text": "SELECT"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('d2222222-2222-2222-2222-222222222222', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "text": "Which JOIN returns all records from both tables?",
            "options": [
                {"id": "opt1", "text": "INNER JOIN"},
                {"id": "opt2", "text": "LEFT JOIN"},
                {"id": "opt3", "text": "RIGHT JOIN"},
                {"id": "opt4", "text": "FULL OUTER JOIN"}
            ],
            "correctOptionId": "opt4"
        }'::jsonb),
       ('d3333333-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "text": "Which SQL function is used to count rows?",
            "options": [
                {"id": "opt1", "text": "SUM()"},
                {"id": "opt2", "text": "COUNT()"},
                {"id": "opt3", "text": "TOTAL()"},
                {"id": "opt4", "text": "NUM()"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('d4444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "text": "What does DISTINCT keyword do?",
            "options": [
                {"id": "opt1", "text": "Sorts the results"},
                {"id": "opt2", "text": "Removes duplicate rows"},
                {"id": "opt3", "text": "Filters null values"},
                {"id": "opt4", "text": "Groups the results"}
            ],
            "correctOptionId": "opt2"
        }'::jsonb),
       ('d5555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "text": "Which clause is used with aggregate functions to filter groups?",
            "options": [
                {"id": "opt1", "text": "WHERE"},
                {"id": "opt2", "text": "GROUP BY"},
                {"id": "opt3", "text": "HAVING"},
                {"id": "opt4", "text": "ORDER BY"}
            ],
            "correctOptionId": "opt3"
        }'::jsonb) ON CONFLICT DO NOTHING;

-- =====================================================
-- ATTEMPT SCHEMA - Attempt Table
-- =====================================================
CREATE TABLE IF NOT EXISTS attempt_schema.attempt
(
    id
    UUID
    PRIMARY
    KEY
    DEFAULT
    gen_random_uuid
(
),
    user_id UUID NOT NULL,
    quiz_id UUID NOT NULL,
    score INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

-- Sample attempts (optional - for testing)
INSERT INTO attempt_schema.attempt (id, user_id, quiz_id, score, total_questions, submitted_at)
VALUES ('e1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 4, 5, NOW() - INTERVAL '2 days'),
       ('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 3, 5, NOW() - INTERVAL '1 day'),
       ('e3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333',
        'cccccccc-cccc-cccc-cccc-cccccccccccc', 5, 5, NOW()) ON CONFLICT DO NOTHING;

-- =====================================================
-- Indexes for better performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON auth_schema.users(email);
CREATE INDEX IF NOT EXISTS idx_question_quiz_id ON quiz_schema.question(quiz_id);
CREATE INDEX IF NOT EXISTS idx_attempt_user_id ON attempt_schema.attempt(user_id);
CREATE INDEX IF NOT EXISTS idx_attempt_quiz_id ON attempt_schema.attempt(quiz_id);

-- =====================================================
-- Grant permissions (optional - for production)
-- =====================================================
-- GRANT ALL PRIVILEGES ON SCHEMA auth_schema TO postgres;
-- GRANT ALL PRIVILEGES ON SCHEMA quiz_schema TO postgres;
-- GRANT ALL PRIVILEGES ON SCHEMA attempt_schema TO postgres;

-- =====================================================
-- End of initialization script
-- =====================================================

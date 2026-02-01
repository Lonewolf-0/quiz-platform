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
            "question": "Which of the following is NOT a primitive data type in Java?",
            "options": ["int", "boolean", "String", "char"],
            "correctAnswer": "String"
        }'::jsonb),
       ('a2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "question": "What is the default value of a boolean variable in Java?",
            "options": ["true", "false", "null", "0"],
            "correctAnswer": "false"
        }'::jsonb),
       ('a3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "question": "Which keyword is used to inherit a class in Java?",
            "options": ["implements", "extends", "inherits", "super"],
            "correctAnswer": "extends"
        }'::jsonb),
       ('a4444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "question": "What is the output of System.out.println(10 + 20 + \"Hello\")?",
            "options": ["1020Hello", "30Hello", "Hello1020", "Hello30"],
            "correctAnswer": "30Hello"
        }'::jsonb),
       ('a5555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '{
            "question": "Which collection class allows null keys and null values?",
            "options": ["Hashtable", "TreeMap", "HashMap", "ConcurrentHashMap"],
            "correctAnswer": "HashMap"
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
            "question": "Which annotation is used to mark a class as a Spring Boot main application?",
            "options": ["@SpringApplication", "@SpringBootApplication", "@EnableSpring", "@SpringMain"],
            "correctAnswer": "@SpringBootApplication"
        }'::jsonb),
       ('b2222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "question": "What is the default embedded server in Spring Boot?",
            "options": ["Jetty", "Undertow", "Tomcat", "GlassFish"],
            "correctAnswer": "Tomcat"
        }'::jsonb),
       ('b3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "question": "Which annotation is used to inject dependencies in Spring?",
            "options": ["@Inject", "@Autowired", "@Resource", "All of the above"],
            "correctAnswer": "All of the above"
        }'::jsonb),
       ('b4444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "question": "Which HTTP method is typically used to update an existing resource?",
            "options": ["GET", "POST", "PUT", "DELETE"],
            "correctAnswer": "PUT"
        }'::jsonb),
       ('b5555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '{
            "question": "What annotation is used to map a method to an HTTP GET request?",
            "options": ["@Get", "@GetMapping", "@RequestMapping(GET)", "@HttpGet"],
            "correctAnswer": "@GetMapping"
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
            "question": "What hook is used to manage state in a functional component?",
            "options": ["useEffect", "useState", "useContext", "useReducer"],
            "correctAnswer": "useState"
        }'::jsonb),
       ('c2222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "question": "Which method is used to render a React component to the DOM?",
            "options": ["ReactDOM.render()", "React.render()", "createRoot().render()", "Both A and C"],
            "correctAnswer": "Both A and C"
        }'::jsonb),
       ('c3333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "question": "What is JSX?",
            "options": ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A build tool"],
            "correctAnswer": "A syntax extension for JavaScript"
        }'::jsonb),
       ('c4444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "question": "Which hook is used for side effects in React?",
            "options": ["useState", "useEffect", "useMemo", "useCallback"],
            "correctAnswer": "useEffect"
        }'::jsonb),
       ('c5555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '{
            "question": "How do you pass data from parent to child component?",
            "options": ["Using state", "Using props", "Using context", "Using refs"],
            "correctAnswer": "Using props"
        }'::jsonb) ON CONFLICT DO NOTHING;

-- Quiz 4: SQL Basics
INSERT INTO quiz_schema.quiz (id, title, description, duration_minutes, created_at)
VALUES ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'SQL Basics',
        'Test your knowledge of SQL queries, joins, and database concepts.', 20, NOW()) ON CONFLICT DO NOTHING;

-- Questions for SQL Basics Quiz
INSERT INTO quiz_schema.question (id, quiz_id, content)
VALUES ('d1111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "question": "Which SQL clause is used to filter records?",
            "options": ["FILTER", "WHERE", "HAVING", "SELECT"],
            "correctAnswer": "WHERE"
        }'::jsonb),
       ('d2222222-2222-2222-2222-222222222222', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "question": "Which JOIN returns all records from both tables?",
            "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
            "correctAnswer": "FULL OUTER JOIN"
        }'::jsonb),
       ('d3333333-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "question": "Which SQL function is used to count rows?",
            "options": ["SUM()", "COUNT()", "TOTAL()", "NUM()"],
            "correctAnswer": "COUNT()"
        }'::jsonb),
       ('d4444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "question": "What does DISTINCT keyword do?",
            "options": ["Sorts the results", "Removes duplicate rows", "Filters null values", "Groups the results"],
            "correctAnswer": "Removes duplicate rows"
        }'::jsonb),
       ('d5555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        '{
            "question": "Which clause is used with aggregate functions to filter groups?",
            "options": ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
            "correctAnswer": "HAVING"
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

CREATE TABLE chapters (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT,
    title TEXT,
    description TEXT,
    quizGroupes INT,
    createdAt DATE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE courses (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    course_name TEXT,
    description TEXT,
    instructor TEXT,
    createdAt DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modules (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    description TEXT,
    title TEXT,
    order_num INT,
    createdAt DATE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE quiz (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT,
    question TEXT,
    answers TEXT,
    correct_answer TEXT,
    quiz_group INT,
    module_id INT,
    createdAt DATE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    annee INT,
    filiere TEXT,
    profile TEXT,
    createdAt DATE DEFAULT CURRENT_TIMESTAMP
);




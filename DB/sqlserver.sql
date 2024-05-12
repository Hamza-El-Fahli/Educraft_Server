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
















INSERT INTO users (name, email, password, profile)
VALUES ('med', 'med@mail.com', '0000', 'user');

INSERT INTO users (name, email, password, profile)
VALUES ('TestUser', '0', '0', 'user');

INSERT INTO users (name, email, password, profile)
VALUES ('Test', '0@m.com', '0', 'user');

INSERT INTO users (name, email, password, profile)
VALUES ('Hamza', 'hamza@mail.com', '1234', 'admin');








INSERT INTO courses (course_name, description, instructor)
VALUES ('CCNA 1', 'networking fundamentals', 1);

INSERT INTO courses (course_name, description, instructor)
VALUES ('CCNA 2', 'introduction to LANs', 2);

INSERT INTO courses (course_name, description, instructor)
VALUES ('CCNA 3', 'Routing and WAN protocols', 1);

INSERT INTO courses (course_name, description, instructor)
VALUES ('CCNA 4', 'Sécurité des Réseaux', 1);



INSERT INTO modules (course_id, description, title, order_num)
VALUES (1, 'Concepts fondamentaux des réseaux informatiques.', 'Introduction aux Réseaux', 1);

INSERT INTO modules (course_id, description, title, order_num)
VALUES (1, 'Principes de base des réseaux de communication.', 'Fondamentaux du Réseautage', 2);

INSERT INTO modules (course_id, description, title, order_num)
VALUES (1, 'Compréhension du modèle de référence OSI.', 'Modèle OSI', 3);

INSERT INTO modules (course_id, description, title, order_num)
VALUES (1, 'Fonctionnement du modèle TCP/IP.', 'Modèle TCP/IP', 4);

INSERT INTO modules (course_id, description, title, order_num)
VALUES (1, 'Technologies et protocoles Ethernet.', 'LAN Ethernet', 5);







INSERT INTO chapters (module_id, title, description, quizGroupes)
VALUES (1, 'Historique des réseaux informatiques', 'Apprendre l\'histoire des réseaux et l\'innovation de l\'internet', 0);

INSERT INTO chapters (module_id, title, description, quizGroupes)
VALUES (1, 'Types de réseaux', 'Classification des différents types de réseaux informatiques', 0);

INSERT INTO chapters (module_id, title, description, quizGroupes)
VALUES (1, 'Composants d\'un réseau', 'Vue d\'ensemble des composants essentiels d\'un réseau', 0);

INSERT INTO chapters (module_id, title, description, quizGroupes)
VALUES (1, 'Topologies de réseau', 'Découverte des différentes structures de réseau', 0);



INSERT INTO quiz (chapter_id, question, answers, correct_answer, quiz_group, module_id) 
VALUES (1, 'Quelle année marque le début de l\'ARPANET, l\'un des premiers réseaux informatiques?', '["1969", "1972", "1980", "1990", "1950", "1975", "1985", "2000", "1960", "1970", "1977", "1995", "1965", "1982", "2005", "1979", "1989", "1992", "1967", "1973"]', '1969', 0, 1);

INSERT INTO quiz (chapter_id, question, answers, correct_answer, quiz_group, module_id) 
VALUES (1, 'Dans quel pays a été développé le réseau ARPANET?', '["États-Unis", "Royaume-Uni", "France", "Allemagne", "Canada", "Japon", "Australie", "Chine", "Russie", "Inde", "Brésil", "Italie", "Espagne", "Corée du Sud", "Mexique", "Suède", "Pays-Bas", "Singapour", "Suisse", "Norvège"]', 'États-Unis', 0, 1);

INSERT INTO quiz (chapter_id, question, answers, correct_answer, quiz_group, module_id) 
VALUES (1, 'Qui est souvent considéré comme le père de l\'ARPANET?', '["J.C.R. Licklider", "Vinton Cerf", "Tim Berners-Lee", "Larry Roberts", "Paul Baran", "Leonard Kleinrock", "Bob Kahn", "Ray Tomlinson", "Steve Crocker", "John Postel", "Doug Engelbart", "David Clark", "Whitfield Diffie", "Martin Hellman", "Jon Postel", "Paul Mockapetris", "Steve Crocker", "Tim Berners Lee", "Robert Metcalfe", "Radia Perlman"]', 'Larry Roberts', 1, 1);

INSERT INTO quiz (chapter_id, question, answers, correct_answer, quiz_group, module_id) 
VALUES (1, 'Quel était le principal objectif de la création d\'ARPANET?', '["Faciliter la communication entre les chercheurs", "Faciliter les transactions financières", "Faciliter les échanges commerciaux", "Faciliter les réunions virtuelles", "Faciliter la diffusion d\'informations gouvernementales", "Faciliter les transactions bancaires", "Faciliter l\'échange de courriels", "Faciliter l\'accès à l\'information", "Faciliter les achats en ligne", "Faciliter les recherches universitaires", "Faciliter la planification de projets", "Faciliter la gestion des ressources humaines", "Faciliter la gestion des stocks", "Faciliter la gestion des entreprises", "Faciliter les opérations militaires", "Faciliter les opérations de secours", "Faciliter les opérations de vente", "Faciliter les opérations de marketing", "Faciliter les opérations de logistique", "Faciliter les opérations de production"]', 'Faciliter la communication entre les chercheurs', 1, 1);

INSERT INTO quiz (chapter_id, question, answers, correct_answer, quiz_group, module_id) 
VALUES (1, 'Quelle institution a créé ARPANET?', '["Département de la Défense des États-Unis", "NASA", "IBM", "Microsoft", "Apple", "Google", "Facebook", "Amazon", "Intel", "HP", "Cisco", "Oracle", "DARPA", "NSF", "FBI", "CIA", "NSA", "NIST", "EPA", "DOE"]', 'Département de la Défense des États-Unis', 1, 1);








ALTER TABLE modules
ADD CONSTRAINT fk_course_id
FOREIGN KEY (course_id) REFERENCES courses(_id);


ALTER TABLE chapters
ADD CONSTRAINT fk_module_id
FOREIGN KEY (module_id) REFERENCES modules(_id);

ALTER TABLE quiz
ADD CONSTRAINT fk_chapter_id
FOREIGN KEY (chapter_id) REFERENCES chapters(_id);

ALTER TABLE quiz
ADD CONSTRAINT fk_quiz_module_id
FOREIGN KEY (module_id) REFERENCES modules(_id);





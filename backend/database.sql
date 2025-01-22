CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(60)            NOT NULL,
    token VARCHAR(255)           NOT NULL
);

CREATE TABLE posts
(
    id         SERIAL PRIMARY KEY,
    message    TEXT NOT NULL,
    media      TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id  INT  NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id)
);


DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    body VARCHAR NOT NULL
);

INSERT INTO posts (title, author, body)
VALUES
    ('Secret', 'MW', 'This is my secret story'),
    ('Hello', 'World', )

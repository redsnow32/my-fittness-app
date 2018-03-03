CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    age INTEGER,
    gender TEXT,
    Auth_id TEXT,
    email TEXT,
    height_cm INTEGER,
    current_weight INTEGER,
    challenge_id TEXT
);
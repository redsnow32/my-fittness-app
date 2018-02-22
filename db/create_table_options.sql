CREATE TABLE options(
id SERIAL PRIMARY KEY,
challenge_id TEXT,
user_id INTEGER,
challenge_option TEXT,
units TEXT,
points INTEGER
);
CREATE TABLE challenge_options(
id SERIAL PRIMARY KEY,
challenge_id TEXT,
option_id INTEGER,
user_id INTEGER
);
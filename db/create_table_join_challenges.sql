CREATE TABLE join_challenge(
id SERIAL PRIMARY KEY,
challenge_id TEXT,
user_id INTEGER,
option_id INTEGER,
log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
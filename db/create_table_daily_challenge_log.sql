CREATE TABLE daily_challenge_log(
id SERIAL PRIMARY KEY,
challenge_id TEXT,
user_id INTEGER,
log_date DATE,
points INTEGER)
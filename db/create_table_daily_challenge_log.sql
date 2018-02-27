CREATE TABLE daily_challenge_log(
id SERIAL PRIMARY KEY,
challenge_id TEXT,
user_id INTEGER,
log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
points INTEGER,
option_id INTEGER,
option_value TEXT)
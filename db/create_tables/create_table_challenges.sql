create table challenges(
id SERIAL PRIMARY KEY,
challenge_id TEXT,
user_id INTEGER,
group_name VARCHAR(40),
start_date DATE,
end_date DATE,
options_id INTEGER,
daily_points INTEGER,
total_points INTEGER,
reward_amount INTEGER
)
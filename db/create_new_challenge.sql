INSERT INTO challenges
(challenge_id, user_id, group_name, start_date, end_date, reward_amount)
VALUES
($1, $2, $3, $4, $5, $6);
RETURNING *;
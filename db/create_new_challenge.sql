INSERT INTO challenges
(challenge_id, user_id)
VALUES
($1, $2)
RETURNING *;
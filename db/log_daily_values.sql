INSERT INTO options
(challenge_id, user_id, option_id, option_value)
VALUES
($1, $2, $3, $4)
RETURNING*;

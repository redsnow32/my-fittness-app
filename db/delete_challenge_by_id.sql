DELETE FROM challenges
WHERE challenge_id = $1
RETURNING*;
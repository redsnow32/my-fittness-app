SET scale_img = $3
WHERE challenge_id = $1 AND id = $2
RETURNING*;
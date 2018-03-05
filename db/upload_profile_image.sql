UPDATE users
SET profile_img = $2
WHERE id = $1
RETURNING*;
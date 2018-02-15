UPDATE users
SET first_name = $1
WHERE auth_id = $2
RETURNING*;
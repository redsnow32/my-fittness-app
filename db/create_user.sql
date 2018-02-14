INSERT INTO users
(first_name, last_name, gender, Auth_id)
VALUES
($1, $2, $3, $4)
RETURNING *;
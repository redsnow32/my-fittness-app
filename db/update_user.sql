UPDATE users
SET first_name = $2, last_name = $3, age = $4, gender = $5, email=$6, height_cm = $7, current_weight = $8, birthdate = $9 
where id = $1
RETURNING *;
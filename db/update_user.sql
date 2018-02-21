UPDATE users
SET first_name = $2, last_name = $3, age = $4, height_cm = $5,current_weight = $6, birthdate = $7 
where id = $1
RETURNING *;
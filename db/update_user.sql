UPDATE users
SET first_name =$1, last_name=$2, age=$3, gender=$4, email=$5, height_cm=$6,current_weight=$7, challenge_id=$8 
where auth_id = $1;
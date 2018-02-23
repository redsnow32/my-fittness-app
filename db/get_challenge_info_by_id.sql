SELECT * 
FROM challenges c
JOIN challenge_options as co on c.challenge_id = co.challenge_id
JOIN options as o on co.option_id = o.id
JOIN users as u on c.challenge_id = u.challenge_id
WHERE u.auth_id = $1;
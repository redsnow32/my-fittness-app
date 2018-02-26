SELECT * 
FROM challenges c
JOIN challenge_options as co on c.challenge_id = co.challenge_id
JOIN options as o on co.option_id = o.id
WHERE c.challenge_id = $1;
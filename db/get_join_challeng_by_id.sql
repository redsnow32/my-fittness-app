SELECT * 
FROM users as u
JOIN join_challenge as jc on u.challenge_id = jc.challenge_id 
WHERE u.challenge_id = $1;
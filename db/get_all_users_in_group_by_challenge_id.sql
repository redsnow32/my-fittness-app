SELECT * 
FROM users as u
JOIN challenges as c on u.challenge_id = c.challenge_id 
WHERE u.challenge_id = $1;
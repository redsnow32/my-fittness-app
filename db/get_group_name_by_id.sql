SELECT group_name, challenge_id 
FROM challenges
WHERE user_id = $1;
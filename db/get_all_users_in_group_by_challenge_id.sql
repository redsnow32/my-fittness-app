SELECT first_name, last_name, jc.challenge_id
FROM join_challenges jc
JOIN users u on jc.challenge_id = u.challenge_id
WHERE u.challenge_id = $1;
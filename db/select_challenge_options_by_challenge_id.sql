SELECT *
FROM challenge_options AS co
JOIN daily_challenge_log AS dcl ON co.challenge_id = dcl.challenge_id
WHERE co.challenge_id = $1;
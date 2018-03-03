SELECT dcl.user_id, log_date, dcl.option_id, dcl.option_value, u.id
FROM daily_challenge_log AS dcl
JOIN users AS u ON dcl.user_id = u.id
WHERE dcl.challenge_id =$1;
SELECT jc.challenge_id, c.group_name first_name, last_name, daily_points, total_points, start_date, end_date
FROM join_challenge jc 
JOIN users as u on jc.user_id = u.id 
JOIN challenges as c on u.challenge_id = c.challenge_id
WHERE jc.challenge_id = $1;
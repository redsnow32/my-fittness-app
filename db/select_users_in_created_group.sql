SELECT c.group_name, first_name, last_name, c.challenge_id, daily_points, total_points
FROM join_challenge jc
JOIN challenges as c on jc.user_id = c.user_id
JOIN users as u on c.user_id = u.id
WHERE c.challenge_id = $1;
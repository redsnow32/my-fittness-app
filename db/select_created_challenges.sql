SELECT group_name, daily_points, total_points, start_date, end_date
FROM challenges
WHERE id = $1;
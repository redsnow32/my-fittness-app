SELECT scale_img
FROM daily_challenge_log as dcl
WHERE user_id = $1 and challenge_id = $2 and scale_img is not null;
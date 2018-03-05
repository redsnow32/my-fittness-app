SELECT sum(point_value)
FROM points as p
WHERE challenge_id IN (SELECT challenge_id
                        FROM daily_challenge_log as dcl
                        WHERE dcl.challenge_id = $1 and user_id = $2);

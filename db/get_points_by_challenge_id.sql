
select p.point_value, p.challenge_id, user_id, p.option_id, option_value, log_date
from daily_challenge_log as dcl
join points as p on dcl.option_id = p.option_id
where user_id = $1 and p.challenge_id = $2;
select * from daily_challenge_log as dcl
inner join points as p on dcl.option_id = p.option_id
where user_id = $1 and p.challenge_id =$2;
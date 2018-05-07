import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Create_Challenge from '../components/Create_Challenge';
import Join_Challenge from '../components/Join_Challenge';
import Group from '../components/Group';
import Daily from '../components/Daily';
import Group_Members from '../components/Group_Members';
import Scale_Img from '../components/Scale_Img';

const challengeRoutes = () => (
    <Router>
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/create_challenge" component={Create_Challenge} />
            <Route path="/join_challenge" component={Join_Challenge} />
            <Route path="/group" component={Group} />
            <Route path="/group/:challenge_id" component={Group} />
            <Route path="/scale_img_upload" component={Scale_Img} />
            <Route path="/daily" component={Daily} />
            <Route path="/daily/daily_log" component={Daily} />
            <Route path="/daily/daily_points" component={Daily} />
            <Route path="/daily/images" component={Daily} />
            <Route path="/daily/delete/:challenge_id" component={Daily} />
            <Route path="/group/group_members" component={Group_Members} />
        </Switch>
    </Router>
);
export default challengeRoutes;
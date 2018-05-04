import React from 'react';

import { Route, Switch, Router} from 'react-router-dom';

import Home from '../app/components/Home';
import NewDashboard from '../app/components/NewDashboard';

export default (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/newdashboard" component={NewDashboard}/>
        </Switch>
    </Router>
)

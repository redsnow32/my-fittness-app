import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import challengeRoutes from './challengeRoutes';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Edit from '../components/Edit';
import FileUpload from '../components/FileUpload';
import NewEdit from '../components/Edit/NewEdit';
import AppLayout from '../components/Edit/AppLayout';

const challenges = challengeRoutes();

const userRoutes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/edit" component={Edit} />
            <Route path="/fileupload" component={FileUpload} />
            <Route path="/newedit" component={NewEdit} />
            <Route path="/applayout" component={AppLayout} />
            { challenges }
        </Switch>
    </Router>
)
export default userRoutes;
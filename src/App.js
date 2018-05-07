import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NewEdit from './components/Edit/NewEdit';
import './styles/main.css';

import userRoutes from './routes/userRoutes';

const routes = userRoutes();


const App = (props) => {
    return (
      <Router >
        <Switch>
          { routes }
        </Switch>
      </Router>
    );
  };

export default App;

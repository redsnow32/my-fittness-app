import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Edit from './components/Edit/Edit';
import Create_Challenge from './components/Create_Challenge/Create_Challenge';
import Join_Challenge from './components/Join_Challenge/Join_Challenge';
import Group from './components/Group/Group';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/edit" component={Edit} />
            <Route path="/create_challenge" component={Create_Challenge} newID/>
            <Route path="/join_challenge" component={Join_Challenge} />
            <Route path="/group" component={Group} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

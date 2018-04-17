import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import Maintenance from './components/Maintenance';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Edit from './components/Edit';
import Create_Challenge from './components/Create_Challenge';
import Join_Challenge from './components/Join_Challenge';
import Daily from './components/Daily';
import Group from './components/Group';
import FileUpload from './components/FileUpload';
import Group_Members from './components/Group_Members';
import Scale_Img from './components/Scale_Img';
import NewDashboard from './components/NewDashboard';
import './styles/main.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <Switch>
            {/* <Route exact path="/" component={Maintenance}/> */}
            <Route exact path="/" component={Home} />
            <Route path="/newdashboard" component={NewDashboard}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/edit" component={Edit} />
            <Route path="/create_challenge" component={Create_Challenge} newID/>
            <Route path="/join_challenge" component={Join_Challenge} />
            <Route path="/group" component={Group} />
            <Route path="/group/:challenge_id" component={Group} />
            <Route path="/fileUpload" component={FileUpload} />
            <Route path="/scale_img_upload" component={Scale_Img} />
            <Route path="/daily" component={Daily} />
            <Route path="/daily/daily_log" component={Daily} />
            <Route path="/daily/daily_points" component={Daily} />
            <Route path="/api/daily/images" component={Daily} />
            <Route path="/api/daily/delete/:challenge_id" component={Daily} />
            <Route path="/group/group_members" component={Group_Members}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

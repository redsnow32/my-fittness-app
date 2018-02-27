import React, {Component} from 'react';
import { connect } from '../ducks/reducer';
import axios from 'axios';
import Header from './Header'
import Daily from './Daily';

class Group extends Component{
    constructor(props){
    super(props)
    this.state={
        challenges:[]
    }
    }
    componentDidMount(){
        let challengeList = axios.get('/api/group').then(res=>{
            console.log(res.data)
            this.setState({challenges:res.data})
        })
    }
 render(){
     console.log(this.state)
        let currentChallenges = this.state.challenges.map((challenge,i)=>{
            return <li key={i}>Group Name:   {challenge.group_name}
                {/* <li key={i}>{challenge}</li> */}
                </li>
        })
        return(
            <div>
                <Header />
                <h1>
                    This is rendering</h1>
                    <Daily />
                    <br />
                    <div>{currentChallenges}</div>
            </div>
        )
    }
}

export default Group 


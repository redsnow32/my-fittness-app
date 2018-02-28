import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dailyLog } from '../ducks/reducer';
import axios from 'axios';
import Header from './Header'
import Daily from './Daily';

class Group extends Component {
    constructor(props) {
        super(props)
        this.state = {
            challenges: [],

        }
    }
    componentDidMount() {
        const{selectedChallengeId} = this.props
        let challengeList = axios.get(`/api/group/${selectedChallengeId}`).then(res => {
            console.log(res.data)
            this.setState({ challenges: res.data })
        })
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        let currentChallenges = this.state.challenges.map((challenge, i) => {
            return <li key={i}>Group Name:   {challenge.first_name} {challenge.last_name}{challenge.start_date} {challenge.end_date}
                {/* <li key={i}>{challenge}</li> */}
            </li>
        })
        return (
            <div>
                <Header />
                <Daily />
                <br />
                <div>{currentChallenges}</div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        selectedChallengeId:state.selectedChallengeId
    }
}
export default connect(mapStateToProps)(Group)


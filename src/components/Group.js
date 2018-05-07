import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        const { selectedChallengeId } = this.props
        axios.get(`/group/${selectedChallengeId}`).then(res => {
            console.log(res.data)
            this.setState({ challenges: res.data })
        })
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        let currentChallenges = this.state.challenges.map((challenge, i) => {
            return <li key={i}>Group Name:  {challenge.group_name} Name:{challenge.first_name} {challenge.last_name} Todays Points: {challenge.daily_points} Total Points: {challenge.total_points} Start Date:{challenge.start_date} End Date:{challenge.end_date}</li>
        })
        return (
            <div class_name="Group">
                <div className="Group_container">
                    <Header />
                    <Daily />
                    <br />
                    <div>
                        <h1>People in the challenge:</h1>
                    </div>
                    <div>{currentChallenges}</div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        selectedChallengeId: state.selectedChallengeId
    }
}
export default connect(mapStateToProps)(Group)


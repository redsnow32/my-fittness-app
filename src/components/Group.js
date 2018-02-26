import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { dailyLog } from '../ducks/reducer';
import Scale_Img from './Scale_Img';
class Group extends Component {
    constructor() {
        super()
        this.state = {
            challenge: [],
            dailyLog: []
        }
    }
    componentDidMount() {
        let challengeInfo = axios.get(`/api/group/${this.props.selectedChallengeId}`).then(res => {
            return this.setState({ challenge: res.data })
        })
    }
    handleUpdate(e) {
        this.state.challenge.map((challenge, i) => {
            if (challenge.id == e.target.name) {
                this.setState({ [challenge.id]: e.target.value })
            }
        })
    }
    handleUpload(e) {
        console.log(e.target.value)
        this.state.challenge.map((challenge, i) => {
            if (challenge.id == e.target.name) {
                this.setState({ [challenge.id]: e.target.value })
            }
        })
    }
    handleSettingState(e) {
        let challengeLog = this.state.challenge;
        this.props.dailyLog(challengeLog);
    }
    render() {
        // const styles = {
        //     row: {
        //         display: 'flex',
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         justifyContent: 'space-between'
        //     }
        // }
        // const options = this.props.selectChallenge()
        // let challengeOption = this.props.selectChallenge().map((challenge, i) => {

        //     if (challenge.id) {
        //         return <li key={i} value={challenge.option_id}
        //             onChange={(e) => this.handleChange(e)}>{}</li>

        //     }
        // })
        // console.log(challengeInfo)
        console.log(this.state)
        const { challenge } = this.state
        let challengeOptions = challenge.map((chal, i, self) => {
            // console.log(chal.id)
            return chal.id!==4 ? <li key={i}>{chal.challenge_option}<input name={chal.id} onChange={(e) => this.handleUpdate(e)}></input></li> : <li key={i}>{chal.challenge_option}<Scale_Img name={chal.id} onChange={(e) => this.handleUpload(e)} /></li>
            
            
            // if (chal.id === 4) {
            // } else if (chal.id !== 7) {
            // }

        })

        return (
            <div>
                <div><Header /></div>

                <h1>{this.props.selectedChallengeId}Test</h1>
                <div>{challengeOptions}</div>
                <div><button onClick={(e) => this.handleSettingState(e)}>save</button></div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        // options: state.options,
        // challenge_id:state.challenge,
        selectedChallengeId: state.selectedChallengeId,
        dailyLog: state.daily_log
    }
}
export default connect(mapStateToProps, { dailyLog })(Group);


// /api/daily/daily_log
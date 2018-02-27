import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { dailyLog } from '../ducks/reducer';
import Scale_Img from './Scale_Img';
class Daily extends Component {
    constructor() {
        super()
        this.state = {
            challenge: [],
            options: ['', '', '', '', '', '', '', '', '','','','',''],
        }
    }
    componentWillMount() {
        let challengeInfo = axios.get(`/api/daily/${this.props.selectedChallengeId}`).then(res => {
            return this.setState({ challenge: res.data })
        })
    }
    handleUpdate(e) {
        const { value } = e.target
        
        let newOptions = this.state.options.slice();

        let values = this.state.challenge.map((challenge, i) => {
            const { id, challenge_option, units } = challenge
            if (challenge.id == e.target.name) {
                newOptions.splice([i], 1, { id: id, value: e.target.value })
                this.setState({ options: newOptions })
            } else if(i===0){
                newOptions.splice(0, 1, {challenge_id:challenge.challenge_id})
            }
            return values
        })
        console.log(newOptions)
    }
    handleUpload(e) {
        console.log(e.target.value)
        const { challenge } = this.state
        challenge.forEach((challenge, i) => {
            if (challenge.id == e.target.name) {
                this.setState({ [this.state.options]: { id: [challenge.id], value: e.target.value } })
            }
        })
    }
    handleSettingState(e) {
        let challengeLog = this.state.options
        this.props.dailyLog(challengeLog)

    }
    handleCancel() {
        let { challenge } = this.state
        challenge.forEach((challenge, i) => {
            if (challenge.id) {
                this.setState({ [challenge.id]: '' })
            }
        })
    }
    render() {
        console.log(this.state)
        const { challenge } = this.state
        let challengeOptions = challenge.map((chal, i, self) => {
            if (chal.id === 4) {
                return <li key={i}>{chal.challenge_option}<Scale_Img name={chal.id} onChange={(e) => this.handleUpload(e)} /></li>
            } else if (chal.id !== 7) {
                return <li key={i}>{chal.challenge_option}<input name={chal.id} onChange={(e) => this.handleUpdate(e)}></input></li>
            }

        })

        return (
            <div>
                {/* <div><Header /></div> */}

                <h1>{this.props.selectedChallengeId}Test</h1>
                <div>{challengeOptions}</div>
                <div><button onClick={(e) => this.handleSettingState(e)}>save</button></div>
                <div><button onClick={(e) => this.handleCancel(e)}>cancel</button></div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        selectedChallengeId: state.selectedChallengeId,
        dailyLog: state.daily_log
    }
}
export default connect(mapStateToProps, { dailyLog })(Daily);
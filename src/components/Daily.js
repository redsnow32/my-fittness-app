import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { dailyLog, selectChallenge } from '../ducks/reducer';
import Scale_Img from './Scale_Img';

const initialState = {
    challenge: [],
    options: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    filter: false
}
class Daily extends Component {
    constructor() {
        super()
        this.state = initialState
        // {
        //     challenge: [],
        //     options: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        //     selectedChallenge: '',
        //     filter: false
        // }
    }
    componentDidMount() {
        const { selectedChallengeId } = this.props
        if ((`/api/group/${selectedChallengeId}`)) {

            let challengeInfo = axios.get(`/api/daily/${selectedChallengeId}`).then(res => {
                return this.setState({ challenge: res.data, filter:true })
            })

        } else {
            this.setState({ challenge: [], selectedChallenge: '', filter: false })
        }
    
    }
    
    handleUpdate(e) {
        const { value } = e.target

        let newOptions = this.state.options.slice();

        let values = this.state.challenge.map((challenge, i) => {
            const { id, challenge_option, units } = challenge
            if (challenge.id == e.target.name) {
                newOptions.splice([i], 1, { id: id, value: e.target.value })
                this.setState({ options: newOptions })
            } else if (i === 0) {
                newOptions.splice(0, 1, { challenge_id: challenge.challenge_id })
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
        this.setState({state:initialState})

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
        const { selectedChallengeId } = this.props
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
                {
                    this.state.filter === true
                        ?
                        <h1>{this.props.selectedChallengeId}Test</h1>
                        :
                        null
                }

                <div>{challengeOptions}</div>
                {
                    this.state.filter === true
                        ?
                        <div><button onClick={(e) => this.handleSettingState(e)}>save</button></div>
                        :
                        null
                }
                {
                    this.state.filter === true
                        ?
                        <div><button onClick={(e) => this.handleCancel(e)}>cancel</button></div>
                        :
                        null
                }

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        selectedChallengeId: state.selectedChallengeId,
        dailyLog: state.daily_log,
        userChallenge: state.selected_challenge
    }
}
export default connect(mapStateToProps, { dailyLog, selectChallenge })(Daily);
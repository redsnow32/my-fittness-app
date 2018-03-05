import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { dailyLog, selectChallenge } from '../ducks/reducer';
import Scale_Img from './Scale_Img';

class Daily extends Component {
    constructor() {
        super()
        this.state = {

            challenge: [],
            options: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
            selectedChallenge: '',
            points: []
        }

    }
    componentDidMount() {
        const { selectedChallengeId } = this.props
        axios.all([
            axios.get(`/api/daily/${selectedChallengeId}`),
            axios.get(`/api/daily/daily_points/${selectedChallengeId}`)
        ])
            .then(axios.spread((options, points) => {
                console.log(points.data, "THIS IS THE POINTS", options.data, "THESE ARET THE OPTIONS")

                this.setState({ challenge: options.data, points: points.data })

            })

            )
        // this.setState({ challenge: res.data })


    }

    handleUpdate(e) {
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
    }
    handleUpload(e) {
        console.log(this.state)
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
        let { options } = this.state
        options.map((challenge, i) => {
            if (challenge.id) {
                this.setState({ [challenge.value]: '' })
            }
        })
    }
    render() {
        console.log(this.state)
        const { selectedChallengeId } = this.props
        const { challenge, points } = this.state
        let totalPoints = points.map((point, i) => {
            return <h4 key={i}>{point.sum}</h4>
        })

        let challengeOptions = challenge.map((chal, i, self) => {
            if (chal.id === 4) {
                return <li key={i}>{chal.challenge_option}<Scale_Img name={chal.id} onChange={(e) => this.handleUpload(e)} /></li>
            } else if (chal.id !== 7) {
                return <li key={i}>{chal.challenge_option} ({chal.units})<input type="number" name={chal.id} onChange={(e) => this.handleUpdate(e)} /></li>
            }

        })
        return (
            <div>
                <div>
                    <h1>Challenge ID:  {this.props.selectedChallengeId}</h1>
                    <div>{challengeOptions}</div>
                    <div><button onClick={(e) => this.handleSettingState(e)}>save</button></div>
                    <div><button onClick={(e) => this.handleCancel(e)}>cancel</button></div>
                </div>
                <div>
                    {totalPoints}
                </div>
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
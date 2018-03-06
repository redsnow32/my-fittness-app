import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { dailyLog, selectChallenge, deleteChallenge } from '../ducks/reducer';
import Scale_Img from './Scale_Img';

class Daily extends Component {
    constructor() {
        super()
        this.state = {

            challenge: [],
            options: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
            selectedChallenge: '',
            points: [],
            images: []
        }

    }
    componentDidMount() {
        const { selectedChallengeId } = this.props
        this.setState({selectedChallenge:selectedChallengeId})
        console.log(this.props)
        axios.all([
            axios.get(`/api/daily/${selectedChallengeId}`),
            axios.get(`/api/daily/daily_points/${selectedChallengeId}`),
            axios.get(`/api/daily/images/${selectedChallengeId}`)
        ])
            .then(axios.spread((options, points, images) => {
                console.log(points.data, "THIS IS THE POINTS", options.data, "THESE ARET THE OPTIONS", images.data, "THIs is sthe image data")

                this.setState({ challenge: options.data, points: points.data, images: images.data })

            })
        )
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
    handleDelete(e) {
        console.log(e)
        const { selectedChallengeId } = this.props
        console.log(selectedChallengeId)
        this.props.deleteChallenge(this.state.selectedChallenge);
    }
    render() {
        console.log(this.state)
        const { selectedChallengeId } = this.props
        const { challenge, points } = this.state
        let totalPoints = points.map((point, i) => {
            return <h4 key={i}>{point.sum}</h4>
        })
        let image = challenge.map((img, i) => {
            if (img.id === 4) {
                return <div className="uploader" key={i}>{img.challenge_option}<div className="options_div"><Scale_Img id="Scale" name={img.id} onChange={(e) => this.handleUpload(e)} /></div></div>
            }
        })
        let challengeOptions = challenge.map((chal, i, self) => {
            if (chal.id === 4) {
                null// return <div className="uploader" key={i}>{chal.challenge_option}<div className="options_div"><Scale_Img id="Scale"name={chal.id} onChange={(e) => this.handleUpload(e)} /></div></div>
            } else
                if (chal.id !== 7) {
                    return <div key={i} className="options"><div className="option" key={i}>{chal.challenge_option} ({chal.units})<div className="options_div"></div><input className="options_input" type="number" name={chal.id} onChange={(e) => this.handleUpdate(e)} /></div></div>
                }

        })
        return (
            <div className="Daily">
                <div className="Daily_container">
                    <div>{totalPoints}</div>
                    <h1>Challenge ID: {this.props.selectedChallengeId}</h1>
                    <div className="image">{image}</div>
                    {/* <div className="image_container"> */}
                    <div className="images"></div>
                    <div className="images"></div>
                    <div className="images"></div>
                    <div className="images"></div>
                    <div className="images"></div>
                    {/* </div> */}
                    <div className="challenge_options">{challengeOptions}</div>
                    <div className="daily_save"><button onClick={(e) => this.handleSettingState(e)}>SAVE</button></div>
                    <div className="daily_cancel"><button onClick={(e) => this.handleCancel(e)}>CANCEL</button></div>
                    <div className="daily_delete"><button onClick={(e) => this.handleDelete(e)}>DELETE</button></div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        selectedChallengeId: state.selectedChallengeId,
        dailyLog: state.daily_log,
        userChallenge: state.selected_challenge,
        deleteChallenge: state.selected_challenge
    }
}
export default connect(mapStateToProps, { dailyLog, selectChallenge, deleteChallenge })(Daily);
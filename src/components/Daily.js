import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { connect, 
    // dailyLog 
} from 'react-redux';
class Daily extends Component {
    constructor() {
        super()
        this.state={
            challenge:[]
        }
    }
    componentDidMount(){
       let challengeInfo = axios.get(`/api/group/${this.props.selectedChallengeId}`).then(res=>{
        return this.setState({challenge:res.data})
    })
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
        const {challenge} = this.state
        let challengeOptions = challenge.map((chal, i, self)=> {
            return <li key={i}>{chal.challenge_option}<input></input></li>
        })
    
        return (
            <div>
                <div><Header /></div>
                
                <h1>{this.props.selectedChallengeId}Test</h1>
                <div>{challengeOptions}</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        // options: state.options,
        // challenge_id:state.challenge,
        selectedChallengeId:state.selectedChallengeId
    }
}
export default connect(mapStateToProps, 
    // {dailyLog}
)(Daily);
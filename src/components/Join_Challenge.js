import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { joinChallenge } from '../ducks/reducer';
import Header from './Header';

class Join_Challenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            join_challenge_id: ''
        }
        this.handleChallengeSubmit = this.handleChallengeSubmit.bind(this)
    }
    handleChallengeId(e) {
        console.log(e.target.value)
        this.setState({ join_challenge_id: e.target.value })
    }
    handleChallengeSubmit(e) {
        console.log(e)
        console.log()
        let challenge_id = this.state.join_challenge_id
        console.log(challenge_id)
        this.props.joinChallenge(challenge_id)
    }
    // handleSettingRedux(e){
    //     this.props.joinChallenge(this.state) 
    // }
    render() {
        return (
            <div className="Join_Challenge">
            
                <div className="join_image_container">
                {/* <div className="image_overlay"> */}
                        <Header />
                        <div className="join_container">
                            <form className="join_form" onSubmit={(e) => this.handleChallengeSubmit(e)}>
                                <label/>Enter Challenge ID:  <input onChange={(e) => this.handleChallengeId(e)} />
                                <div className="form_space">
                                    {/* <Link to="/dashboard"> */}
                                    <input className="submit"type="submit" />
                                    {/* </Link> */}
                                </div>
                            </form>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        joinChallenge: state.join_challengeId
    }
}
export default connect(mapStateToProps, { joinChallenge })(Join_Challenge)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { joinChallenge } from '../ducks/reducer';
import Header from './Header';

class Join_Challenge extends Component {
    constructor(props){
        super(props)
        this.state={
            join_challenge_id:''
        }
        this.handleChallengeSubmit = this.handleChallengeSubmit.bind(this)
    }
    handleChallengeId(e){
        this.setState({join_challenge_id:e.target.value})
    }
    handleChallengeSubmit(event){
        console.log(event)
        console.log(this.props)
        event.preventDefault();
        const {join_challenge_id} = this.state
        console.log(join_challenge_id)
       this.props.joinChallenge(join_challenge_id) 
    }
    render() {
        return (
            <div className="Join_Challenge">
                <div><Header /></div>
                <div className="join_container">
                    <form onSubmit={this.handleChallengeSubmit}>
                        <label>Enter Challenge ID:  <input onChange={(e)=>this.handleChallengeId(e)}/></label>
                        <Link to="/group"><input type="submit" /></Link>
                    </form>
                    
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        joinChallenge: state.challenge
    }
}
export default connect(mapStateToProps, {joinChallenge})(Join_Challenge)
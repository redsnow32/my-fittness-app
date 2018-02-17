import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createChallenge } from '../../ducks/challenge_reducer';
import Header from '../Header/Header';


import './Create_Challenge.css';


class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            challengeID: ''
        }
    }
    render() {
        const { challengeData } = this.props
        function generateChallengeID() {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var challenge_length = 10;
            var randID = '';
            for (var i = 0; i < challenge_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randID += chars.substring(rnum, rnum + 1);

            }
            return randID
        }
        let newChallengeID = generateChallengeID()
        return (
            <div className="create_container">
                <div><Header /></div>
                <div className="create_grandparent_container">
                    <div className="create_parent_left">
                        <div className="create_children_left">
                            <div className="create_child_left1"></div>
                            <div className="create_child_left2">test</div>
                            <div className="create_child_left3">test</div>
                            <div className="create_child_left4">test</div>
                            <div className="create_child_left5">test</div>
                            <div className="create_child_left6">test</div>
                            <div className="create_child_left7">test</div>
                        </div>
                    </div>
                    <div className="create_parent_right">
                        <div>
                            <div>ChallengeID:</div>
                            <div>{newChallengeID}</div>
                    </div>
                    <div className="create_children_right">
                        <div className="create_child_right1">test</div>
                        <div className="create_child_right2">test</div>
                        <div className="create_child_right3">test</div>
                        <div className="create_child_right4">test</div>
                        <div className="create_child_right5">test</div>
                        <div className="create_child_right6">test</div>
                        <div className="create_child_right7">test</div>
                    </div>
                </div>
            </div>
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        challengeData: state.challenge
    }
}
export default connect(mapStateToProps, { createChallenge })(Create) 
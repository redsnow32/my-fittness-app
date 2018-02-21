import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createChallenge, getUser } from '../ducks/reducer';
import Header from './Header';


class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            challengeID: '',
            groupName: '',
            startDate: '',
            endDate: '',
            scaleImg: false,
            waterIntake: false,
            calorieIntake:false,
            dailyWeight:false,
            weightLoss: false,
            exercise: false,
            rewardAmount: '',
            collectionType:'',
            paymentRequired:false
            
        }
    }
    componentDidMount() {
        this.props.getUser();

    }
    createChallengeID(props) {
        const { userData } = this.props
        axios.put(`/api/create_challenge/${userData.id}`).then(res => {
            console.log(res.data)
        })
    }
    handleRewardChange(e) {
        this.setState({ rewardAmount: e.target.value })
    }
    handleGroupNameChange(e) {
        this.setState({ groupName: e.target.value })
    }
    render() {
        // const { challengeData } = this.props
        // function generateChallengeID() {
        //     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        //     var challenge_length = 10;
        //     var randID = '';
        //     for (var i = 0; i < challenge_length; i++) {
        //         var rnum = Math.floor(Math.random() * chars.length);
        //         randID += chars.substring(rnum, rnum + 1);

        //     }
        //     return randID
        // }
        // let newChallengeID = generateChallengeID()
        let { userData } = this.props
        console.log(this.state)
        return (
            <div className="create_container">
                <div><Header /></div>
                <div className="create_grandparent_container">
                    <div className="create_parent_left">
                        <div className="create_children_left">
                            <div className="create_child_left1">Group Name:</div>
                            <div className="create_child_left1_props">
                                <input name="groupName" type="text" onChange={(e) => this.handleGroupNameChange(e)} />
                            </div>
                            <div className="create_child_left2">Scale Img</div>
                            <div className="create_child_left2_props">
                            <label>
                                    Yes
                            <input name="scaleYes" type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input name="scaleNo" type="checkbox">
                                    </input>
                                </label>
                            </div>
                            <div className="create_child_left3">Water Intake (mL):</div>
                            <div className="create_child_left3_props">
                            <label>
                                    Yes
                            <input name="exerciseIsRequired" type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input name="exerciseNotRequired" type="checkbox">
                                    </input>
                                </label>
                            </div>
                            <div className="create_child_left4">Calorie Intake (kcal):</div>
                            <div className="create_child_left4_props">
                            <label>
                                    Yes
                            <input name="exerciseIsRequired" type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input name="exerciseNotRequired" type="checkbox">
                                    </input>
                                </label>
                            </div>
                            <div className="create_child_left5">Record Daily Weight</div>
                            <div className="create_child_left5_props">
                            <label>
                                    Yes
                            <input name="exerciseIsRequired" type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input name="exerciseNotRequired" type="checkbox">
                                    </input>
                                </label>
                            </div>
                            <div className="create_child_left6"></div>
                            {/* <div className="create_child_left6_props">stuff_props</div>
                            <div className="create_child_left7"></div>
                            <div className="create_child_left7_props">test</div> */}

                        </div>
                        <div>
                            <button onClick={(e) => this.createChallengeID(e)}>Create Challenge!</button>
                        </div>
                    </div>
                    <div className="create_parent_right">
                        <div>
                            <div>ChallengeID:</div>
                            {/* <div>{newChallengeID}</div> */}
                            <div></div>
                        </div>
                        <div className="create_children_right">
                            <div className="create_child_right1">Weight Loss:</div>
                            <div className="create_child_right1_props">
                                <label>
                                    Yes
                            <input name="weightLossIsRequired" type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input name="weightLossNotRequired" type="checkbox">
                                    </input>
                                </label>
                            </div>
                            <div className="create_child_right2">Exercise:</div>
                            <div className="create_child_right2_props">

                            <label>
                                    Yes
                            <input name="exerciseIsRequired" type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input name="exerciseNotRequired" type="checkbox">
                                    </input>
                                </label>

                                </div>

                            <div className="create_child_right3">Reward Amount:</div>
                            <div className="create_child_right3_props">
                                <input name="rewardAmount" type="text" onChange={(e) => this.handleRewardChange(e)} />
                            </div>
                            <div className="create_child_right4">Collection Type:</div>
                            <div className="create_child_right4_props">
                                <select>
                                    <option>Cash</option>
                                    <option>Creditcard</option>
                                    <option>Venmo</option>
                                </select>
                            </div>
                            <div className="create_child_right5">Payment Required Prior To Start Date:</div>
                            <div className="create_child_right5_props">
                                <label>
                                    Yes
                            <input type="checkbox">
                                    </input>
                                </label>
                                <label>
                                    No
                            <input type="checkbox">
                                    </input>
                                </label>
                            </div>
                            {/* <div className="create_child_right6">test</div>
                            <div className="create_child_right6_props">test</div>
                            <div className="create_child_right7">test</div>
                            <div className="create_child_right7_props">test</div>
                            <div className="create_child_right8">test</div> */}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        challengeData: state.challenge,
        userData: state.user
    }
}
export default connect(mapStateToProps, { createChallenge, getUser })(Create) 
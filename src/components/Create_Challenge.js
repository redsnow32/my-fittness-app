import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { createChallenge, getUser } from '../ducks/reducer';
import Header from './Header';


class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            challengeID: '',
            groupName: '',
            startDate: new Date(),
            endDate: new Date(),
            rewardAmount: '',
            collectionType: '',
            paymentRequired: false,
            options: [
                { id: 1, optionName: 'water_intake', units: 'mL', points: 5 },
                { id: 2, optionName: 'caloric_intake', units: 'lbs', points: 5 },
                { id: 3, optionName: 'exercise', units: false, points: 5 },
                { id: 4, optionName: 'scale_img', units: false, points: 5 },
                { id: 5, optionName: 'weight', units: 'lbs', points: 5 },
                { id: 6, optionName: 'collection_required', units: false, points: 5 }
            ],
            challengeOptions: [],
            selected: []
        }
        // this.handleClicked=this.handleClicked.bind(this)
    }
    componentDidMount() {
        this.props.getUser();
        axios.get('/api/create_challenge/options').then(res => {
            this.setState({ challengeOptions: res.data })
        })
    }

    createChallengeID(props) {
        let challenge = this.state
        let userData = this.props
        this.props.createChallenge(challenge, userData.id)
    }
    handleClicked(value) {
        this.setState({ selected: value })
        function checkSelected(selected, value) {
            console.log(selected)
            for (let i = 0; i < selected.length; i++) {
                console.log(selected[i])
                if (selected[i] === value) {
                    selected.splice(selected[i])
                } else {
                    this.setState({ selected: value })
                }
            }
        }

    }
    handleRewardChange(e) {
        this.setState({ rewardAmount: e.target.value })
    }

    handleGroupNameChange(e) {
        this.setState({ groupName: e.target.value })
    }

    handleChecks(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name
        this.setState({ [name]: value })
    }

    handleStartDate(e) {
        this.setState({ startDate: e })
    }

    handleEndDate(e) {
        this.setState({ endDate: e })
    }

    handleCollection(e) {
        this.setState({ collectionType: e.target.value })
    }

    handleUserID(props) {
        console.log(this.props.user)
        this.setState({ user_id: this.props.userData.id })
    }

    render() {
        let { userData } = this.props
        console.log(this.state.selected)
        // let id = this.state.challengeOptions.filter((option,i)=>{
        //     return option.id
        // })
        // console.log(id)

        let options = this.state.challengeOptions.map((option, i) => {
            return <h4 key={i} onClick={(e) => this.handleClicked(option.id)}>{option.challenge_option.split("_").join(' ')}</h4>
        })
        return (
            <div className="create_container">
                <div><Header /></div>
                <div>
                    {options}
                </div>
                <div className="create_grandparent_container">
                    <div className="create_parent_left">
                        <div className="startDate">
                            <label> Start Date
                                    <DatePicker className="challenge_start_date" name="startDate" value={this.state.startDate} onChange={(e) => this.handleStartDate(e)} />
                            </label>
                        </div>
                        <div className="create_children_left">
                            <div className="create_child_left1">Group Name:</div>
                            <div className="create_child_left1_props">
                                <input name="groupName" type="text" onChange={(e) => this.handleGroupNameChange(e)} />
                            </div>
                            <div className="create_child_left2">Scale Img</div>
                            <div className="create_child_left2_props">
                                <label>
                                    Yes
                            <input name="scaleImg" type="checkbox" checked={this.state.scaleImg} onChange={(e) => this.handleChecks(e)}>
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
                            <input name="waterIntake" type="checkbox" checked={this.state.waterIntake} onChange={(e) => this.handleChecks(e)}>
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
                            <input name="calorieIntake" type="checkbox" checked={this.state.calorieIntake} onChange={(e) => this.handleChecks(e)}>
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
                            <input name="dailyWeight" type="checkbox" checked={this.state.dailyWeight} onChange={(e) => this.handleChecks(e)}>
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
                            <Link to="/dashboard"><button onClick={(e) => this.createChallengeID(e)}>Create Challenge!</button></Link>
                        </div>
                    </div>
                    <div className="create_parent_right">
                        <div>
                            <label> End Date
                                <DatePicker className="challenge_end_date" name="endDate" value={this.state.endDate} onChange={(e) => this.handleEndDate(e)} />
                            </label>


                        </div>
                        <div className="create_children_right">
                            <div className="create_child_right1">Weight Loss:</div>
                            <div className="create_child_right1_props">
                                <label>
                                    Yes
                            <input name="weightLoss" type="checkbox" checked={this.state.weightLoss} onChange={(e) => this.handleChecks(e)}>
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
                            <input name="exercise" type="checkbox" checked={this.state.exercise} onChange={(e) => this.handleChecks(e)}>
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
                                <select value={this.state.value} onChange={(e) => this.handleCollection(e)}>
                                    <option value="">--Select Option</option>
                                    <option value="creditcard">Creditcard</option>
                                    <option value="cash">Cash</option>
                                    <option value="venmo">Venmo</option>
                                </select>
                            </div>
                            <div className="create_child_right5">Payment Required Prior To Start Date:</div>
                            <div className="create_child_right5_props">
                                <label>
                                    Yes
                            <input name="paymentRequired" type="checkbox" checked={this.state.paymentRequired} onChange={(e) => this.handleChecks(e)}>
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
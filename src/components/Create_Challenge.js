import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { createChallenge, getUser, createOptions } from '../ducks/reducer';
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
            rewardAmount: 0,
            collectionType: '',
            paymentRequired: false,
            options: {},
            challengeOptions: [],
            challengePoints: [],
            selected: [],
            points: [],
            customOptions: []
        }
    }
    componentDidMount() {
        this.props.getUser();

        axios.all([
            axios.get('/api/create_challenge/options'),
            axios.get('/api/create_challenge/points')
        ])
            // axios.get('/api/create_challenge/options')
            .then(axios.spread((options, points) => {
                console.log(options.data)
                this.setState({ challengeOptions: options.data, challengePoints: points.data })
            })

            )
    }

    createChallengeID(props) {
        let challenge = this.state
        let userData = this.props
        let options = this.state.selected

        this.props.createChallenge(challenge, options)
    }
    handleClicked(value) {
        console.log(value)
        let coppied = this.state.selected.slice()
        let copt = coppied.find(c => c.id === value)
        if (copt) {
            coppied = coppied.filter(c => c.id !== copt.id)
        } else {
            coppied.push({ id: value, value: 0 })
        }
        this.setState({ selected: coppied })

    }
    handlePoints(e) {
        let { name, value } = e.target
        name = name * 1
        let coppied = this.state.selected.slice()
        let index
        let copt = coppied.find((c, i) => {
            if (c.id === name) {
                index = i
                return true
            } else {
                return false
            }
        })
        if (copt) {
            coppied[index].value = value * 1
        } else {
            coppied.push({ id: name, value: value * 1 })
        }

        this.setState({ selected: coppied })

    }
    checkForMultiples(selected) {
        console.log(this.selected)
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
    handleCustom(e) {

        // console.log(e)
        // let coppied = this.state.customOptions.slice()
        // let copt = coppied.find(c => c)
        // if (copt) {
        //     coppied = coppied.filter(c => c)
        //     coppied.push({ id: c.id, [name]: e.target.name })
        // }
        // if(id){
        //     coppied.push({[id]:e.target.value})
        // }
        // let coppied = this.state.customOptions.slice()
        // if(id===1) {
        //     coppied.push({id:1, pionts:e.target.value})
        // } else if(id===2){
        //     coppied.push({id:2 })
        // }
        // this.setState({customOptions:copt})
    }

    render() {
        let { userData } = this.props
        console.log(this.state)
        let { selected } = this.state
        let options = this.state.challengeOptions.map((option, i) => {
            const { id } = option
            return <div><div key={i} style={{ color: selected.map(c => c.id).includes(option.id) ? 'red' : 'black' }} key={option.id} onClick={(e) => this.handleClicked(option.id)}>{selected.map(c => c.id).includes(option.id) && '✓'}{option.challenge_option.split("_").join(' ')}</div><input type="number" name={option.id} value={selected.find(c => c.id === option.id) && selected.find(c => c.id === option.id).value} onChange={(e) => this.handlePoints(e)} /></div>
        })
        // let customOpt = this.state.customOptions.map((opt,i)=>{
        //     <div key={opt.id} >{}<input type="text" /></div>
        // })
        return (
            <div className="Create">
                <div className="create_img_container">
                    <div><Header /></div>
                    </div>
                    <br />
                    <div className="create_container">
                    <div className="create_parent_left">
                        <div className="startDate">
                            <label> Start Date
                                    <DatePicker className="challenge_start_date" name="startDate" value={this.state.startDate} onChange={(e) => this.handleStartDate(e)} />
                            </label>
                        </div>
                        <div>
                            <label> End Date
                                <DatePicker className="challenge_end_date" name="endDate" value={this.state.endDate} onChange={(e) => this.handleEndDate(e)} />
                            </label>
                        </div>
                        <div className="create_children_left">
                            <div className="create_child_left1">Group Name:</div>
                            <div className="create_child_left1_props">
                                <input name="groupName" type="text" onChange={(e) => this.handleGroupNameChange(e)} />
                            </div>
                            <div className="create_child_left4">Collection Type:</div>
                            <div className="create_child_left4_props">
                                <select value={this.state.value} onChange={(e) => this.handleCollection(e)}>
                                    <option value="">--Select Option</option>
                                    <option value="creditcard">Creditcard</option>
                                    <option value="cash">Cash</option>
                                    <option value="venmo">Venmo</option>
                                </select>
                            </div>
                            <div className="create_child_left3">Reward Amount:</div>
                            <div className="create_child_left3_props">
                                <input name="rewardAmount" type="text" onChange={(e) => this.handleRewardChange(e)} />
                            </div>
                            <div className="create_child_left2">Select Point Options:</div>
                            <div className="create_child_left2_props">
                                <div>{options}</div>
                                <br />
                                {/* <div className="create_child_left3">Add custom option (optional):<input type="text" name="option"onChange={(e)=>this.handleCustom({id:1, option:e.target.value})}/><input type="number" name="points" onChange={(e)=>this.handleCustom({id:2, points:e.target.value})}/></div> */}
                            </div>
                            <div className="create_child_left5">
                                <Link to="/dashboard"><button onClick={(e) => this.createChallengeID(e)}>Create Challenge!</button></Link>
                            </div>
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
        userData: state.user,
        optionData: state.options
    }
}
export default connect(mapStateToProps, { createChallenge, getUser, createOptions })(Create) 
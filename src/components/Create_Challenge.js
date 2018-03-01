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
            // options: [
            //     { id: 1, optionName: 'water_intake', units: 'mL', points: 5 },
            //     { id: 2, optionName: 'caloric_intake', units: 'lbs', points: 5 },
            //     { id: 3, optionName: 'exercise', units: false, points: 5 },
            //     { id: 4, optionName: 'scale_img', units: false, points: 5 },
            //     { id: 5, optionName: 'weight', units: 'lbs', points: 5 },
            //     { id: 6, optionName: 'collection_required', units: false, points: 5 }
            // ],
            options:{},
            challengeOptions: [],
            challengePoints: [],
            selected: [],
            points:[]
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
        let sel = this.state.selected.slice();
        if (sel.includes(value)) {
            sel.splice(sel.indexOf(value), 1)
        } else {
            sel.push(value)
        }
        this.setState({
            selected: sel
        })

    }
    handlePoints (value){
        console.log(value)
        
        let poi = this.state.points.slice();
        if (poi.includes(value)) {
            poi.splice(poi.indexOf(value), 1)
        } else {
            poi.push(value)
        }
        this.setState({
            points: poi
        })
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

    render() {
        let { userData } = this.props
        console.log(this.state)
        // let objArr = {}
        
    //     let points = this.state.challengePoints.map((point,i)=>{
    //         console.log(point.id)
    //         return <option key = {point.id} value={point.id}>{point.id}</option>
                    
    //     })
        
    //     let options = this.state.challengeOptions.map((option, i) => {
    //         const {challenge_option} = option
    //         console.log(points[i])

    //         return <div key={i} style={{color: this.state.selected.includes({id:option.id}) ? 'red':'black'}}><h2 key={option.id} onClick={(e) => this.handleClicked(option.id)}>{option.challenge_option.split("_").join(' ')}</h2><select style={{color: this.state.points.includes(points.id) ? 'pink':'black'}} key={points[i]} value={points.id} onChange={(e)=>this.handlePoints({[points]:option.id})}><option key={points[i]}>--Select Option</option>{points}</select></div>
    // })
    
        let points = this.state.challengePoints.map((point,i)=>{
            return <option key = {i} value={point[i]}>{point.id}</option>
                    
        })
        // console.log(objArr)
        let options = this.state.challengeOptions.map((option, i) => {
            const {id} = option
            return <div key={i} style={{color: this.state.selected.includes(option.id) ? 'red':'black'}}><h2 key={option.id} onClick={(e) => this.handleClicked(option.id)}>{option.challenge_option.split("_").join(' ')}</h2><select style={{color: this.state.points.includes(points.id) ? 'pink':'black'}} key={points.id} value={points.id} onChange={(e)=>this.handlePoints(e.target.value)}><option key={parseInt(points[i],10)}>--Select Option</option>{points}</select></div>
         })
        //  let newstate= Object.assign({},options, points)
        //  console.log(newstate[0])

        
        //  console.log(obj.options)
        //  let options = this.state.challengeOptions.map((option, i) => {
        //      return <div key={i}><h2 style={{ color: this.state.selected.includes(option.id) ? 'red' : 'black' }} key={option[i]} onClick={(e) => this.handleClicked(option.id)}>{option.challenge_option.split("_").join(' ')}</h2></div>
              /* <select style={{color: this.state.points.includes(points.id) ? 'lightgray':'black'}} key={points[i]}onChange={(e)=>this.handlePoints(e.target.value)}>{points}</select></div>   */
        //   })
        return (
            <div className="create_container">
                <div><Header /></div>
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
                            
                        </div>
                        <div className="create_child_left5">
                            <Link to="/dashboard"><button onClick={(e) => this.createChallengeID(e)}>Create Challenge!</button></Link>
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
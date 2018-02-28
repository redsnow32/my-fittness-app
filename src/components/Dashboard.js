import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, selectChallenge } from '../ducks/reducer';
import axios from 'axios';
import Header from './Header';
import Create_Challenge from './Create_Challenge';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            challenges: [],
            selectedChallenge: '',
        }
        this.handleRedirectByChallengeId = this.handleRedirectByChallengeId.bind(this)
    }
    componentDidMount() {
        this.props.getUser();
        axios.get('/api/dashboard/group_name').then(res => {
            this.setState({ challenges: res.data })
        })
    }
    handleRedirectByChallengeId(e) {
        console.log(e.target.value)
        // console.log(this.state)
        const { challenges } = this.state
        // console.log(challenges)
        let selectedIndex = e.target.value
        // console.log(selectedIndex)

        // let selectedChallengeId = this.state.challenges.forEach((challenges,index)=>{
        //     if(index === selectedIndex) {
        //         return index
        //     }
        // })
        let selectedChallengeId = this.state.challenges.filter((group, i) => {
            if (i === selectedIndex) {
                return this.props.selectChallenge( group.challenge_id )
            }
        })
    }
    render() {
        let { userData } = this.props
        let { challenges, fireRedirect } = this.state
        // console.log(this.state.selectedChallenge)
        const { selectedChallenge } = this.state.selectedChallenge
        let groupNames = challenges.map((group, index, self) => {
            return <Link key={index} to="/group"><li  value={index} onClick={(e) => this.handleRedirectByChallengeId(e)}>Group Name:{group.group_name}</li></Link>
        })
        return (
            <div className="dashboard_container">
                <div className="header">
                    <Header />
                    {groupNames}
                </div>
                <div className="dashboard_parent_container">
                    <div className="dashboard_parent_profile_left">
                        <div className="dashboard_child_profile">
                            <div className="dashboard_grandchild_profile_left">
                                <div className="dashboard_username_container">
                                    <div className="dashboard_name">{userData.first_name}{userData.last_name}</div>
                                </div>

                            </div>
                            <div className="dashboard_grandchild_profile_right">
                                <div className="dashboard_points_container">
                                    {/* {newArr(challenges)} */}


                                   
                                </div>
                                <div className="dashboard_points">Points</div>
                            </div>
                            <div className="dashboard_profileinfo_button">
                                <Link to="/edit"><button>Edit Profile</button></Link>
                            </div>
                            <div className="dashboard_profileinfo_gender">
                                <h3>Gender</h3>
                            </div>
                            <div className="dashboard_profileinfo_gender_props">
                                <h3>{userData.gender}</h3>
                            </div>
                            <div className="dashboard_profileinfo_email">
                                <h3>Email</h3>
                            </div>
                            <div className="dashboard_profileinfo_email_props" >
                                <h3>{userData.email}</h3>
                            </div>
                            <div className="dashboard_profileinfo_birthday">
                                <h3>Birthday</h3>
                            </div>
                            <div className="dashboard_profileinfo_birthday_props">
                                <h3>Birthday</h3>
                            </div>
                            <div className="dashboard_profileinfo_age">
                                <h3>Age</h3>
                            </div>
                            <div className="dashboard_profileinfo_age_props">
                                <h3>{userData.age}</h3>
                            </div>
                            <div className="dashboard_profileinfo_weight">
                                <h3>Weight</h3>
                            </div>
                            <div className="dashboard_profileinfo_weight_props">
                                <h3>{userData.weight}</h3>
                            </div>
                            <div className="dashboard_profileinfo_height">
                                <h3>Height</h3>
                            </div>
                            <div className="dashboard_profileinfo_height_props">
                                <h3>{userData.height}</h3>
                            </div>
                        </div>
                        <div className="dashboard_left_parent_buttons">
                            <Link to="/create_challenge"><div><button>Create Challenge</button></div></Link>
                            <Link to="/join_challenge"><div><button>Join Challenge</button></div></Link>
                            {/* <Link to="/daily"><div><button></button></div></Link> */}
                            {/* <button onClick={(e) => this.getAllChallenges(e)}>onClick</button> */}
                        </div>

                    </div>
                    <div className="dashboard_parent_profile_right">
                        <div></div>
                        <div className="dashboard_image_container">
                            <div className="dashboard_left_image"></div>
                            <div className="dashboard_right_image"></div>

                        </div>
                    </div>

                </div>


            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userData: state.user,
        userChallenge: state.selected_challenge
    }
}

export default connect(mapStateToProps, { getUser, selectChallenge })(Dashboard);
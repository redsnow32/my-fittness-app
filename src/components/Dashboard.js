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
            console.log(res.data)
            this.setState({ challenges: res.data })
        })
    }
    handleRedirectByChallengeId(e) {
        console.log(e)
        // console.log(this.state)
        const { challenges } = this.state
        // console.log(challenges)
        let selectedIndex = e
        console.log(selectedIndex)

        let selectedChallengeId = this.state.challenges.map((group, i) => {
            if (i === selectedIndex) {
                return this.props.selectChallenge( group.challenge_id )
            }
        })
        this.setState({selectedChallenge:selectedChallengeId})
    }
    render() {
        let { userData } = this.props
        let { challenges } = this.state
        // console.log(this.state.selectedChallenge)
        const { selectedChallenge } = this.state.selectedChallenge
        let groupNames = challenges.map((group, index, self) => {
            return <Link key={[index]}  to="/group"><div value={index} onClick={(e) => this.handleRedirectByChallengeId(index)}>Group Name: {group.group_name}</div></Link>
        })
        return (
            <div className="dashboard_container">
                <div className="image_header">
                <div className="header">
                    <Header />
                </div>
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
                        
                        <div className="dashboard_image_container">
                            <div className="dashboard_left_image">
                            <h4>Challenges You've Created</h4>
                            <div>{groupNames}</div>

                            </div>
                            <div className="dashboard_right_image">
                                <h4>Challenges You've Joined</h4>
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
        userData: state.user,
        userChallenge: state.selected_challenge
    }
}

export default connect(mapStateToProps, { getUser, selectChallenge })(Dashboard);
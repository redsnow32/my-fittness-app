import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer.js';
import Header from '../Header/Header';
import Edit from '../Edit/Edit';
import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        let { userData } = this.props
        return (
            <div className="dashboard_container">
                <div className="header">
                    <Header />
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

                                </div>
                                <div className="dashboard_points">Points</div>
                            </div>
                            <div className="dashboard_profileinfo_button">
                                <Link to="/edit"><button>Update</button></Link>
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
                            <div className="dashboard_profileinfo_email_props">
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
                            <div><button>Create Challenge</button></div>
                            <div><button>Join Challenge</button></div>
                        </div>

                    </div>
                    <div className="dashboard_parent_profile_right">
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
        userData: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Dashboard);
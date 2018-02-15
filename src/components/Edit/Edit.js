import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { getUser, updateFirstName } from '../../ducks/reducer';
import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: ''
        }
    }
    componentDidMount() {
        this.props.getUser();
    }
    handleChange(e, props) {
        const {userData} = this.props
        console.log(e.target.value)
        // this.setState({firstName:e.target.value})
    }
    render() {
        let { userData, updateFirstName } = this.props
        return (
            <div className="edit_container">
                <div className="header">
                    <Header />
                </div>
                <div className="edit_parent_container">
                    <div className="edit_parent_container_left">
                        <div className="edit_child_profile">
                            <div className="edit_grandchild_profile_left">
                                <h1>{userData.first_name}  {userData.last_name}</h1>
                            </div>
                            <div className="edit_grandchild_profile_right">
                                Image
                            </div>
                            <div className="edit_profile_first_name">First Name:</div>
                            <div className="edit_profile_first_name_props">
                                <input className="edit_profile_input_first_name" type="text" onChange={(e)=>updateFirstName(e.target.value)} />
                            </div>
                            <div className="edit_profile_last_name">Last Name:</div>
                            <div className="edit_profile_last_name_props">
                                <input className="edit_profile_input_last_name" type="text" />
                            </div>
                            <div className="edit_profile_height">Height (cm):</div>
                            <div className="edit_profile_height_props">
                                <input className="edit_profile_height_input" type="text" />
                            </div>
                            <div className="edit_profile_weight">Weight (kg):</div>
                            <div className="edit_profile_weight_props">
                                <input className="edit_profile_weight_input" type="text" />

                            </div>
                            <div className="edit_profile_age">Age:</div>
                            <div className="edit_profile_age_props">
                                <input className="edit_profile_age_input" type="text" />
                            </div>
                            <div className="edit_profile_birthday">Birthday:</div>
                            <div className="edit_profile_birthday_props">
                                <input className="edit_profile_birthday_input" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="edit_parent_container_right">
                        <div className=""></div>
                    </div>
                </div>
            </div>
        )
    }
}
export function mapStateToProps(state) {
    return {
        userData: state.user
    }
}
export default connect(mapStateToProps, { getUser, updateFirstName })(Edit);
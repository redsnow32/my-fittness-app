import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name:'',
            last_name:'',
            age:'',
            gender:'',
            email:'',
            height_cm:'',
            current_weight:'',
            birthday:''
        }
    }
    componentDidMount() {
        this.props.getUser();
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    submitChanges() {
        let obj = this.state
        obj.id = this.props.userData.id
        this.props.updateUser(obj);
    }

    render() {
        let { userData, updateUser } = this.props
        
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
                                <input type="text" name="first_name" value={this.state.first_name} onChange={e=>this.handleInput(e)} />
                            </div>
                            <div className="edit_profile_last_name">Last Name:</div>
                            <div className="edit_profile_last_name_props">
                                <input name="last_name" value={this.state.last_name} type="text" onChange={e=>this.handleInput(e)}/>
                            </div>
                            <div className="edit_profile_height">Height (cm):</div>
                            <div className="edit_profile_height_props">
                                <input name="height_cm" value={this.state.height_cm} type="text" onChange={e=>this.handleInput(e)}/>
                            </div>
                            <div className="edit_profile_weight">Weight (kg):</div>
                            <div className="edit_profile_weight_props">
                                <input name="current_weight" value={this.state.current_weight} type="text" onChange={e=>this.handleInput(e)}/>

                            </div>
                            <div className="edit_profile_age">Age:</div>
                            <div className="edit_profile_age_props">
                                <input name="age" value={this.state.age} type="text"  onChange={e=>this.handleInput(e)}/>
                            </div>
                            <div className="edit_profile_birthday">Birthday:</div>
                            <div className="edit_profile_birthday_props">
                                <input name="birthday" value={this.state.birthday} type="text" onChange={e=>this.handleInput(e)}/>
                            </div>
                            <div className="edit_profile_email">email:</div>
                            <div className="edit_profile_email_props">
                                <input name="age" value={this.state.email} type="text"  onChange={e=>this.handleInput(e)}/>
                            </div>
                            <div className="edit_profile_gender">Gender:</div>
                            <div className="edit_profile_gender_props">
                                <input name="age" value={this.state.gender} type="text"  onChange={e=>this.handleInput(e)}/>
                            </div>
                            
                        </div>
                        <Link to="/dashboard" ><div><button onClick={()=>this.submitChanges()}>Update</button></div></Link>
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
        userData: state.user,
        updateUser: state.user,
    }
}
export default connect(mapStateToProps, { getUser, updateUser})(Edit);
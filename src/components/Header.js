import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';


export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            initialState: null
        }
    }

    render() {
        let dashboard = '/api/dashboard'
        let width = window.innerWidth
        // {dashboard ? {background:null} : background:black}
        const large = <div className="header_child_right">
            <Link to="/dashboard"><h3>Dashboard</h3></Link>
            <Link to="/create_challenge"><h3>Create</h3></Link>
            <Link to="/join_challenge"><h3>Join</h3></Link>
            <Link to={'/group/group_members'}><h3>Groups</h3></Link>
            <div className="header_button">
                <Button />
            </div>
        </div>
        const small =
            <div className="header_child_right">
                    <button className="dropdownbtn">
                    </button>
                    <div className="dropdown-content">
                        <Link to="/dashboard"><h3>Dashboard</h3></Link>
                        <Link to="/create_challenge"><h3>Create</h3></Link>
                        <Link to="/join_challenge"><h3>Join</h3></Link>
                        <Link to={'/group/group_members'}><h3>Groups</h3></Link>
                        <div className="header_button">
                            <Button />
                        </div>
                </div>
            </div>


        return (
            <div className="header_container">
                <div className="header_parent_container">
                    <div className="header_child_left">
                        <div className="header_image"><img src="" alt=""></img>MY FITNESS APP</div>
                    </div>
                    {
                        width > 850 ? large : small
                    }

                </div>
            </div>
        )
    }
}
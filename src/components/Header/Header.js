import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import './Header.css';
import Button from '../Button/Button';


export default class Header extends Component {
    componentWillReceiveProps() {

    }
    render() {
        return (
            <div className="header_container">
                <div className="header_parent_container">

                    
                    <div className="header_child_left">
                        <div className="header_image"><img src="" alt=""></img>Logo</div>
                    </div>
                        
                    <div className="header_child_right">
                        <Link to="/dashboard"><h3>Dashboard</h3></Link>
                        <Link to="/create_challenge"><h3>Create</h3></Link>
                        <Link to="/join_challenge"><h3>Join</h3></Link>
                        <Link to="/group"><h3>Groups</h3></Link>
                        <div className="header_button">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
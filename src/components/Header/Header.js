import React, { Component } from 'react';
import './Header.css'
import Button from '../Button/Button'

export default class Header extends Component {
    componentWillReceiveProps() {

    }
    render() {
        return (
            <div className="header_container">
                <div className="header_parent_container">

                    {/* <nav> */}
                    <div className="header_child_left">
                        <div className="header_image"><img src="" alt=""></img>Logo</div>
                    </div>

                    <div className="header_child_right">
                        <h3>Profile</h3>
                        <h3>Create</h3>
                        <h3>Join</h3>
                        <h3>Groups</h3>
                        <div className="header_button">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
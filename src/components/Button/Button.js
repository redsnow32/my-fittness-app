import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
    componentWillReceiveProps() {

    }
    render() {
        return (
            <div className="button_container">
                <div className="button_parent">
                    {/* <div className="button_child_container"> */}
                        <div className="button_child_left">HI, Name</div>
                        <div className="hamburger_menu" >
                            <div className="button_hamburger_top" />
                            <div className="button_hamburger_middle" />
                            <div className="button_hamburger_bottom" />
                        </div>
                        <div className="button_child_right">
                            <div className="button_child_logout">| LOG OUT</div>
                        </div>
                    {/* </div> */}

                </div>

            </div>
        )
    }
}
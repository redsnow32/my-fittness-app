import React, { Component } from 'react';
// import logo from '../styles/IMG_5270.jpeg';


export default class Home extends Component {
    render() {
        return (
            <div className="home_container">

                <div className="home_img_container">
                    <div className="home_child_right">
                        <div className="nav_container">
                            <nav>
                                <h1>MY FITNESS CHALLENGE</h1>
                                <br />
                                <br />
                                <h2>ABOUT</h2>
                                <br />
                                <a href={process.env.REACT_APP_LOGIN}><button className="home_button">Login / Register</button></a>
                            </nav>
                        </div>
                    </div>
                    <div className="homechild_left">
                    </div>
                </div>

            </div>
        )
    }
}
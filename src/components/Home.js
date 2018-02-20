import React, { Component } from 'react';
import logo from '../styles/IMG_5270.jpeg';


export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="home_container">


                    <div className="home_parent_container">
                        {/* <div className="focal-point right-400 up-200"> */}
                        <div><img src={logo} alt="" /></div>

</div>


                        <div className="home_child_right">

                        </div>
                        <div className="homechild_left">
                            <div className="login_container">
                                <a href={process.env.REACT_APP_LOGIN}><button>Login / Register</button></a>
                            </div>
                            {/* </div> */}
                        </div>
                    
                </div>
            </div>
        )
    }
}
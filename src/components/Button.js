import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';

class Button extends Component {
    componentDidMount() {
        this.props.getUser();
    }
    componentWillReceiveProps() {

    }
    render() {
        const { userData } = this.props
        // console.log(this.props)
        return (
            <div className="button_container">
                <div className="button_parent">
                    {/* <div className="button_child_container"> */}
                        <div className="button_child_left">HI, {userData.first_name}</div>
                        <div className="hamburger_menu" >
                            <div className="button_hamburger_top" />
                            <div className="button_hamburger_middle" />
                            <div className="button_hamburger_bottom" />
                        </div>
                        <div className="button_child_right">
                        <a href="http:localhost:3223/logout"> <div className="button_child_logout">| LOG OUT</div>
                        </a>
                        </div>
                    {/* </div> */}

                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userData:state.user
    }
}
export default connect(mapStateToProps, {getUser})(Button);
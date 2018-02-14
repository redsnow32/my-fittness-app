import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer.js';
import Header from '../Header/Header';
import Button from '../Button/Button';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getUser();
    }
    render() {
        let { userData } = this.props
        return (
            <div className="dashboard_parent_container">
                <div className="header">
                    <Header />
                </div>
                <div className="dashboard_child_profile"></div>
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
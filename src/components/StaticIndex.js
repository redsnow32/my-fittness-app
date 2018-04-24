import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Layout } from 'antd'

import { getUser } from '../ducks/reducer';

import User from '../ducks/reducer';

const { Header } = Layout;

class StaticIndex extends Component{
    constructor(props){
        super(props)
        this.state={}

    }
    componentDidMount(){
        const { userData } = this.props
    }
    render(){
        console.log(this.props.user)
        return(
            <Layout>
                <Header>
                    <h1>Edit</h1>
                </Header>
            </Layout>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(User.getUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(StaticIndex)
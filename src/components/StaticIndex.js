import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Layout } from 'antd'

import { getUser } from '../ducks/reducer';

import User from '../ducks/reducer';
import NewEdit from './Edit/NewEdit'

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
        return(
            <Layout>
                <Header>
                    <NewEdit getUser={this.getUser}/>
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
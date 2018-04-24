import React, { Component } from 'react'
import { Affix, Layout, Card, Row, Col, Button, Icon } from 'antd';

const { Content } = Layout

const initialState = {
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    email: '',
    height_cm: '',
    current_weight: '',
    birthday: '',
    challenges: [],

}

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    listItemFunctions = {
        replacePrimaryUser: user => {
            if (user) {
                this.setState({
                    primaryUser: [user],
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    title: user.title,
                    uid: user.external_user_id,
                });
            } else {
                this.setState({
                    primaryUser: [],
                    email: InitialState.email,
                    firstName: InitialState.first_name,
                    lastName: InitialState.last_name,
                    title: InitialState.title,
                    uid: InitialState.uid,
                });
            }
        },

        render() {
            return (
                <Content>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Card title='Edit profile'>

                            </Card>
                        </Col>
                    </Row>
                </Content>
            )
        }
    }
}

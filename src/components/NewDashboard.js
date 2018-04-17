import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import { getUser, updateUser } from '../ducks/reducer';
import axios from 'axios';
import { Form, Input, Button, List } from 'antd';

const FormItem = Form.Item

const Fields = [
    'age',
    'birthdate',
    'challenge_id',
    'current_height',
    'current_weight',
    'email',
    'first_name',
    'gender',
    'last_name',
    'profile_picture'
]

class NewDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            challenges: [],
            selectedChallenge: ''
        }
    }
    componentDidMount() {
        // this.props.getUser();
        axios.get('/api/dashboard/group_name').then(res => {
            console.log(res.data)
            this.setState({ challenges: res.data })
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const FormValues = this.props.form.getFieldsValue(Fields)
        console.log(FormValues)
        const Params = {
            age:FormValues.age,
            birthdate:FormValues.birthdate,
            challenge_id:FormValues.challenge_id,
            current_height:FormValues.current_height,
            current_weight:FormValues.current_weight,
            email:FormValues.email,
            first_name:FormValues.first_name,
            gender:FormValues.gender,
            last_name:FormValues.last_name,
            profile_picture:FormValues.profile_picture
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        let { userData, updateUser } = this.props
        console.log(this.props)
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label='Email'>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: false, message: 'Not required',
                            },
                        ],
                    })(<Input placeholder='Email' />)}
                </FormItem>
            </Form>
        )
    }
}
export function mapStateToProps(state) {
    return {
        userData: state.user
    }
}

export default Form.create({
    mapPropsToFields: props =>
        mapValues(props.FormValues, value => Form.createFormField({ value })),
    onValuesChange: (props, values) => {
        props.updateUser(values)
    },
})(NewDashboard);
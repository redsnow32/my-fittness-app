import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { getUser, allUserData } from '../../ducks/reducer';
import { mapValues } from 'lodash'
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item
const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            first_name: Form.createFormField({
                ...props.userData,
                value: props.userData,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
            <FormItem label="First name">
                {getFieldDecorator('first_name', {
                    rules: [{ required: true, message: 'Username is required!' }],
                })(<Input />)}
            </FormItem>
        </Form>
    );
});

class NewEdit extends Component {
    state = {
            fields: {
                first_name: {
                    value: 'benjycui',
                },
            },
        };
        // thandleFormChange = this.handleFormChange.bind(this)

        handleFormChange = (changedFields) => {
            this.setState(({ fields }) => ({
                fields: { ...fields, ...changedFields },
            }));
        }
        // const { userData } = this.props
    // }

    render() {
        return (
            <div>
                <CustomizedForm />
            </div>
        )
    }
}
export function mapStateToProps(state) {
    return {
        userData: state.user
    }
}
// export default(NewEdit)
export default connect(mapStateToProps)(NewEdit);
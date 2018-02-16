import React, { Component } from 'react';
import Header from '../Header/Header';

import './Create_Challenge.css';

class Create extends Component {
    render() {
        return (
            <div className="create_container">
                <div><Header /></div>
                <div className="create_grandparent_container">
                    <div className="create_parent_left">
                        <div className="create_children_left">
                            <div className="create_child_left1">test</div>
                            <div className="create_child_left2">test</div>
                            <div className="create_child_left3">test</div>
                            <div className="create_child_left4">test</div>
                            <div className="create_child_left5">test</div>
                            <div className="create_child_left6">test</div>
                            <div className="create_child_left7">test</div>
                        </div>
                    </div>
                    <div className="create_parent_right">
                        <div className="create_children_right">
                            <div className="create_child_right1">test</div>
                            <div className="create_child_right2">test</div>
                            <div className="create_child_right3">test</div>
                            <div className="create_child_right4">test</div>
                            <div className="create_child_right5">test</div>
                            <div className="create_child_right6">test</div>
                            <div className="create_child_right7">test</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Create
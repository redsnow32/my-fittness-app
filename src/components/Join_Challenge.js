import React, { Component } from 'react';
import { connect } from '../ducks/reducer';
import Header from './Header';

class Join extends Component {
    render() {
        return (
            <div className="Join_Challenge">
                <div><Header /></div>
                <div className="join_container">
                    <form>
                        <label>Enter Challenge ID:  </label><input />
                    </form>
                </div>
            </div>
        )
    }
}
export default Join
import React, { Component } from 'react';
import routes from '../config/routes';
export default class App extends Component {
    render() {
        return(
            <div>
                { routes }
            </div>
        )
    };
};
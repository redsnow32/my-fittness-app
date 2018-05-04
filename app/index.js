import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import './reset.css';
// import './main.css'
// import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
// import { Provider } from 'react-redux';
// import store from './ducks/store';


ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root'));
unregister();
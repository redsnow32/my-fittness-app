import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import userRouter from './routes/userRoutes';
import store from './ducks/store';

ReactDOM.render(
    <Provider store={store}>   
        <App />
    </Provider>
    , document.getElementById('root'));
unregister();

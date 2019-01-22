import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'

const store = createStore( reducers, {} ,applyMiddleware(thunk));

ReactDOM.render(
    <Provider  store={store} >
        <App />
    </Provider>
    ,document.getElementById('root'));
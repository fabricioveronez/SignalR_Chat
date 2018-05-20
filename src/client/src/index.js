import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './Chat';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import chat from './reducers/chat.reducer'; 
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({ 
    chat
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
<Provider store={store}>
    <Chat />
</Provider>, document.getElementById('root'));
registerServiceWorker();

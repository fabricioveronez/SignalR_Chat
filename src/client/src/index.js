import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './Chat';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(<Chat />, document.getElementById('root'));
registerServiceWorker();

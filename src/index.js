import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line no-restricted-globals
const apiHost = `${location.protocol}//${location.hostname}:4444`;

fetch(apiHost + '/rovers')
    .then(response => response.json())
    .then(rovers => {
        ReactDOM.render(<App apiHost={apiHost} rovers={rovers}/>, document.getElementById('root'));
    });

registerServiceWorker();

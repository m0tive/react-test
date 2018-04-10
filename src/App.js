import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

// eslint-disable-next-line no-restricted-globals
const socket = io(`${location.protocol}//${location.hostname}:4444`, { path: '/api' });

socket.on('connect', () => console.log('cool'));


export default App;

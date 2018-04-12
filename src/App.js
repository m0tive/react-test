import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-restricted-globals
    const apiHost = `${location.protocol}//${location.hostname}:4444`;

    const socket = io(apiHost, { path: '/ws' });

    this.state = {
      rovers: []
    };

    fetch(apiHost + '/rovers')
      .then(response => response.json())
      .then(rovers => {
        this.setState({rovers: rovers});
      });

    socket.on('/rovers', rovers => {
      this.setState({rovers: rovers})
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {this.state.rovers.map(rover => <li key={rover.name}>{rover.name}, {rover.state}</li> )}
        </ul>
      </div>
    );
  }
}


export default App;

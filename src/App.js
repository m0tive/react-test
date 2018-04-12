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

    socket.on('connect', () => console.log('cool'));

    this.state = {
      rovers: []
    };

    fetch(apiHost + '/rovers')
      .then(response => response.json())
      .then(rovers => {
        this.setState({rovers: rovers});
      });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.rovers.map(rover => <li>{rover.name}</li> )}
        </ul>
      </div>
    );
  }
}


export default App;

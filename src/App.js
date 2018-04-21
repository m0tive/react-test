import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client';

import Clock from './Clock';
import NewRoverModal from './NewRoverModal';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-restricted-globals
    const apiHost = `${location.protocol}//${location.hostname}:4444`;

    const socket = io(apiHost, { path: '/ws' });

    /*
    this.showNewRoverModal = this.showNewRoverModal.bind(this);
    this.closeNewRoverModal = this.closeNewRoverModal.bind(this);
    */
    this.closeNewRoverModal = this.closeNewRoverModal.bind(this);

    this.state = {
      rovers: [],
      isNewRoverModalShown: false,
    };

    this.newRoverModal = React.createRef();

    fetch(apiHost + '/rovers')
      .then(response => response.json())
      .then(rovers => {
        this.setState({rovers: rovers});
      });

    socket.on('/rovers', rovers => {
      this.setState({rovers: rovers})
    });
  }

  closeNewRoverModal() {
    this.setState({ isNewRoverModalShown: false });
  }

  showNewRoverModal() {
    this.setState({ isNewRoverModalShown: true });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to <s>React</s> Mars</h1>
          <Clock />
        </header>
        <h2>Rovers</h2>
        <ul>
          {this.state.rovers.map(rover => <li key={rover.name}>{rover.name}, {rover.state}</li> )}
        </ul>
        <Button onClick={() => this.setState({ isNewRoverModalShown: true })} bsStyle='primary'>Show</Button>
        <NewRoverModal ref="newRoverModal"
          show={this.state.isNewRoverModalShown}
          onHide={() => this.setState({ isNewRoverModalShown: false })}/>
      </div>
    );
  }
}


export default App;

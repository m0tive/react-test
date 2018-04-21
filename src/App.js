import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client';

import Clock from './Clock';
import NewRoverModal from './NewRoverModal';
import { Button } from 'react-bootstrap';
import RoverStatus from './RoverStatus';

class App extends Component {
  constructor(props) {
    super(props);

    const socket = io(this.props.apiHost, { path: '/ws' });

    this.state = {
      rovers: this.props.rovers || [],
      isNewRoverModalShown: false,
    };

    socket.on('/rovers', rovers => {
      this.setState({rovers: rovers})
    });
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
        <RoverStatus rovers={this.state.rovers} />
        <Button onClick={() => this.setState({ isNewRoverModalShown: true })} bsStyle='primary'>Show</Button>
        <NewRoverModal
          show={this.state.isNewRoverModalShown}
          onHide={() => this.setState({ isNewRoverModalShown: false })}/>
      </div>
    );
  }
}


export default App;

import React, { Component } from 'react';

class RoverStatus extends Component {
    render() {
        return <ul className="RoverStatus">
          {this.props.rovers.map(rover => <li key={rover.name}>{rover.name}, {rover.state}</li> )}
        </ul>;
    }
}

export default RoverStatus;

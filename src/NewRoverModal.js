import React, { Component } from 'react';
// @ts-ignore
import { Modal, Button } from 'react-bootstrap';

class NewRoverModal extends Component {
    render() {
        return <div className="NewRoverModal">
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>One fine body...</Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
}

export default NewRoverModal;
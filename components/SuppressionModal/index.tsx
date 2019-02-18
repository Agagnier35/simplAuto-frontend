import React, { Component } from 'react';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Button, Modal } from 'react-bootstrap';

class SuppressionModal extends Component<MultiProps> {
  render() {
    const {
      translations: { DeleteModalContent },
      onDelete,
    } = this.props;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {DeleteModalContent.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{DeleteModalContent.messageTitle}</h4>
          <p>
            {DeleteModalContent.content}
            {this.props.myName}
            {DeleteModalContent.content2}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>
            {DeleteModalContent.btnCancel}
          </Button>
          <Button onClick={this.props.onDelete}>
            {DeleteModalContent.btnConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(SuppressionModal);

import React, { Component } from 'react';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Button, Modal } from 'react-bootstrap';

interface ModalAccessProps {
  myName: string;
  show: boolean;
  onDelete: any;
  onHide: any;
}

class SuppressionModal extends Component<ModalAccessProps & MultiProps> {
  render() {
    const {
      translations: { DeleteModalContent },
      show,
      onDelete,
      onHide,
      myName,
    } = this.props;

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
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
            {myName}
            {DeleteModalContent.content2}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>{DeleteModalContent.btnCancel}</Button>
          <Button onClick={onDelete}>{DeleteModalContent.btnConfirm}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(SuppressionModal);

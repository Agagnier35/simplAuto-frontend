import React, { Component } from 'react';
import { multi } from '../../../lib/MultiLang';
import { Button, Modal, Card } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  translations: Translations;
}

class ConfirmationModal extends Component<ConfirmationModalProps> {
  modalConfirm = () => {
    this.props.onConfirm();
    this.props.onClose();
  };

  render() {
    const { show, onClose, translations } = this.props;
    const { confirmation } = translations;
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onClose}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {confirmation.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{confirmation.contract}:</h4>
          <Card>
            <p>{confirmation.content}</p>
          </Card>
          <p>{confirmation.read}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>{confirmation.cancel}</Button>
          <Button onClick={this.modalConfirm}>
            {confirmation.confirmation}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(ConfirmationModal);

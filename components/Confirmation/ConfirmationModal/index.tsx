import React, { Component } from 'react';
import { multi } from '../../../lib/MultiLang';
import { Button, Modal, Card } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import ModalStyle from './style';

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  translations: Translations;
}

interface ConfirmationModalState {
  isChecked: boolean;
}

class ConfirmationModal extends Component<ConfirmationModalProps, ConfirmationModalState> {
  state: ConfirmationModalState = {
    isChecked: false,
  };

  modalConfirm = () => {
    this.props.onConfirm();
    this.props.onClose();
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.isChecked) {
      this.setState({ isChecked: false });
    } else {
      this.setState({ isChecked: true });
    }
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
        <ModalStyle>
          <Modal.Body>
            <h4>{confirmation.contract}:</h4>
            <Card>{confirmation.content}</Card>
            <input
              type="checkbox"
              onChange={this.handleChange}
              checked={this.state.isChecked}
            />
            <p>{confirmation.read}</p>
          </Modal.Body>
        </ModalStyle>
        <Modal.Footer>
          <Button onClick={onClose}>{confirmation.cancel}</Button>
          <Button onClick={this.modalConfirm} disabled={!this.state.isChecked}>
            {confirmation.confirmation}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(ConfirmationModal);

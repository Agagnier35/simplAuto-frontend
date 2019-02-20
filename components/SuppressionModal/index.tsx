import React, { Component } from 'react';
import { multi } from '../../lib/MultiLang';
import { Button, Modal } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';

interface SuppressModalProps {
  objToDeleteName: string;
  show: boolean;
  onDelete: any;
  onCancel: any;
  translations: Translations;
}

class SuppressionModal extends Component<SuppressModalProps> {
  render() {
    const {
      show,
      onDelete,
      onCancel,
      objToDeleteName,
      translations,
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
            {translations.DeleteModalContent.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{translations.DeleteModalContent.messageTitle}</h4>
          <p>
            {translations.DeleteModalContent.content}
            {objToDeleteName}
            {translations.DeleteModalContent.content2}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel}>
            {translations.DeleteModalContent.btnCancel}
          </Button>
          <Button onClick={onDelete}>
            {translations.DeleteModalContent.btnConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(SuppressionModal);

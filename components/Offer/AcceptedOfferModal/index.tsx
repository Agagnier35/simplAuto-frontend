import React, { Component } from 'react';
import { multi } from '../../../lib/MultiLang';
import { Button, Modal } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';

interface GeneralModalProps {
  show: boolean;
  onClose: () => void;
  translations: Translations;
}

class AcceptedOfferModal extends Component<GeneralModalProps> {
  render() {
    const { show, onClose, translations } = this.props;
    const { offers } = translations;
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
            {offers.acceptedOfferTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{offers.acceptedOfferInstruction}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>{offers.acceptedOfferCloseBtn}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(AcceptedOfferModal);

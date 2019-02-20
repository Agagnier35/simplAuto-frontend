import React, { Component } from 'react';
import { multi } from '../../lib/MultiLang';
import { Button, Modal } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { Dictionary } from '../../lib/Dictionary';

export enum ModalConcern {
  ad = 'ad',
  offer = 'offer',
  car = 'car',
}

export enum ModalAction {
  create = 'create',
  delete = 'delete',
  save = 'save',
  edit = 'edit',
}

interface GeneralModalProps {
  modalSubject: string;
  actionType: string;
  show: boolean;
  onClose: any;
  onConfirm: any;
  translations: Translations;
}

class SuppressionModal extends Component<GeneralModalProps> {
  modalConfirm = () => {
    this.props.onConfirm();
    this.props.onClose();
  };

  render() {
    const {
      show,
      onClose,
      onConfirm,
      translations,
      actionType,
      modalSubject,
    } = this.props;
    const { GeneralModalContent }: Dictionary<any> = translations;
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.onClose}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {GeneralModalContent.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {GeneralModalContent[actionType]}
            {GeneralModalContent[modalSubject]}
          </h4>
          <p>{GeneralModalContent.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onClose}>
            {GeneralModalContent.btnCancel}
          </Button>
          <Button onClick={this.modalConfirm}>
            {GeneralModalContent.btnConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default multi(SuppressionModal);

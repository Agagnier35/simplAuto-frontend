import React from 'react';
import SuppressionModal from '../SuppressionModal';
import { Button } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';

interface ModalAccessState {
  modalShow: boolean;
}

interface ModalAccessProps {
  objToDeleteName: string;
  onDelete: any;
  translations: Translations;
}

class SuppressionModalAccess extends React.Component<
  ModalAccessProps,
  ModalAccessState
> {
  state: ModalAccessState = {
    modalShow: false,
  };

  modalClose = () => this.setState({ modalShow: false });

  modalDelete = () => {
    this.props.onDelete();
    this.modalClose();
  };

  render() {
    const { objToDeleteName, translations } = this.props;
    return (
      <div>
        <Button variant="light">
          <img
            src="../../static/delete.png"
            alt="image"
            onClick={() => this.setState({ modalShow: true })}
          />
        </Button>

        <SuppressionModal
          show={this.state.modalShow}
          onCancel={this.modalClose}
          onDelete={this.modalDelete}
          objToDeleteName={translations.DeleteModalContent[objToDeleteName]}
          translations={this.props.translations}
        />
      </div>
    );
  }
}

export default SuppressionModalAccess;

import React from 'react';
import SuppressionModal from '../SuppressionModal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { MultiProps, multi } from '../../lib/MultiLang';

interface ModalAccessState {
  modalShow: boolean;
}

interface ModalAccessProps {
  myName: string;
  onDelete: any;
}

class SuppressionModalAccess extends React.Component<
  ModalAccessProps & MultiProps,
  ModalAccessState
> {
  state: ModalAccessState = {
    modalShow: false,
  };

  modalClose = () => this.setState({ modalShow: false });

  render() {
    const {
      translations: { DeleteModalContent },
      onDelete,
      myName,
    } = this.props;
    return (
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
        >
          Launch vertically centered modal
        </Button>

        <SuppressionModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          onDelete={onDelete}
          myName={DeleteModalContent[myName]}
        />
      </ButtonToolbar>
    );
  }
}

export default multi(SuppressionModalAccess);

import React from 'react';
import SuppressionModal from '../SuppressionModal';
import SuppressBtnStyle from './style';
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

  modalDelete = () => {
    this.props.onDelete();
    this.modalClose();
  };

  render() {
    const {
      translations: { DeleteModalContent },
      myName,
    } = this.props;
    return (
      <SuppressBtnStyle>
        <ButtonToolbar>
          <Button variant="light">
            <img
              src="../../static/delete.png"
              alt="image"
              onClick={() => this.setState({ modalShow: true })}
            />
          </Button>

          <SuppressionModal
            show={this.state.modalShow}
            onHide={this.modalClose}
            onDelete={this.modalDelete}
            myName={DeleteModalContent[myName]}
          />
        </ButtonToolbar>
      </SuppressBtnStyle>
    );
  }
}

export default multi(SuppressionModalAccess);

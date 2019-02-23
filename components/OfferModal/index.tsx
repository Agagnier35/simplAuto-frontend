import React, { useState } from 'react';
import { multi } from '../../lib/MultiLang';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { Ad, OfferCreateInput, Car, Offer } from '../../generated/graphql';
import { CREATE_OFFER_MUTATION } from './Mutations';

interface OfferModalProps {
  translations: Translations;
  modalOpened: boolean;
  isEditMode: boolean;
  ad: Ad;
  car: Car;
  offer: Offer;
  toggleModal: (...params: any) => void;
}

const OfferModal = ({
  translations,
  modalOpened,
  toggleModal,
  isEditMode,
  ad,
  car,
  offer,
}: OfferModalProps) => {
  // Query addons where value > 0
  // const { data, error, loading } = useQuery(ALL_ADS_QUERY);
  const { cancel, update, create } = translations.general;

  const [price, setPrice] = useState(
    offer.price ? offer.price.toString() : '0',
  );

  const handleCreateOffer = useMutation(CREATE_OFFER_MUTATION, {
    variables: getCreateOfferPayload(),
  });

  function getCreateOfferPayload() {
    const data: OfferCreateInput = {
      adID: ad.id,
      price: parseInt(price, 10),
      carID: car.id,
    };
    return { data };
  }

  async function handleClick() {
    if (isEditMode) {
      toggleModal();
    } else {
      await handleCreateOffer();
      toggleModal();
    }
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalOpened}
      onHide={toggleModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEditMode
            ? translations.offers.modifyOffer
            : translations.offers.createOffer}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <fieldset>
          <Form.Group>
            <Form.Label>{translations.cars.price}</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder={translations.cars.price}
                aria-describedby="inputGroupPrepend"
                required
                type="number"
                name="price"
                value={price}
                onChange={(e: any) => setPrice(e.currentTarget.value)}
              />
            </InputGroup>
          </Form.Group>
        </fieldset>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleModal}>{cancel}</Button>
        <Button onClick={handleClick}>{isEditMode ? update : create}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default multi(OfferModal);

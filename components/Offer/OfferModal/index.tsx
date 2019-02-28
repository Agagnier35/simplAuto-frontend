import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Modal, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import {
  Ad,
  OfferCreateInput,
  Car,
  Offer,
  OfferUpdateInput,
  OfferAddon,
  OfferAddonInput,
} from '../../../generated/graphql';
import { CREATE_OFFER_MUTATION, UPDATE_OFFER_MUTATION } from './Mutations';
import { CAR_BY_ID } from '../../Car/Car/Queries';
import { OFFER_ADDONS_QUERY } from './Queries';

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
  const { data, loading } = useQuery(OFFER_ADDONS_QUERY);

  const { cancel, update, create } = translations.general;

  const [price, setPrice] = useState(
    offer.price ? offer.price.toString() : '0',
  );
  const [addons, setAddons] = useState(offer.addons || []);
  const [otherAddon, setOtherAddon] = useState('');

  const handleCreateOffer = useMutation(CREATE_OFFER_MUTATION, {
    variables: getCreateOfferPayload(),
    refetchQueries: [{ query: CAR_BY_ID, variables: { id: car.id } }],
  });

  const handleUpdateOffer = useMutation(UPDATE_OFFER_MUTATION, {
    variables: getUpdateOfferPayload(),
    refetchQueries: [{ query: CAR_BY_ID, variables: { id: car.id } }],
  });

  function getCreateOfferPayload() {
    const data: OfferCreateInput = {
      addons: addons.map((addon: OfferAddonInput) => ({
        name: addon.name,
        id: addon.id,
        rankValue: addon.rankValue,
      })),
      adID: ad.id,
      price: parseInt(price, 10),
      carID: car.id,
    };
    return { data };
  }

  function getUpdateOfferPayload() {
    const data: OfferUpdateInput = {
      addons: addons.map((addon: OfferAddonInput) => ({
        name: addon.name,
        id: addon.id,
        rankValue: addon.rankValue,
      })),
      id: offer.id,
      price: parseInt(price, 10),
    };
    return { data };
  }

  async function handleClick() {
    if (isEditMode) {
      await handleUpdateOffer();
      toggleModal();
    } else {
      await handleCreateOffer();
      toggleModal();
    }
  }

  function handleAddonClick(addon: OfferAddon) {
    setAddons([...addons, addon]);
  }

  function handleOtherAddonClick() {
    if (otherAddon.length && otherAddon.length > 0) {
      setAddons([...addons, { name: otherAddon } as OfferAddon]);
      setOtherAddon('');
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
        <fieldset disabled={loading} aria-busy={loading}>
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
          {addons.length > 0 && (
            <ul>
              {addons.map((addon: OfferAddon, index: number) => (
                <li key={index}>{addon.name}</li>
              ))}
            </ul>
          )}
          {data.offerAddons && (
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {translations.offers.addons}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {data.offerAddons.map((addon: OfferAddon, index: number) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleAddonClick(addon)}
                  >
                    {addon.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Form.Group>
            <Form.Label>{translations.offers.otherAddons}</Form.Label>
            <InputGroup>
              <InputGroup.Prepend onClick={handleOtherAddonClick}>
                <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder={translations.offers.specify}
                aria-describedby="inputGroupPrepend"
                required
                name="otherAddon"
                value={otherAddon}
                onChange={(e: any) => setOtherAddon(e.currentTarget.value)}
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

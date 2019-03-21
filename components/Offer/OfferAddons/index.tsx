import React from 'react';
import { Card } from 'react-bootstrap';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Offer, OfferAddon } from '../../../generated/graphql';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';
import { Dictionary } from '../../../lib/Types/Dictionary';
import AddonIcon from '../AddonIcon';
import { Subtitle } from './styles';

export interface OfferAddonsProps extends MultiProps {
  offer: Offer | null | undefined;
}

const OfferAddons = ({ offer, translations }: OfferAddonsProps) => {
  if (!offer || !offer.addons) return null;

  const offerAddons = translations.offerAddons as Dictionary<any>;

  return (
    <Card style={{ marginTop: '1rem' }}>
      <Card.Body>
        <Card.Title style={{ marginBottom: 0 }}>
          {translations.offers.addons}
        </Card.Title>
        <Subtitle>{translations.offerAddons.subtitle}</Subtitle>
        {offer.addons.map((addon: OfferAddon) => (
          <AdSummaryItem
            key={addon.id}
            icon={<AddonIcon addon={addon} />}
            label={offerAddons[addon.name]}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default multi(OfferAddons);

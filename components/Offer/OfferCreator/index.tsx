import React, { ReactNode } from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Offer, ClientType } from '../../../generated/graphql';
import { Container, Name } from './styles';
import { MdEvent, MdAccountCircle } from 'react-icons/md';
import moment from 'moment';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem2';
import { FaUserAlt } from 'react-icons/fa';

export interface OfferAddonsProps extends MultiProps {
  offer: Offer | null | undefined;
  button: ReactNode | null | undefined;
}

const OfferAddons = ({ offer, translations, button }: OfferAddonsProps) => {
  if (!offer || !offer.creator) return null;
  const creator = offer.creator;

  return (
    <>
      <Container>
        <Name>
          {creator.clientType === ClientType.Individual
            ? `${creator.firstName} ${creator.lastName}`
            : creator.companyName}
        </Name>
        <div>
          <AdSummaryItem
            icon={<MdAccountCircle />}
            label={
              creator.clientType === ClientType.Individual
                ? translations.clientType.individual
                : translations.clientType.company
            }
          />
          <AdSummaryItem
            icon={<MdEvent />}
            label={translations.general.memberSince}
            value={moment(creator.createdAt).format('DD[/]MM[/]YY')}
          />
        </div>
      </Container>
      {button}
    </>
  );
};

export default multi(OfferAddons);

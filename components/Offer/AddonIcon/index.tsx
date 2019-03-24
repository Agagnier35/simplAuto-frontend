import React from 'react';
import { OfferAddon } from '../../../generated/graphql';
import { GiCarWheel, GiCartwheel } from 'react-icons/gi';

export interface AddonIconProps {
  addon: OfferAddon;
}

const AddonIcon = ({ addon }: AddonIconProps) => {
  switch (addon.name) {
    case 'tires':
      return <GiCarWheel />;
    case 'mags':
      return <GiCartwheel />;
    default:
      return null;
  }
};

export default AddonIcon;

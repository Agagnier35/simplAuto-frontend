import React from 'react';
import { CarFeature } from '../../../generated/graphql';
import {
  GiCarWheel,
  GiCartwheel,
  GiSteeringWheel,
  GiWoodenDoor,
  GiArena,
  GiGasPump,
  GiBigGear,
  GiShepherdsCrook,
  GiForwardSun,
  GiWhirlwind,
} from 'react-icons/gi';
import { IoIosCog, IoIosCar } from 'react-icons/io';

export interface FeatureIconProps {
  feature: CarFeature;
}

const FeatureIcon = ({ feature }: FeatureIconProps) => {
  switch (feature.category.name) {
    case 'motor':
      return <IoIosCog />;
    case 'color':
      return <IoIosCar style={{ color: feature.name }} />;
    case 'fuelType':
      return <GiGasPump />;
    case 'doorNumber':
      return <GiWoodenDoor />;
    case 'seatNumber':
      return <GiArena />;
    case 'drivetrain':
      return <GiCartwheel />;
    case 'transmission':
      return <GiBigGear />;
    case 'sunroof':
      return <GiForwardSun />;
    case 'cruiseControl':
      return <GiSteeringWheel />;
    case 'trailerHitch':
      return <GiShepherdsCrook />;
    case 'airConditioning':
      return <GiWhirlwind />;
    default:
      return null;
  }

  //GiAutoRepair
};

export default FeatureIcon;

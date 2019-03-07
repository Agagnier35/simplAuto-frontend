import React, { ReactNode } from 'react';
import { StyledAdSummaryItem } from './styles';

export interface AdSummaryItemProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
}

const AdSummaryItem = ({
  icon,
  value,
  label,
  className,
}: AdSummaryItemProps) => {
  return (
    <StyledAdSummaryItem className={className}>
      {icon}
      <b>{`${label} : `}</b>
      {value}
    </StyledAdSummaryItem>
  );
};

export default AdSummaryItem;

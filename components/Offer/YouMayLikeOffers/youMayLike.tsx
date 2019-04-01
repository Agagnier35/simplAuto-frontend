import React from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import { paging5pages } from '../../General/Preferences';
import Paging from '../../General/Paging';
import ErrorMessage from '../../General/ErrorMessage';
import { CarSummaries } from '../../Car/Car/styles';
import CarSummary from '../../Car/CarSummary';

interface OfferModalProps {
  translations: Translations;
  data: any;
  error: boolean;
  pageIndexMayLike: number;
  setPageIndexMayLike: React.Dispatch<React.SetStateAction<number>>;
}

const YouMayLike = ({
  translations,
  data,
  error,
  pageIndexMayLike,
  setPageIndexMayLike,
}: OfferModalProps) => {
  if (error) return <ErrorMessage error={error} />;

  return (
    <div
      hidden={
        data.suggestions &&
        data.suggestions[0] &&
        data.suggestions[0].totalLength === 0
      }
    >
      <hr />
      <p>{translations.offers.youMayLike}:</p>
      <CarSummaries>
        {data.suggestions &&
          data.suggestions.map((suggestion: any) => (
            <CarSummary
              key={suggestion.offer.id}
              car={suggestion.offer.car}
              offer={suggestion.offer}
            />
          ))}
        <Paging
          pageIndex={pageIndexMayLike}
          setPageIndex={setPageIndexMayLike}
          maxItems={
            data.suggestions && data.suggestions[0]
              ? data.suggestions[0].totalLength
              : 0
          }
          itemsByPage={paging5pages}
        />
      </CarSummaries>
    </div>
  );
};

export default multi(YouMayLike);

import React, { useState } from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Link from 'next/link';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import AdSummary from '../AdSummary';
import { Button, Card } from 'react-bootstrap';
import { Ad } from '../../../generated/graphql';
import { PAGE_ADS_QUERY } from './Queries';
import { AdSummaries } from '../Ads/styles';
import { useQuery } from 'react-apollo-hooks';
import Paging from '../../General/Paging';
import ConfirmationModal from '../../Confirmation/ConfirmationModal';

const MyAds = ({ translations }: MultiProps) => {
  const ADS_NB_BY_PAGE = 5;
  const [pageIndex, setPageIndex] = useState(0);
  const [showModal, setshowModal] = useState(false);

  const { data, loading, error } = useQuery(PAGE_ADS_QUERY, {
    variables: { pageNumber: pageIndex, pageSize: ADS_NB_BY_PAGE },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Link href="/createAd" prefetch>
        <Button style={{ marginBottom: '1rem' }}>
          {translations.Ads.addAds}
        </Button>
      </Link>

      <button onClick={() => setshowModal(true)}>lolModal</button>
      <ConfirmationModal
        show={showModal}
        onClose={() => setshowModal(false)}
        onConfirm={() => console.log('yopyop')}
      />
      <Card>
        <AdSummaries>
          {data.me.ads.map((ad: Ad) => (
            <AdSummary adsQuery={PAGE_ADS_QUERY} key={ad.id} ad={ad} />
          ))}
        </AdSummaries>
      </Card>
      <Paging
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        maxItems={data.me.adCount}
        itemsByPage={ADS_NB_BY_PAGE}
      />
    </>
  );
};

export default multi(MyAds);

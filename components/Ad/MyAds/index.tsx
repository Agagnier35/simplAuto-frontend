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
import { Empty } from '../../Car/Cars/styles';
import BuyerSellerSVG from '../../Svg/BuyerSellerSVG';

const MyAds = ({ translations }: MultiProps) => {
  const ADS_NB_BY_PAGE = 5;
  const [pageIndex, setPageIndex] = useState(0);

  const { data, loading, error } = useQuery(PAGE_ADS_QUERY, {
    variables: { pageNumber: pageIndex, pageSize: ADS_NB_BY_PAGE },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <h2>{translations.general.myAds}</h2>
      <Link href="/createAd" prefetch>
        <Button style={{ marginBottom: '1rem' }}>
          {translations.Ads.addAds}
        </Button>
      </Link>

      {data.me.adCount > 0 ? (
        <>
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
      ) : (
        <Empty>
          <h3>{translations.Ads.noAds}</h3>
          <BuyerSellerSVG />
        </Empty>
      )}
    </>
  );
};

export default multi(MyAds);

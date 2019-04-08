import React, { useState } from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Link from 'next/link';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import AdSummary from '../AdSummary';
import { Button, Card, Breadcrumb } from 'react-bootstrap';
import { Ad } from '../../../generated/graphql';
import { PAGE_ADS_QUERY } from './Queries';
import { AdSummaries } from '../Ads/styles';
import { useQuery } from 'react-apollo-hooks';
import Paging from '../../General/Paging';
import { paging5pages } from '../../General/Preferences';
import { Empty } from '../../Car/Cars/styles';
import BuyerSellerSVG from '../../Svg/BuyerSellerSVG';

const MyAds = ({ translations }: MultiProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, loading, error } = useQuery(PAGE_ADS_QUERY, {
    variables: { pageNumber: pageIndex, pageSize: paging5pages },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Breadcrumb>
        <Link href={{ pathname: '/myAds' }} passHref>
          <Breadcrumb.Item>{translations.general.buy}</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>{translations.general.Ad}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>{translations.general.myAds}</h2>
      <Link href="/createAd" prefetch>
        <Button style={{ marginBottom: '1rem' }}>
          {translations.Ads.addAds}
        </Button>
      </Link>

      {data.me && data.me.adCount > 0 ? (
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
            itemsByPage={paging5pages}
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

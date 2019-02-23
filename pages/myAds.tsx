import React from 'react';
import { multi, MultiProps } from '../lib/MultiLang';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import AdSummary from '../components/AdSummary';
import { CardDeck, Button } from 'react-bootstrap';
import { Ad } from '../generated/graphql';

export const ALL_MY_ADS_QUERY = gql`
  {
    me {
      id
      creator {
        id
      }
      ads {
        id
        priceLowerBoundFeature {
          price
        }
        priceHigherBoundFeature {
          price
        }
        manufacturerFeature {
          manufacturer {
            name
          }
        }
        modelFeature {
          model {
            name
          }
        }
        categoryFeature {
          category {
            name
          }
        }
        mileageLowerBoundFeature {
          mileage
        }
        mileageHigherBoundFeature {
          mileage
        }
        yearLowerBoundFeature {
          year
        }
        yearHigherBoundFeature {
          year
        }
        features {
          feature {
            name
            category {
              name
            }
          }
        }
        isUrgent
        isFirst
        status
      }
    }
  }
`;

const MyAds = ({ translations }: MultiProps) => {
  return (
    <>
      <Link href="/createAd">
        <Button>{translations.Ads.addAds}</Button>
      </Link>
      <CardDeck>
        <Query query={ALL_MY_ADS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage error={error} />;
            return data.me.ads.map((ad: Ad) => (
              <AdSummary key={ad.id} ad={ad} />
            ));
          }}
        </Query>
      </CardDeck>
    </>
  );
};

export default multi(MyAds);

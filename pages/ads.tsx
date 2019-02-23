import React from 'react';
import { multi } from '../lib/MultiLang';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import AdSummary from '../components/AdSummary';
import { CardDeck } from 'react-bootstrap';
import { Ad } from '../generated/graphql';

const ALL_ADS_QUERY = gql`
  {
    ads {
      id
      creator {
        id
      }
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
`;

const Ads = () => {
  return (
    <CardDeck>
      <Query query={ALL_ADS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          return data.ads.map((ad: Ad) => <AdSummary key={ad.id} ad={ad} />);
        }}
      </Query>
    </CardDeck>
  );
};

export default multi(Ads);

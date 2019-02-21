import React from 'react';
import { multi } from '../lib/MultiLang';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import AdDetail from '../components/AdDetail';
import Translations from '../lib/MultiLang/locales/types';

const AD_DETAIL_QUERY = gql`
  {
    ad(id: $id) {
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
      offers {
        car {
          manufacturer {
            name
          }
          model {
            name
          }
          category {
            name
          }
          year
          mileage
          photos
          features {
            name
            category {
              name
            }
          }
        }
        price
      }
    }
  }
`;

export interface AdDetailProps {
  translations: Translations;
  id: string;
}

const FullAd = ({ translations, id }: AdDetailProps) => {
  return (
    <div>
      <Query query={AD_DETAIL_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          return <AdDetail key={data.ad.id} ad={data.ad} />;
        }}
      </Query>
    </div>
  );
};
export default multi(FullAd);

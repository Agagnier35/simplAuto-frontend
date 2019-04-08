import gql from 'graphql-tag';

export const USER_BY_ID = gql`
  query USER_BY_ID($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      companyName
      email
      language
      location {
        id
        name
        longitude
        latitude
      }
      radius
      birthDate {
        day
        month
        year
      }
      gender
      notificationEmailOffer
      notificationEmailMessage
      notificationInAppOffer
      notificationInAppMessage
      clientType
    }
  }
`;

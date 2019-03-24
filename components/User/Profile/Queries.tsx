import gql from 'graphql-tag';

export const GET_USER_INFO_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
      companyName
      email
      language
      location {
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

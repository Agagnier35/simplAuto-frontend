import gql from 'graphql-tag';

export const GET_USER_INFO_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
      email
      location
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
    }
  }
`;

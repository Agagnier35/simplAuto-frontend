import styled from 'styled-components';

const OtherStyle = styled.div`
  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  .geosuggest__input {
    width: 100%;
    padding: 0.38rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
  }

  .geosuggest__suggests {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .geosuggest__item {
    padding: 0.25rem;

    &:hover,
    &:focus {
      background: #f5f5f5;
    }
  }

  .geosuggest__item__matched-text {
    font-weight: bold;
  }
`;

export default OtherStyle;

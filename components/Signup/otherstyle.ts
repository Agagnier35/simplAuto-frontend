import styled from 'styled-components';

const OtherStyle = styled.form`
  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  .geosuggest__input {
    max-width: 60%;
    min-width: 60%;
  }

  .geosuggest__suggests {
    max-width: 65%;
    min-width: 65%;
  }

  .geosuggest__item:hover,
  .geosuggest__item:focus {
    background: #f5f5f5;
  }
  
  .geosuggest__item__matched-text {
    font-weight: bold;
  }

`;

export default OtherStyle;
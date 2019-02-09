import styled from 'styled-components';

const Form = styled.form`
  margin: 0;

  fieldset {
    border: 1px solid gray;
    border-radius: 1rem;
    text-align: center;
  }

  fieldset > div {
    display: inline-block;
    text-align: left;
  }

  h1{
    margin-bottom: 0;
    display: inline-block;
  }

  h2 {
    margin-top: 0;
  }
  
  p {
    display: inline;
  }

  button {
    margin: 0.5%;
  }

  img {
    margin-top: 1%;
    margin-left: 1%;
    margin-bottom: 2%;
    width: 4%;
  }

  .geoLoc{
    width: 400px;
  }

  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  .geosuggest__input {
    min-width: 64%;
  }

  .geosuggest__item:hover,
  .geosuggest__item:focus {
    background: #f5f5f5;
  }
  
  .geosuggest__item__matched-text {
    font-weight: bold;
  }

  .inputNeedSpace {
    min-width: 20%;
    margin-top: 1%;
    margin-bottom: 0.5%;
    margin-right: 2%;
  }

  .buttonSection {
    display: block;
  }

  .inlinePart {
    float:left;
    position: relative;
    width: 10%;
  }

  .firstInfoSection {
    text-align: center;
    display: block;
  }

  .nameSection {
    text-align: left;
    display: inline-block;
    padding-top: 1%;
    padding-left: 14.5%;
    margin-bottom: 0.5%;
    position: relative;
  }

`;

export default Form;
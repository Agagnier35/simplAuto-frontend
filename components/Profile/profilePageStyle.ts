import styled from 'styled-components';

const ProfileStyle = styled.form`
  margin: 0;

  fieldset {
    border: 1px solid gray;
    border-radius: 1rem;
    text-align: center;
  }
  
  hr {
    border: 1px solid gray;
  }

  fieldset > div {
    display: inline-block;
    text-align: center;
  }

  h1{
    margin-bottom: 0;
    display: inline-block;
  }
  
  p {
    display: inline-block;
  }
  
  input {
    display: inline-block;
  }

  button {
    margin: 0.5%;
  }

  input {
    margin-left: 2%;
  }

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

  .inputNeedSpace {
    min-width: 55%;
    margin-top: 1%;
    margin-bottom: 0.5%;
  }

  .radioNeedSpace {
    min-width: 7%;
    margin-right: 2%;
    margin-left: 1%;
  }

  .wrongPW {
    background-color: coral;
    min-width: 20%;
    margin-top: 1%;
    margin-bottom: 0.5%;
    margin-right: 2%;
  }

  .buttonSection {
    display: block;
    text-align: left;
    margin-bottom: 0.5%;
    margin-left: 1%;
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
    width: 35%;
    text-align: left;
    display: inline-block;
    padding-top: 1%;
    margin-bottom: 0.5%;
    position: relative;
  }

  .secondInfoSection {
    text-align: left;
    display: block;
  }

`;

export default ProfileStyle;
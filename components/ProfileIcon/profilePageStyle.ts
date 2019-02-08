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
  }

  h2 {
    margin-top: 0;
  }
  
  p {
    display: inline;
  }

  button {
    margin: 0.5%;
    display: inline-block;
    border-radius: 30%;
  }

  img {
    float: left;
    margin-top: 1%;
    margin-left: 1%;
    background-color: coral;
    width: 10%;
    border-radius: 50%;
  }

  .geoLoc{
    width: 400px;
  }

  .inputNeedSpace {
    max-width: 20%;
    margin-top: 1%;
    margin-bottom: 0.5%;
    margin-right: 2%;
  }

  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  .buttonSection {
    display: block;
  }

  .imageSection {
    width:10%;
    margin: 1%;
    display: inline-block;
    flex-wrap: wrap;
  }

  .inlinePart {
    float:left;
    position: relative;
    width: 10%;
  }

  .firstInfoSection {
    text-align: center;
    margin-bottom: 0.5%;
    position: relative;
    display: block;
  }

  .nameSection {
    text-align: left;
    display: inline-block;
    padding-left:1%;
    padding-top:1%;
  }

`;

export default Form;
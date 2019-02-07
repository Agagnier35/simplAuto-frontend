import styled from 'styled-components';

const Form = styled.form`
  margin: 0;

  fieldset {
    border: 1px solid gray;
    border-radius: 1rem;
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

  img {
    float:left;
    background-color: coral;
    max-width: 10%;
    max-height: 10%;
    border-radius: 50%;
  }

  .inputNeedSpace {
    max-width: 20%;
    margin-top: 1%;
    margin-bottom: 0.5%;
    margin-right: 2%;
  }

  .inlinePart {
    float:left;
    position: relative;
    width: 10%;
  }

  .firstInfoSection {
    width: auto;
    position: relative;
  }

  .vertical-center {
    min-height: 40%;
    vertical-align: middle;
  }

`;

export default Form;
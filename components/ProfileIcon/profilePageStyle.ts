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
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
  }

  .inputNeedSpace {
      max-width: 20%;
      margin-right: 5%;
  }

  .inlinePart {
    float:left;
    position: relative;
    width: 15%;
  }

  .firstInfoSection {
    height: auto;
    position: relative;
    background-color: coral;
    display: block;
  }

  .vertical-center {
    margin: auto;
  }

`;

export default Form;
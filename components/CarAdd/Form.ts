import styled from 'styled-components';

const Form = styled.form`
  margin: 0;

  .general, .addons {
    border: 1px solid gray;
    border-radius: 1rem;
  }

  h2 {
    margin-top: 5px;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 33%;
    display: inline-block;
  }
  
  .btn {
    font: bold 11px Arial;
    text-decoration: none;
    background-color: #EEEEEE;
    color: #333333;
    padding: 2px 6px 2px 6px;
    border-top: 1px solid #CCCCCC;
    border-right: 1px solid #333333;
    border-bottom: 1px solid #333333;
    border-left: 1px solid #CCCCCC;
  }

  td, th {
    border: none;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: gray;
  }

  textarea {
    margin-left: 5px;
    margin-top: 5px;
  }

  #photos {
      visibility: hidden;
      width: 0px;
  }
  h1 {
    text-decoration: underline;
  }
  select:disabled { color: gray; }

  .features {
    margin-left: 5px;
  }
  .carousel {
    max-width: 300px;
    max-height: 200px;
    height: auto;
  }

`;

export default Form;
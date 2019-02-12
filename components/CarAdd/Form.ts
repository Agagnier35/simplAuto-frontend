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

  textarea {
    resize: none;
  }
  h1 {
    text-decoration: underline;
  }
  select:disabled { color: gray; }

  .features {
    margin-left: 5px;
  }

  img {
    object-fit: contain;
    max-height: 175px;
  }

  .carousel-control-next-icon:after {
    content: '>';
    font-size: 55px;
    color: red;
  }

  .carousel-control-prev-icon:after {
    content: '<';
    font-size: 55px;
    color: red;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
  height: 100px;
  width: 100px;
  outline: black;
  background-size: 100%, 100%;
  border-radius: 50%;
  background-image: none;
}
  .carousel {
    max-width: 300px;
    max-height: 175px;
    object-fit: contain;
  }

`;

export default Form;

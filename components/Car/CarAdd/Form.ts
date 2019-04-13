import styled from 'styled-components';

const Form = styled.form`
  margin: 0;

  h1 {
    margin-bottom: 2rem;
  }

  .card {
    margin-bottom: 1rem;
  }

  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;

    .card {
      margin: 0.5rem;
      flex-grow: 1;

      & + .card {
        flex-grow: 10;
      }
    }
  }

  .card-number {
    color: ${props => props.theme.colors.primary};
    font-size: 2.5rem;
    line-height: 1.4rem;
    margin-right: 1rem;
  }

  .card-subtitle {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.primary};
  }

  .form-control {
    max-width: 500px;
  }

  .form-check-input {
    margin-top: 0.5rem;
  }

  .label-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;

    label {
      margin: 0.5rem;
      flex-grow: 1;
    }

    &.no-grow label {
      flex-grow: 0;
    }
  }

  #photos {
    visibility: hidden;
    width: 1px;
  }

  .file-select {
    margin-top: 1rem;
  }

  textarea {
    resize: none;
    margin-left: 5px;
  }

  img {
    object-fit: contain;
    max-height: 175px;
  }

  .carousel-control-next-icon::after {
    content: '>';
    font-size: 55px;
    color: ${props => props.theme.colors.primary};
  }

  .carousel-control-prev-icon::after {
    content: '<';
    font-size: 55px;
    color: ${props => props.theme.colors.primary};
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
    margin: auto;
    max-height: 175px;
    object-fit: contain;
  }
`;

export default Form;

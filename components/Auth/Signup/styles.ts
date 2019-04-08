import styled from 'styled-components';

export const SignupCard = styled.div`
  margin: 0;
  margin: auto;
  max-width: 400px;

  .card {
    margin-top: 2rem;
  }
`;

export const SignupForm = styled.form`
  .input-group-text {
    min-width: 45px;
    display: flex;
    justify-content: center;
  }

  .btn-primary {
    margin-top: 1rem;
  }

  a {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.primary};

    .btn {
      text-decoration: none;
    }
  }

  .form-group:nth-child(2) {
    margin-bottom: 0;
  }

  .geosuggest__input {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
  }

  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  .geosuggest__suggests {
    max-width: 65%;
    min-width: 65%;
  }

  .geosuggest__item:hover,
  .geosuggest__item:focus {
    background: #267dc0;
    color: #fff;
  }

  .geosuggest__item__matched-text {
    font-weight: bold;
  }

  .gender {
    input {
      margin-right: 0.5rem;
    }

    label + label {
      margin-left: 1rem;
    }
  }
`;

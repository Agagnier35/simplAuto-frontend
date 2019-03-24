import styled from 'styled-components';

const StyledSignup = styled.div`
  margin: 0;
  margin: auto;
  max-width: 400px;

  .card {
    margin-top: 2rem;
  }

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
  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
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

export default StyledSignup;

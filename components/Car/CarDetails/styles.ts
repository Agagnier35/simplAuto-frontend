import styled from 'styled-components';

const StyledCarDetails = styled.div`
  .carouselSection {
    width: auto;
    margin: auto;
    margin-bottom: 30px;
    object-fit: contain;
    text-align: center;
    vertical-align: middle;
  }

  img {
    padding: auto;
    max-height: 400px;
    max-width: 100%;
  }

  label {
    margin-left: 1.5rem;
  }

  p {
    display: inline;
    margin-bottom: 15%;
    margin-top: 10%;
    width: auto;
  }

  .card-number {
    color: ${props => props.theme.colors.primary};
    font-size: 2.5rem;
    line-height: 1.4rem;
    margin-right: 1rem;
  }

  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;

    .card {
      margin: 0.5rem;
      flex-grow: 1;
      margin-bottom: 15px;
    }
  }
`;

export default StyledCarDetails;

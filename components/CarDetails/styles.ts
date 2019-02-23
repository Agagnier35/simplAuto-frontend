import styled from 'styled-components';

const StyledCarDetails = styled.div`
  .carouselSection {
    width: 900px;
    margin: auto;
    margin-bottom: 30px;
    object-fit: contain;
    text-align: center;
    vertical-align: middle;
  }

  img {
    padding: auto;
    max-height: 400px;
  }

  .card-number {
    color: ${props => props.theme.colors.primary};
    font-size: 2.5rem;
    line-height: 1.4rem;
    margin-right: 1rem;
  }

  .firstCardWrapper {
    margin-bottom: 15px;
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
`;

export default StyledCarDetails;

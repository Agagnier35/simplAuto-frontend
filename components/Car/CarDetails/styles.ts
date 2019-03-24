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

export const BigImage = styled.img`
  width: 75%;
  height: 100%;
  border-radius: 0.25rem;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Images = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const SmallImage = styled.img`
  border-radius: 0.25rem;
  width: 100%;
  height: calc(33.33% - 0.66rem);
  object-fit: contain;

  & + & {
    margin-top: 1rem;
  }

  @media (max-width: 700px) {
    width: calc(33.33% - 0.66rem);

    & + & {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`;

export const SmallImages = styled.div`
  margin-left: 1rem;

  @media (max-width: 700px) {
    display: flex;
    margin-top: 1rem;
    margin-left: 0;
  }
`;

export default StyledCarDetails;

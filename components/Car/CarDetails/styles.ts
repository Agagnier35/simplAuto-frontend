import styled from 'styled-components';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';

export const BigImage = styled.img<{ imageCount: number }>`
  width: ${props => (props.imageCount > 1 ? '75%' : '100%')};
  height: 450px;
  border-radius: 0.25rem;
  object-fit: contain;
  background: white;
  cursor: pointer;
  transition: 0.25s ease;

  @media (max-width: 700px) {
    border-radius: 0;
    height: auto;
    max-height: 450px;
    margin: 0 calc(-16px - 1rem);
    width: 105vw;
  }

  &:hover {
    filter: brightness(0.8);
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
  background: white;
  cursor: pointer;
  transition: 0.25s ease;

  & + & {
    margin-top: 1rem;
  }

  @media (max-width: 700px) {
    width: calc(33.33% - 0.66rem);
    height: 22vw;
    background: white;

    & + & {
      margin-top: 0;
      margin-left: 1rem;
    }
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

export const MoreImages = styled.div`
  border-radius: 0.25rem;
  width: 100%;
  height: calc(33.33% - 0.66rem);
  object-fit: contain;
  background: white;
  cursor: pointer;
  transition: 0.25s ease;
  position: relative;

  img + & {
    margin-top: 1rem;
  }

  @media (max-width: 700px) {
    width: calc(33.33% - 0.66rem);
    height: 22vw;
    background: white;

    img + & {
      margin-top: 0;
      margin-left: 1rem;
    }
  }

  &:hover {
    filter: brightness(0.8);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0.6);
    background: white;
    border-radius: 0.25rem;
  }
`;

export const MoreAmount = styled.span`
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const SmallImages = styled.div`
  margin-left: 1rem;
  font-size: 2rem;

  @media (max-width: 700px) {
    display: flex;
    margin-top: 1rem;
    margin-left: 0;
  }
`;

export const OfferFeatureItem = styled(AdSummaryItem)`
  width: 50%;
  min-width: 300px;
`;

export const OfferFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

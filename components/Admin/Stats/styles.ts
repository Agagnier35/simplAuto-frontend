import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Container = styled.div`
  padding: 1.5rem;

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
`;

export const Title = styled.h1`
  font-size: 2rem;
  padding-bottom: 0.5rem;
  line-height: 1;
`;

export const SubTitle = styled.h1`
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  line-height: 1;
`;

export const OverallStats = styled.div``;

export const ResearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

export const CarSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;

  & > * {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.5rem;
  }

  .dropdown > button {
    width: 100%;
  }

  .dropdown-menu {
    width: 100%;
  }
`;

export const LocationSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  & > * {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.5rem;
  }
`;

export const Search = styled(Button)`
  margin-left: 1rem;
`;

export const ResearchResults = styled.div`
  padding-top: 0.5rem;
`;

export const APISection = styled.div`
  padding-bottom: 0.5rem;
`;

export const AppSection = styled.div`
  padding-bottom: 0.5rem;
`;

export const BestSellerSection = styled.div``;

export const UserRankWrapper = styled.div`
  display: flex;

  .image-wrapper > span {
    position: relative;
    bottom: -8px;
    right: -8px;
  }

  .image-wrapper > .user {
    flex-grow: 2;
  }
`;

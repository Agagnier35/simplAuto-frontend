import styled from 'styled-components';
import { UserStatus } from '../../../generated/graphql';

export const Container = styled.div`
  padding: 0.5rem 1.5rem;

  & + & {
    border-top: 1px solid #eef4f3;
  }

  &:hover {
    background: #f7f8fa;
  }

  .row {
    align-items: center;
    display: flex;
  }

  .dropleft button {
    &::before {
      display: none;
    }
  }
`;

export const A = styled.a`
  color: black;

  &:hover {
    color: black;
  }
`;

export const Name = styled.p`
  margin: 0;
  line-height: 1.2;
  font-weight: 500;
`;

export const Field = styled(Name)`
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StatusBadge = styled.span<{ status: UserStatus }>`
  height: 0.5rem;
  width: 0.5rem;
  background: ${props =>
    props.status === UserStatus.Banned ? 'red' : props.theme.colors.primary};
  margin-right: 0.5rem;
  display: block;
  border-radius: 100px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

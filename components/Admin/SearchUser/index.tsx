import React, { useState, FormEvent } from 'react';
import Paging from '../../General/Paging';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { USERS_QUERY } from './Queries';
import { User, UserWhereInput } from '../../../generated/graphql';
import UserSummary from '../../User/UserSummary';
import { Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import {
  Container,
  UserSummaries,
  Header,
  TitleWrapper,
  Title,
  Count,
  TableHeader,
  Actions,
  Search,
} from './styles';
import { MdPerson } from 'react-icons/md';
import Loading from '../../General/Loading';
import { BAN_USER_MUTATION } from './Mutations';

const MAX_USER_PER_PAGE = 5;

export interface SearchUserProps {}

const SearchUser = (props: SearchUserProps) => {
  const [pageIndexUser, setPageIndexUser] = useState(0);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function getUserWhereInput() {
    const where: UserWhereInput = {};

    if (appliedQuery !== '') {
      where.OR = [
        {
          firstName_contains: appliedQuery,
        },
        {
          lastName_contains: appliedQuery,
        },
        {
          companyName_contains: appliedQuery,
        },
      ];
    }

    return where;
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedQuery(searchQuery);
  }

  const { data, loading } = useQuery(USERS_QUERY, {
    variables: {
      where: getUserWhereInput(),
      pageNumber: pageIndexUser,
      pageSize: MAX_USER_PER_PAGE,
    },
  });

  console.log(data);
  // if (!data || !data.users) return null;

  let count;
  let users;
  if (data.users) {
    count = data.users.count;
    users = data.users.users;
  }

  return (
    <Container>
      <UserSummaries>
        <Header>
          <TitleWrapper>
            <Title>Users</Title>
            <Count>{users ? `${count} total` : ' '}</Count>
          </TitleWrapper>
          <Actions onSubmit={handleSearch}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <MdPerson />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Name or Company"
                aria-describedby="inputGroupPrepend"
                type="text"
                name="search query"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.currentTarget.value)}
              />
            </InputGroup>
            <Search type="submit">Search</Search>
          </Actions>
        </Header>
        <TableHeader>
          <Col xs={3}>ClientType</Col>
          <Col xs={8} md={4}>
            Email
          </Col>
          <Col xs={2} className="tablet-up">
            Joined
          </Col>
          <Col xs={2} className="tablet-up">
            status
          </Col>
          <Col xs={1} />
        </TableHeader>
        {loading && <Loading style={{ marginLeft: '1.5rem' }} />}
        {users &&
          users.length > 0 &&
          users.map((user: User) => <UserSummary user={user} />)}
        {count > MAX_USER_PER_PAGE && (
          <Paging
            pageIndex={pageIndexUser}
            setPageIndex={setPageIndexUser}
            maxItems={count}
            itemsByPage={MAX_USER_PER_PAGE}
          />
        )}
      </UserSummaries>
    </Container>
  );
};

export default SearchUser;

import React from 'react';
import { multi } from '../../../lib/MultiLang';
import { User, ClientType } from '../../../generated/graphql';
import { Container, Name, Field, StatusBadge, StatusWrapper } from './styles';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { More } from '../../Ad/AdSummary/styles';
import { IoIosMore as MoreIcon } from 'react-icons/io';
import moment from 'moment';
import { FaUserSlash, FaUserEdit } from 'react-icons/fa';
import { useMutation } from 'react-apollo-hooks';
import { BAN_USER_MUTATION } from '../../Admin/SearchUser/Mutations';
import Link from 'next/link';

interface UserSummaryProps {
  user: User;
}

const UserSummary = ({ user }: UserSummaryProps) => {
  const banUser = useMutation(BAN_USER_MUTATION);

  return (
    <Container>
      <Row>
        <Col xs={3}>
          {user.clientType === ClientType.Individual ? (
            <>
              <Name>{user.firstName}</Name>
              <Name>{user.lastName}</Name>
            </>
          ) : (
            <Name>{user.companyName}</Name>
          )}
        </Col>
        <Col xs={8} md={4}>
          <Field>{user.email}</Field>
        </Col>
        <Col xs={2} className="tablet-up">
          <Field>{moment(user.createdAt).format('L')}</Field>
        </Col>
        <Col xs={2} className="tablet-up">
          <StatusWrapper>
            <StatusBadge status={user.status} />
            <Field>{user.status}</Field>
          </StatusWrapper>
        </Col>
        <Col xs={1}>
          <Dropdown drop={'left'}>
            <More size="sm" variant="light" id="dropdown-basic">
              <MoreIcon />
            </More>
            <Dropdown.Menu>
              <Link
                href={{
                  pathname: '/profile',
                  query: { id: user.id },
                }}
                passHref
              >
                <Dropdown.Item as="a">
                  <FaUserEdit />
                  modify
                </Dropdown.Item>
              </Link>
              <Dropdown.Item
                onClick={() => banUser({ variables: { id: user.id } })}
              >
                <FaUserSlash />
                ban
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default multi(UserSummary);

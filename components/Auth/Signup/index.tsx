import React, { Component, FormEvent } from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import StyledSignup from './styles';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import Select from '../../General/Select';
import gql from 'graphql-tag';
import ErrorMessage from '../../General/ErrorMessage';
import Geosuggest from 'react-geosuggest';
import { MdLockOutline } from 'react-icons/md';
import BrandHeader from './BrandHeader';
import { LOGGED_IN_QUERY } from '../../General/Header';
import Router from 'next/router';
import OtherStyle from './otherstyle';
import {
  Gender,
  Date as BirthDate,
  ClientType,
} from '../../../generated/graphql';
import { Dictionary } from '../../../lib/Types/Dictionary';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: UserSignupInput!) {
    signup(data: $data) {
      id
    }
  }
`;

interface SignupState {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  gender: Gender;
  birthDate: BirthDate;
  clientType: ClientType;
}

class Signup extends Component<MultiProps, SignupState> {
  state: SignupState = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
    clientType: ClientType.Individual,
  };

  isBirthDateValid = () => {
    return (
      new Date(
        this.state.birthDate.year,
        this.state.birthDate.month,
        this.state.birthDate.day,
      ).toString() !== 'Invalid Date'
    );
  };

  isStateSignupValid = () => {
    return (
      this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.email !== '' &&
      this.state.location !== '' &&
      this.state.password === this.state.confirmPassword &&
      this.isBirthDateValid()
    );
  };

  handleSignup = async (e: FormEvent<HTMLFormElement>, signup: () => void) => {
    e.preventDefault();

    this.isStateSignupValid()
      ? await signup()
      : this.setState({
          firstName: '',
          lastName: '',
          companyName: '',
          email: '',
          password: '',
          confirmPassword: '',
          clientType: ClientType.Individual,
        });
    this.setState({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      clientType: ClientType.Individual,
    });
    Router.push('/');
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  handleGeoLocChange = (e: string) => {
    this.state.location = e;
  };

  datePickerInput = () => {
    const curr = new Date();
    const { birthDate } = this.state;
    curr.setFullYear(birthDate.year, birthDate.month - 1, birthDate.day);
    const date = curr.toISOString().substr(0, 10);
    return (
      <Form.Control
        type="date"
        name="birthDate"
        className="inputNeedSpace"
        defaultValue={date}
        onChange={this.handleChangeDate}
      />
    );
  };

  handleChangeDate = (e: FormEvent<any>) => {
    const day = parseInt(e.currentTarget.value.substr(8, 2), 10);
    const month = parseInt(e.currentTarget.value.substr(5, 2), 10);
    const year = parseInt(e.currentTarget.value.substr(0, 4), 10);
    const curr = new Date();
    curr.setFullYear(day, month, year);
    this.setState({
      birthDate: { day, month, year },
    } as SignupState);
  };

  getSignupPayload = () => {
    const { confirmPassword, ...userInfos } = this.state;
    return { data: userInfos };
  };

  handleChangeSelect = (value: any) => {
    if (value === ClientType.Company) {
      this.setState({ clientType: ClientType.Company });
    } else {
      this.setState({ clientType: ClientType.Individual });
    }
  };

  render() {
    const {
      translations: { signup, general, clientType },
    } = this.props;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.getSignupPayload()}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {(handleMutation, { loading, error }) => (
          <StyledSignup>
            <Card>
              <BrandHeader />
              <Card.Body>
                <Form
                  method="post"
                  onSubmit={(e: any) => this.handleSignup(e, handleMutation)}
                >
                  <fieldset disabled={loading} aria-busy={loading}>
                    <Select
                      options={[
                        { name: clientType.company, value: ClientType.Company },
                        {
                          name: clientType.individual,
                          value: ClientType.Individual,
                        },
                      ]}
                      accessor="name"
                      handleChange={(item: any) =>
                        this.handleChangeSelect(item.value)
                      }
                      label={`${signup.clientType} :`}
                      selected={{
                        name: clientType.individual,
                        value: ClientType.Individual,
                      }}
                    />
                    <div
                      hidden={this.state.clientType != ClientType.Individual}
                    >
                      <Form.Group>
                        <Form.Label>{general.firstName}</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder={general.firstName}
                            aria-describedby="inputGroupPrepend"
                            required
                            type="firstName"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {general.firstName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>{general.lastName}</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder={general.lastName}
                            aria-describedby="inputGroupPrepend"
                            required
                            type="lastName"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {general.lastName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <Form.Group
                      hidden={this.state.clientType != ClientType.Company}
                    >
                      <Form.Label>{general.companyName}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          placeholder={general.companyName}
                          aria-describedby="inputGroupPrepend"
                          required
                          type="companyName"
                          name="companyName"
                          value={this.state.companyName}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {general.companyName}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{general.email}</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            @
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          placeholder={general.email}
                          aria-describedby="inputGroupPrepend"
                          required
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {general.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{general.password}</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <MdLockOutline />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          aria-describedby="inputGroupPrepend"
                          required
                          type="password"
                          name="password"
                          placeholder={general.password}
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {general.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{general.confirmPassword}</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <MdLockOutline />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          aria-describedby="inputGroupPrepend"
                          required
                          type="password"
                          name="confirmPassword"
                          placeholder={general.confirmPassword}
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                        />

                        <Form.Control.Feedback type="invalid">
                          {general.confirmPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{general.gender}</Form.Label>
                    </Form.Group>
                    <label htmlFor="gender">
                      <input
                        type="radio"
                        name="gender"
                        onChange={this.handleChange}
                        value={Gender.Male}
                      />
                      {Gender.Male}
                      <input
                        type="radio"
                        name="gender"
                        onChange={this.handleChange}
                        value={Gender.Female}
                      />
                      {Gender.Female}
                      <input
                        type="radio"
                        name="gender"
                        onChange={this.handleChange}
                        value={Gender.Other}
                      />
                      {Gender.Other}
                    </label>

                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <OtherStyle>
                        <Geosuggest onChange={this.handleGeoLocChange} />
                      </OtherStyle>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Birth date</Form.Label>
                      <InputGroup>{this.datePickerInput()}</InputGroup>
                    </Form.Group>

                    <Button variant="primary" type="submit" block>
                      {signup.title}
                    </Button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
            <ErrorMessage error={error} />
          </StyledSignup>
        )}
      </Mutation>
    );
  }
}

export default multi(Signup);

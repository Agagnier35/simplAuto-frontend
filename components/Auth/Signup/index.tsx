import React, { Component, FormEvent } from 'react';
import { multiUpdater, MultiProps } from '../../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import { SignupCard, SignupForm } from './styles';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import Select from '../../General/Select';
import gql from 'graphql-tag';
import ErrorMessage from '../../General/ErrorMessage';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { MdLockOutline } from 'react-icons/md';
import BrandHeader from './BrandHeader';
import { LOGGED_IN_QUERY } from '../../General/Header';
import Router from 'next/router';
import SignupFormValidation from '../../../lib/FormValidator/SignupFormValidation';
import {
  Gender,
  Date as BirthDate,
  ClientType,
  UserSignupInput,
  UserLanguage,
  Location,
} from '../../../generated/graphql';
import { Dictionary } from '../../../lib/Types/Dictionary';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: UserSignupInput!) {
    signup(data: $data) {
      id
    }
  }
`;

export interface SignupState {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: Location;
  radius: number;
  gender: Gender;
  birthDate: BirthDate;
  clientType: ClientType;
  language: UserLanguage;
  touched: Dictionary<{
    firstName: boolean;
    lastName: boolean;
    companyName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    location: boolean;
    birthDate: boolean;
  }>;
}

const redText = {
  width: '100%',
  marginTop: '0.25rem',
  fontSize: '80%',
  color: '#dc3545',
};

class Signup extends Component<MultiProps, SignupState> {
  state: Dictionary<SignupState> = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: {
      name: '',
      longitude: 0,
      latitude: 0,
    },
    radius: 100,
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
    clientType: ClientType.Individual,
    language: UserLanguage.French,
    touched: {
      firstName: false,
      lastName: false,
      companyName: false,
      email: false,
      password: false,
      confirmPassword: false,
      location: false,
      birthDate: false,
    },
  };

  isBirthDateValid = () => {
    return (
      this.state.birthDate.year !== 0 &&
      this.state.birthDate.month !== 0 &&
      this.state.birthDate.day !== 0
    );
  };

  isStateSignupValid = () => {
    return (
      ((this.state.firstName !== '' && this.state.lastName !== '') ||
        this.state.companyName !== '') &&
      this.state.email !== '' &&
      this.state.location.name !== '' &&
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
          language: UserLanguage.French,
        });
    let localeValue = 'fr';
    if (this.state.language === UserLanguage.English) {
      localeValue = 'en';
    }
    this.props.changeLocale(localeValue);
    Router.push('/');
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  handleChangeRadius = (e: FormEvent<any>) => {
    const re = /^[0-9\b]+$/;
    if (e.currentTarget.value === '') {
      this.setState({ radius: 0 });
    }

    if (re.test(e.currentTarget.value)) {
      this.setState({ radius: parseInt(e.currentTarget.value, 10) });
    }
  };

  handleGeoLocChange = (suggest: Suggest | undefined) => {
    this.setState(
      suggest
        ? {
            location: {
              name: suggest.label,
              longitude: parseFloat(suggest.location.lng),
              latitude: parseFloat(suggest.location.lat),
            },
          }
        : {
            location: {
              name: '',
              longitude: 0,
              latitude: 0,
            },
          },
    );
  };

  handleChangeDate = (e: FormEvent<any>) => {
    const day = parseInt(e.currentTarget.value.substr(8, 2), 10);
    const month = parseInt(e.currentTarget.value.substr(5, 2), 10);
    const year = parseInt(e.currentTarget.value.substr(0, 4), 10);
    const curr = new Date();
    curr.setFullYear(day, month, year);
    this.setState({ birthDate: { day, month, year } });
  };

  getSignupPayload = () => {
    const {
      clientType,
      // Individual
      firstName,
      lastName,
      birthDate,
      gender,
      // Company
      companyName,
      // We dont want in rest
      confirmPassword,
      touched,
      // rest
      ...rest
    } = this.state;

    const myData: UserSignupInput = { ...rest, clientType };
    if (clientType === ClientType.Individual) {
      myData.firstName = firstName;
      myData.lastName = lastName;
      myData.birthDate = birthDate;
      myData.gender = gender;
    } else if (clientType === ClientType.Company) {
      myData.companyName = companyName;
    }

    return { data: myData };
  };

  handleChangeSelect = (value: ClientType) => {
    this.setState({
      firstName: '',
      lastName: '',
      companyName: '',
      clientType: value,
    });
  };

  fieldTouched = (key: string) => {
    const touched = { ...this.state.touched };
    touched[key] = true;
    this.setState({ touched });
  };

  render() {
    const {
      translations: { signup, general, clientType, profile },
    } = this.props;
    const touched = { ...this.state.touched };
    const signupformValidation = new SignupFormValidation(general);
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.getSignupPayload()}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {(handleMutation, { loading, error }) => (
          <SignupCard>
            <Card>
              <BrandHeader />
              <Card.Body>
                <SignupForm
                  method="put"
                  onSubmit={e => this.handleSignup(e, handleMutation)}
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
                      hidden={this.state.clientType !== ClientType.Individual}
                    >
                      <Form.Group>
                        <Form.Label>{general.firstName}</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder={general.firstName}
                            aria-describedby="inputGroupPrepend"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            onBlur={() => this.fieldTouched('firstName')}
                            isInvalid={
                              touched.firstName &&
                              !signupformValidation.isNameValid(
                                this.state.firstName,
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {signupformValidation.isNameValid(
                              this.state.firstName,
                            )}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>{general.lastName}</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder={general.lastName}
                            aria-describedby="inputGroupPrepend"
                            type="lastName"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            onBlur={() => this.fieldTouched('lastName')}
                            isInvalid={
                              touched.lastName &&
                              !signupformValidation.isNameValid(
                                this.state.lastName,
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {general.lastName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </div>

                    <Form.Group
                      hidden={this.state.clientType !== ClientType.Company}
                    >
                      <Form.Label>{general.companyName}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          placeholder={general.companyName}
                          aria-describedby="inputGroupPrepend"
                          type="text"
                          name="companyName"
                          value={this.state.companyName}
                          onChange={this.handleChange}
                          onBlur={() => this.fieldTouched('companyName')}
                          isInvalid={
                            touched.companyName &&
                            !signupformValidation.isNameValid(
                              this.state.companyName,
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {signupformValidation.lastNameError(
                            this.state.lastName,
                          )}
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
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          onBlur={() => this.fieldTouched('email')}
                          isInvalid={
                            touched.email &&
                            !signupformValidation.isEmailValid(this.state.email)
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {signupformValidation.emailError()}
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
                          type="password"
                          name="password"
                          placeholder={general.password}
                          value={this.state.password}
                          onChange={this.handleChange}
                          onBlur={() => this.fieldTouched('password')}
                          isInvalid={
                            touched.password &&
                            !signupformValidation.isPasswordValid(
                              this.state.password,
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {signupformValidation.passwordError()}
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
                          type="password"
                          name="confirmPassword"
                          placeholder={general.confirmPassword}
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                          onBlur={() => this.fieldTouched('confirmPassword')}
                          isInvalid={
                            touched.confirmPassword &&
                            !signupformValidation.isConfirmPasswordValid(
                              this.state.confirmPassword,
                              this.state.password,
                            )
                          }
                        />

                        <Form.Control.Feedback type="invalid">
                          {signupformValidation.confirmPasswordError(
                            this.state.password,
                            this.state.confirmPassword,
                          )}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <div
                      hidden={this.state.clientType !== ClientType.Individual}
                    >
                      <Form.Group>
                        <Form.Label>{general.gender}</Form.Label>
                      </Form.Group>
                      <div className="gender">
                        <label htmlFor="gender">
                          <input
                            type="radio"
                            name="gender"
                            onChange={this.handleChange}
                            value={Gender.Male}
                          />
                          {profile.male}
                        </label>
                        <label htmlFor="gender">
                          <input
                            type="radio"
                            name="gender"
                            onChange={this.handleChange}
                            value={Gender.Female}
                          />
                          {profile.female}
                        </label>
                        <label htmlFor="gender">
                          <input
                            type="radio"
                            name="gender"
                            onChange={this.handleChange}
                            value={Gender.Other}
                          />
                          {profile.other}
                        </label>
                      </div>
                      <Form.Group>
                        <Form.Label>{general.langage}</Form.Label>
                      </Form.Group>
                      <label htmlFor="language">
                        {general.langages.french}
                        <input
                          type="radio"
                          name="language"
                          onChange={this.handleChange}
                          value={UserLanguage.French}
                        />{' '}
                        {general.langages.english}
                        <input
                          type="radio"
                          name="language"
                          onChange={this.handleChange}
                          value={UserLanguage.English}
                        />
                      </label>
                    </div>

                    <Form.Group>
                      <Form.Label>{profile.location}</Form.Label>
                      <Geosuggest
                        onBlur={() => this.fieldTouched('location')}
                        placeholder={profile.address}
                        onChange={() => this.handleGeoLocChange(undefined)}
                        onSuggestSelect={(suggest: Suggest) =>
                          this.handleGeoLocChange(suggest)
                        }
                        placeholder={signup.location}
                      />
                      <div
                        style={redText}
                        hidden={
                          !(
                            touched.location &&
                            !signupformValidation.isLocationValid(
                              this.state.location,
                            )
                          )
                        }
                      >
                        {signupformValidation.locationError()}
                      </div>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{general.radius}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          placeholder={general.radius}
                          aria-describedby="inputGroupPrepend"
                          type="radius"
                          name="radius"
                          value={this.state.radius.toString()}
                          onChange={this.handleChangeRadius}
                        />
                        <Form.Control.Feedback type="invalid">
                          {general.radius}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      hidden={this.state.clientType !== ClientType.Individual}
                    >
                      <Form.Label>{profile.birth}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="date"
                          name="birthDate"
                          className="inputNeedSpace"
                          isInvalid={
                            this.state.touched.birthDate &&
                            !signupformValidation.isBirthDateValid(
                              this.state.birthDate,
                            )
                          }
                          onBlur={() => this.fieldTouched('birthDate')}
                          onChange={this.handleChangeDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {signupformValidation.birthDateError()}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Button
                      disabled={
                        !signupformValidation.isSignupFormStateValid(this.state)
                      }
                      variant="primary"
                      type="submit"
                      block
                    >
                      {signup.title}
                    </Button>
                  </fieldset>
                </SignupForm>
              </Card.Body>
            </Card>
            <ErrorMessage error={error} />
          </SignupCard>
        )}
      </Mutation>
    );
  }
}

export default multiUpdater(Signup);

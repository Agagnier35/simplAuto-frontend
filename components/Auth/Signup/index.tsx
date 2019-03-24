import React, { Component, FormEvent } from 'react';
import { multiUpdater, MultiProps } from '../../../lib/MultiLang';
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
import SignupFormValidation from '../../../lib/FormValidator/SignupFormValidation';
import {
  Gender,
  Date as BirthDate,
  ClientType,
  UserSignupInput,
  UserLanguage,
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
  language: string;
  touched: Dictionary<{
    firstName: boolean;
    lastName: boolean;
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
    location: '',
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
    clientType: ClientType.Individual,
    language: '',
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
      location: false,
      birthDate: false,
    },
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
      ((this.state.firstName !== '' && this.state.lastName !== '') ||
        this.state.companyName !== '') &&
      this.state.email !== '' &&
      this.state.location !== '' &&
      this.state.password === this.state.confirmPassword
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
          language: '',
        });
    this.setState({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      clientType: ClientType.Individual,
      language: '',
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

  handleGeoLocChange = (e: string) => {
    this.setState({ location: e });
  };

  datePickerInput = (signupformValidation: SignupFormValidation) => {
    const curr = new Date();
    const { birthDate } = this.state;
    curr.setFullYear(birthDate.year, birthDate.month - 1, birthDate.day);
    const date = curr.toISOString().substr(0, 10);
    return (
      <>
        <Form.Control
          type="date"
          name="birthDate"
          className="inputNeedSpace"
          isInvalid={
            this.state.touched.birthDate &&
            !signupformValidation.isBirthDateValid(date)
          }
          onBlur={() => this.fieldTouched('birthDate')}
          defaultValue={date}
          onChange={this.handleChangeDate}
        />
        <Form.Control.Feedback type="invalid">
          {signupformValidation.birthDateError()}
        </Form.Control.Feedback>
      </>
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

  isNotUsefullCompanyInfo = (item: string) => {
    return (
      this.state.clientType === ClientType.Company &&
      (item === 'gender' || item === 'birthDate')
    );
  };

  getSignupPayload = () => {
    const myData: Dictionary<UserSignupInput> = {
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
    Object.keys(this.state).map(item => {
      if (item !== 'confirmPassword' && this.state[item] !== '') {
        myData[item] = this.state[item];
      } else if (this.state[item] === '') {
        delete myData[item];
      }
      if (this.isNotUsefullCompanyInfo(item)) {
        delete myData[item];
      }
    });
    delete myData['confirmPassword'];
    console.log(myData);
    return { data: myData };
  };

  handleChangeSelect = (value: any) => {
    this.setState({ firstName: '', lastName: '', companyName: '' });
    if (value === ClientType.Company) {
      this.setState({ clientType: ClientType.Company });
    } else {
      this.setState({ clientType: ClientType.Individual });
    }
  };

  fieldTouched = (key: string) => {
    const touched = { ...this.state.touched };
    touched[key] = true;
    this.setState({ touched });
  };

  render() {
    const {
      translations: { signup, general, clientType },
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
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            onBlur={() => this.fieldTouched('firstName')}
                            isInvalid={
                              touched.firstName &&
                              !signupformValidation.isFirstNameValid(
                                this.state.firstName,
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {signupformValidation.firstNameError(
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
                          type="text"
                          name="companyName"
                          value={this.state.companyName}
                          onChange={this.handleChange}
                          onBlur={() => this.fieldTouched('lastName')}
                          isInvalid={
                            touched.lastName &&
                            !signupformValidation.isLastNameValid(
                              this.state.lastName,
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
                          required
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
                          required
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
                          required
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
                      hidden={this.state.clientType != ClientType.Individual}
                    >
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
                      <Form.Label>Location</Form.Label>
                      <OtherStyle>
                        <Geosuggest
                          onBlur={() => this.fieldTouched('location')}
                          onChange={this.handleGeoLocChange}
                          onSuggestSelect={(suggest: any) =>
                            this.handleGeoLocChange(suggest.label)
                          }
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
                      </OtherStyle>
                    </Form.Group>

                    <Form.Group
                      hidden={this.state.clientType != ClientType.Individual}
                    >
                      <Form.Label>Birth date</Form.Label>
                      <InputGroup>
                        {this.datePickerInput(signupformValidation)}
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

export default multiUpdater(Signup);

import React, { Component, FormEvent } from 'react';
import { multi, MultiProps, Gender } from '../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import StyledSignup from './styles';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage/index';
import Geosuggest from 'react-geosuggest';
import { MdLockOutline } from 'react-icons/md';
import BrandHeader from './BrandHeader';
import OtherStyle from "./otherstyle";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: UserSignupInput!) {
    signup(data: $data) {
      id
    }
  }
`;

interface BirthDate {
  day: number;
  month: number;
  year: number;
}

interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  gender: Gender;
  birthDate: BirthDate;
}

class Signup extends Component<MultiProps, SignupState> {
  state: SignupState = {
    firstName: '',
    lastName: '',
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
  };

  isBirthDateValid = () => {
    return new Date(this.state.birthDate.year, this.state.birthDate.month, this.state.birthDate.day,).toString() !== 'Invalid Date';
  };

  isStateSignupValid = () => {
    return (
      this.state.firstName != '' &&
      this.state.lastName != '' &&
      this.state.email != '' &&
      this.state.location != '' &&
      this.state.password === this.state.confirmPassword &&
      this.isBirthDateValid()
    );
  };

  handleSignup = async (e: FormEvent<HTMLFormElement>, signup: () => void) => {
    e.preventDefault();

    this.isStateSignupValid()
      ? await signup()
      : this.setState({firstName: '', lastName: '', email: '', password: '',confirmPassword: '',});
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  handleGeoLocChange = (e: string) => {
    this.state.location = e;
  };

  handleBirthDateChange = (e: FormEvent<any>) => {
    if (e.currentTarget.name === 'Day') {
      const newDate: BirthDate = {
        day: parseInt(e.currentTarget.value) >= 1 && parseInt(e.currentTarget.value) <= 31 ? parseInt(e.currentTarget.value): 1,
        month: this.state.birthDate.month,
        year: this.state.birthDate.year,
      };
      this.setState({ birthDate: newDate });
    } else if (e.currentTarget.name === 'Month') {
      const newDate: BirthDate = {
        day: this.state.birthDate.day,
        month: parseInt(e.currentTarget.value) >= 1 && parseInt(e.currentTarget.value) <= 12 ? parseInt(e.currentTarget.value): 1,
        year: this.state.birthDate.year,
      };
      this.setState({ birthDate: newDate });
    } else {
      const newDate: BirthDate = {
        day: this.state.birthDate.day,
        month: this.state.birthDate.month,
        year: parseInt(e.currentTarget.value) >= 1900 && parseInt(e.currentTarget.value) <= 2010 ? parseInt(e.currentTarget.value): 1900,
      };
      this.setState({ birthDate: newDate });
    }
  };

  getSignupPayload = () => {
    const { confirmPassword, ...userInfos } = this.state;
    return { data: userInfos };
  };

  render() {
    const {
      translations: { signup, general },
    } = this.props;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.getSignupPayload()}>
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
                      {/* <InputGroup>
                          <InputGroup.Radio aria-label="Radio button for following text input" /> {Gender.Male}
                          <InputGroup.Radio aria-label="Radio button for following text input" /> {Gender.Female}
                          <InputGroup.Radio aria-label="Radio button for following text input" /> {Gender.Other}
                      </InputGroup> */}
                        {/* <Form.Control aria-label="Text input with radio button" /> */}
                        {/* <Form.Check inline label={Gender.Male} type="radio" value={Gender.Male}} />
                        <Form.Check inline label={Gender.Female} type="radio" value={Gender.Female}} />
                        <Form.Check inline label={Gender.Other} type="radio" value={Gender.Other}} /> */}
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
                        <InputGroup>
                          <Form.Control
                          aria-describedby="inputGroupPrepend"
                          required
                          type="number"
                          name={general.birthDate.day}
                          value={this.state.birthDate.day.toString()}
                          onChange={this.handleBirthDateChange}
                          />
                          <Form.Control
                          aria-describedby="inputGroupPrepend"
                          required
                          type="number"
                          name={general.birthDate.month}
                          value={this.state.birthDate.month.toString()}
                          onChange={this.handleBirthDateChange}
                          />
                          <Form.Control
                          aria-describedby="inputGroupPrepend"
                          required
                          type="number"
                          name={general.birthDate.year}
                          value={this.state.birthDate.year.toString()}
                          onChange={this.handleBirthDateChange}
                          />
                        </InputGroup>
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
         
          // <Form
          //   method="post"
          //   onSubmit={e => this.handleSignup(e, handleMutation)}
          // >
          //   <fieldset disabled={loading} aria-busy={loading}>
          //     <h2>{signup.title}</h2>
          //     <label htmlFor="firstName">
          //       {general.firstName}
          //       <input
          //         type="firstName"
          //         name="firstName"
          //         placeholder={general.firstName}
          //         value={this.state.firstName}
          //         onChange={this.handleChange}
          //       />
          //     </label>
          //     <br />
          //     <label htmlFor="lastName">
          //       {general.lastName}
          //       <input
          //         type="lastName"
          //         name="lastName"
          //         placeholder={general.lastName}
          //         value={this.state.lastName}
          //         onChange={this.handleChange}
          //       />
          //     </label>
          //     <br />
          //     <label htmlFor="email">
          //       {general.email}
          //       <input
          //         type="email"
          //         name="email"
          //         placeholder={general.email}
          //         value={this.state.email}
          //         onChange={this.handleChange}
          //       />
          //     </label>
          //     <br />
          //     <div>
          //       <p>Location: </p>
          //       <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5qmk1ucd5sr6Jm-3SWVup3ZIhfjxtnU&libraries=places" />
          //       <Geosuggest onChange={this.handleGeoLocChange} />
          //     </div>
          //     <label htmlFor="password">
          //       {general.password}
          //       <input
          //         type="password"
          //         name="password"
          //         placeholder={general.password}
          //         value={this.state.password}
          //         onChange={this.handleChange}
          //       />
          //     </label>
          //     <br />
          //     <label htmlFor="confirmPassword">
          //       {general.confirmPassword}
          //       <input
          //         type="password"
          //         name="confirmPassword"
          //         placeholder={general.confirmPassword}
          //         value={this.state.confirmPassword}
          //         onChange={this.handleChange}
          //       />
          //     </label>
          //     <br />
          //     <label htmlFor="gender">
          //       {general.gender}
          //       <input
          //         type="radio"
          //         name="gender"
          //         onChange={this.handleChange}
          //         value={Gender.Male}
          //       />
          //       {Gender.Male}
          //       <input
          //         type="radio"
          //         name="gender"
          //         onChange={this.handleChange}
          //         value={Gender.Female}
          //       />
          //       {Gender.Female}
          //       <input
          //         type="radio"
          //         name="gender"
          //         onChange={this.handleChange}
          //         value={Gender.Other}
          //       />
          //       {Gender.Other}
          //     </label>
          //     <br />
          //     <label htmlFor="birthDate">
          //       Birth Date
          //       <input
          //         type="number"
          //         onChange={this.handleBirthDateChange}
          //         name={general.birthDate.day}
          //         value={this.state.birthDate.day}
          //       />
          //       <input
          //         type="number"
          //         onChange={this.handleBirthDateChange}
          //         name={general.birthDate.month}
          //         value={this.state.birthDate.month}
          //       />
          //       <input
          //         type="number"
          //         onChange={this.handleBirthDateChange}
          //         name={general.birthDate.year}
          //         value={this.state.birthDate.year}
          //       />
          //     </label>
          //     <br />
          //     <button type="submit">{signup.title}</button>
          //   </fieldset>
          //   <ErrorMessage error={error} />
          // </Form>
        )}
      </Mutation>
    );
  }
}

export default multi(Signup);

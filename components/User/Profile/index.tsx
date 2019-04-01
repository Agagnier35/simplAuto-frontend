import React, { FormEvent, Component } from 'react';
import Style from './style';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { MultiProps, multiUpdater } from '../../../lib/MultiLang';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { MdLockOutline } from 'react-icons/md';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import Toggle from 'react-toggle';
import {
  User,
  UserUpdateInput,
  Gender,
  Date as SchemaDate,
  Location,
  UserLanguage,
  ClientType,
} from '../../../generated/graphql';
import { Dictionary } from '../../../lib/Types/Dictionary';
import { GET_USER_INFO_QUERY } from './Queries';
import ProfileFormValidation from '../../../lib/FormValidator/ProfileFormValidation';

const CLASSNAME_INIT_CONFIRMATION: string = 'inputNeedSpace';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATEUSER_MUTATION($data: UserUpdateInput!) {
    updateUser(data: $data) {
      id
      language
    }
  }
`;

export interface ProfileState {
  firstName: string | undefined;
  lastName: string | undefined;
  companyName: string | undefined;
  email: string;
  location: Location;
  radius: number;
  birthDate: SchemaDate | undefined;
  gender: Gender | undefined;
  confirmation: string;
  password: string;
  confirmPassword: string;
  notificationEmailOffer: boolean | undefined;
  notificationEmailMessage: boolean | undefined;
  notificationInAppOffer: boolean | undefined;
  notificationInAppMessage: boolean | undefined;
  clientType: ClientType;
  language: UserLanguage;
  touched: Dictionary<{
    firstName: boolean;
    lastName: boolean;
    password: boolean;
    email: boolean;
    location: boolean;
    confirmation: boolean;
    birthDate: boolean;
  }>;
}

const redText = {
  width: '100%',
  marginTop: '0.25rem',
  fontSize: '80%',
  color: '#dc3545',
};

class Profile extends Component<MultiProps, Dictionary<ProfileState>> {
  state: Dictionary<ProfileState> = {
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    location: {
      name: '',
      longitude: 0,
      latitude: 0,
    },
    radius: 0,
    birthDate: { day: 0, month: 0, year: 0 },
    gender: Gender.Male,
    clientType: ClientType.Individual,
    password: '',
    confirmPassword: '',
    confirmation: CLASSNAME_INIT_CONFIRMATION,
    notificationEmailOffer: false,
    notificationEmailMessage: false,
    notificationInAppOffer: false,
    notificationInAppMessage: false,
    language: UserLanguage.French,
    isFirstRender: true,
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      location: false,
      password: false,
      confirmation: false,
      birthDate: false,
    },
  };

  getDefaultDate = (birthDate: SchemaDate) => {
    const curr = new Date();
    curr.setFullYear(birthDate.year, birthDate.month - 1, birthDate.day);
    return curr.toISOString().substr(0, 10);
  };

  handleChangeDate = (e: FormEvent<any>) => {
    const day = parseInt(e.currentTarget.value.substr(8, 2), 10);
    const month = parseInt(e.currentTarget.value.substr(5, 2), 10);
    const year = parseInt(e.currentTarget.value.substr(0, 4), 10);
    const curr = new Date();
    curr.setFullYear(day, month, year);
    this.setState({ birthDate: { day, month, year } });
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.checked });
  };

  handleLanguage(data: any) {
    let locale = 'fr';
    if (data.updateUser.language === 'ENGLISH') {
      locale = 'en';
    }
    this.props.changeLocale(locale);
  }

  handleChangeRadius = (e: FormEvent<any>) => {
    const re = /^[0-9\b]+$/;
    if (e.currentTarget.value === '') {
      this.setState({ radius: 0 });
    }

    if (re.test(e.currentTarget.value)) {
      this.setState({ radius: parseInt(e.currentTarget.value, 10) });
    }
  };

  handleChangeGeoLoc = (suggest: Suggest | undefined) => {
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

  handleConfirmationPassword = (e: FormEvent<any>) => {
    if (e.currentTarget.name === 'password') {
      this.handleChange(e);
      this.setState({ confirmation: 'wrongPW' });
    } else if (e.currentTarget.name === 'confirmPassword') {
      this.handleChange(e);
      if (e.currentTarget.value !== this.state.password) {
        this.setState({ confirmation: 'wrongPW' });
      } else {
        this.setState({
          confirmation: CLASSNAME_INIT_CONFIRMATION,
        });
      }
    }
  };

  validatePassword = () => {
    return (
      this.state.confirmation === CLASSNAME_INIT_CONFIRMATION &&
      this.state.password === this.state.confirmPassword
    );
  };

  fillObjectToUpdate = (me: User) => {
    const {
      password,
      // we dont want in rest
      touched,
      isFirstRender,
      confirmation,
      confirmPassword,
      // the rest
      ...rest
    } = this.state;
    const data: Dictionary<UserUpdateInput> = { ...rest, id: me ? me.id : '' };
    if (this.validatePassword()) {
      data.password = password;
    }
    return { data };
  };

  handleUpdateUser = async (
    e: FormEvent<HTMLFormElement>,
    update: () => void,
  ) => {
    e.preventDefault();
    await update();
    this.setState({ confirmPassword: '', password: '' });
  };

  fillState = (data: any) => {
    // Cette condition empêche de rentrer dans une boucle infinie
    if (this.state.isFirstRender) {
      const { __typename, ...rest } = data.me;
      this.setState({
        isFirstRender: false,
        ...rest,
      });
    }
  };

  fieldTouched = (key: string) => {
    const touched = { ...this.state.touched };
    touched[key] = true;
    this.setState({ touched });
  };

  render() {
    const {
      translations: { profile, general },
    } = this.props;

    const touched = { ...this.state.touched };

    const profileFormValidation = new ProfileFormValidation(general);
    return (
      <>
        <Query
          query={GET_USER_INFO_QUERY}
          onCompleted={data => this.fillState(data)}
        >
          {({ data, loading, error }) => {
            if (loading || !data.me) return <Loading />;
            if (error) return <ErrorMessage error={error} />;
            return (
              <Mutation
                mutation={UPDATE_USER_MUTATION}
                variables={this.fillObjectToUpdate(data.me)}
                refetchQueries={[{ query: GET_USER_INFO_QUERY }]}
                onCompleted={data => this.handleLanguage(data)}
              >
                {(handleMutation, { loading, error }) => {
                  if (loading) return <Loading />;
                  if (error) return <ErrorMessage error={error} />;
                  return (
                    <Style
                      method="put"
                      onSubmit={e => this.handleUpdateUser(e, handleMutation)}
                    >
                      <h1>{profile.profilePage}</h1>
                      <fieldset disabled={loading} aria-busy={loading}>
                        <div className="firstInfoSection">
                          <div className="nameSection">
                            <h5>{profile.contactInfo}</h5>
                            <div
                              hidden={data.me.clientType === ClientType.Company}
                            >
                              <Form.Group>
                                <Form.Label>{profile.firstName}</Form.Label>
                                <InputGroup>
                                  <Form.Control
                                    className="inputNeedSpace"
                                    placeholder={profile.firstName}
                                    aria-describedby="inputGroupPrepend"
                                    type="text"
                                    name="firstName"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.firstName}
                                    onBlur={() =>
                                      this.fieldTouched('firstName')
                                    }
                                    isInvalid={
                                      touched.firstName &&
                                      !profileFormValidation.isFirstNameValid(
                                        this.state.firstName,
                                      )
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {profileFormValidation.firstNameError(
                                      this.state.firstName,
                                    )}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>{profile.lastName}</Form.Label>
                                <InputGroup>
                                  <Form.Control
                                    className="inputNeedSpace"
                                    placeholder={profile.lastName}
                                    aria-describedby="inputGroupPrepend"
                                    type="text"
                                    name="lastName"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.lastName}
                                    onBlur={() => this.fieldTouched('lastName')}
                                    isInvalid={
                                      touched.lastName &&
                                      !profileFormValidation.isLastNameValid(
                                        this.state.lastName,
                                      )
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {profileFormValidation.lastNameError(
                                      this.state.lastName,
                                    )}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                            <div
                              hidden={
                                data.me.clientType === ClientType.Individual
                              }
                            >
                              <p>{profile.companyName}:</p>
                              <Form.Control
                                className="inputNeedSpace"
                                type="text"
                                name="companyName"
                                defaultValue={data.me.companyName}
                                placeholder={profile.companyName}
                                onChange={this.handleChange}
                              />
                            </div>
                            <Form.Group>
                              <Form.Label>{general.email}</Form.Label>
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text id="inputGroupPrepend">
                                    @
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  disabled={true}
                                  className="inputNeedSpace"
                                  placeholder={general.email}
                                  aria-describedby="inputGroupPrepend"
                                  type="email"
                                  name="email"
                                  defaultValue={this.state.email}
                                  onChange={this.handleChange}
                                  onBlur={() => this.fieldTouched('email')}
                                  isInvalid={
                                    touched.email &&
                                    !profileFormValidation.isEmailValid(
                                      this.state.email,
                                    )
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {profileFormValidation.emailError()}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="secondInfoSection">
                          <div className="nameSection">
                            <hr />
                            <h5>{profile.genrealInfo}</h5>
                            <div>
                              <p>{profile.location}: </p>
                              <Geosuggest
                                initialValue={data.me.location.name}
                                onBlur={() => this.fieldTouched('location')}
                                onSuggestSelect={(suggest: Suggest) =>
                                  this.handleChangeGeoLoc(suggest)
                                }
                                onChange={() =>
                                  this.handleChangeGeoLoc(undefined)
                                }
                                placeholder={profile.address}
                              />
                              <div
                                style={redText}
                                hidden={
                                  !(
                                    touched.location &&
                                    !profileFormValidation.isLocationValid(
                                      this.state.location,
                                    )
                                  )
                                }
                              >
                                <p>{profileFormValidation.locationError()}</p>
                              </div>
                              <p>{general.radius}: </p>
                              <Form.Control
                                className="inputNeedSpace"
                                type="radius"
                                name="radius"
                                placeholder={general.radius}
                                defaultValue={data.me.radius.toString()}
                                onChange={this.handleChangeRadius}
                              />
                            </div>
                            <div
                              hidden={data.me.clientType === ClientType.Company}
                            >
                              <p>{profile.birth}: </p>
                              <Form.Control
                                type="date"
                                name="birthDate"
                                className="inputNeedSpace"
                                isInvalid={
                                  this.state.touched.birthDate &&
                                  !profileFormValidation.isBirthDateValid(
                                    this.state.birthDate,
                                  )
                                }
                                onBlur={() => this.fieldTouched('birthDate')}
                                defaultValue={this.getDefaultDate(
                                  data.me.birthDate,
                                )}
                                onChange={this.handleChangeDate}
                              />
                              <Form.Control.Feedback type="invalid">
                                {profileFormValidation.birthDateError()}
                              </Form.Control.Feedback>
                            </div>
                            <div
                              hidden={data.me.clientType === ClientType.Company}
                            >
                              <p>{profile.sex}: </p>
                              {Object.values(Gender).map(
                                (gender: Gender, i: number) => {
                                  const temp = [
                                    profile.male,
                                    profile.female,
                                    profile.other,
                                  ];
                                  return (
                                    <div key={gender}>
                                      <Form.Control
                                        type="radio"
                                        name="gender"
                                        className="radioSelector"
                                        key={gender}
                                        value={gender}
                                        checked={
                                          this.state.gender === gender ||
                                          data.me.gender === gender
                                        }
                                        onChange={this.handleChange}
                                      />
                                      <p className="radioNeedSpace" key={i}>
                                        {temp[i]}{' '}
                                      </p>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                            <div>
                              <p>{general.langage}: </p>
                              {Object.values(UserLanguage).map(
                                (language: UserLanguage, i: number) => {
                                  const temp = [
                                    general.langages.french,
                                    general.langages.english,
                                  ];
                                  return (
                                    <div key={language}>
                                      <p className="radioNeedSpace" key={i}>
                                        {temp[i]}{' '}
                                      </p>
                                      <Form.Control
                                        name={'language'}
                                        value={language}
                                        type="radio"
                                        className="radioSelector"
                                        onChange={this.handleChange}
                                        checked={
                                          this.state.language === language ||
                                          data.me.language === language
                                        }
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                            <div>
                              <hr />
                              <h5>{profile.notificattionSettings}</h5>
                              <p>{profile.inApp}: </p>
                              <br />
                              <p>{profile.notificationMessage}: </p>
                              <Toggle
                                checked={this.state.notificationInAppMessage}
                                name="notificationInAppMessage"
                                onChange={this.handleChangeToggle}
                              />
                              <p>{profile.notificationOffer}: </p>
                              <Toggle
                                checked={this.state.notificationInAppOffer}
                                name="notificationInAppOffer"
                                onChange={this.handleChangeToggle}
                              />
                              <br />
                              <p>{profile.email}: </p>
                              <br />
                              <p>{profile.notificationMessage}: </p>
                              <Toggle
                                checked={this.state.notificationEmailMessage}
                                name="notificationEmailMessage"
                                onChange={this.handleChangeToggle}
                              />
                              <p>{profile.notificationOffer}: </p>
                              <Toggle
                                checked={this.state.notificationEmailOffer}
                                name="notificationEmailOffer"
                                onChange={this.handleChangeToggle}
                              />
                            </div>
                            <div>
                              <hr />
                              <h5>{profile.newPWSection}</h5>
                              <Form.Group>
                                <Form.Label>
                                  {profile.changePassword}
                                </Form.Label>
                                <InputGroup>
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">
                                      <MdLockOutline />
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control
                                    className="inputNeedSpace"
                                    aria-describedby="inputGroupPrepend"
                                    type="password"
                                    name="password"
                                    placeholder={profile.changePassword}
                                    value={this.state.password}
                                    onChange={this.handleConfirmationPassword}
                                    onBlur={() => this.fieldTouched('password')}
                                  />
                                </InputGroup>
                              </Form.Group>
                              <br />
                              <Form.Group>
                                <Form.Label>
                                  {profile.confirmationChangePassword}
                                </Form.Label>
                                <InputGroup>
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">
                                      <MdLockOutline />
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control
                                    className={this.state.confirmation}
                                    aria-describedby="inputGroupPrepend"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder={
                                      profile.confirmationChangePassword
                                    }
                                    value={this.state.confirmPassword}
                                    onChange={this.handleConfirmationPassword}
                                    onBlur={() =>
                                      this.fieldTouched('confirmation')
                                    }
                                    isInvalid={
                                      touched.confirmation &&
                                      !profileFormValidation.isConfirmPasswordValid(
                                        this.state.confirmPassword,
                                        this.state.password,
                                      )
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {profileFormValidation.confirmPasswordError(
                                      this.state.password,
                                      this.state.confirmPassword,
                                    )}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div className="buttonSection">
                          <Button
                            variant="primary"
                            disabled={
                              !profileFormValidation.isProfileFormStateValid(
                                this.state,
                              )
                            }
                            type="submit"
                          >
                            {profile.save}
                          </Button>
                        </div>
                      </fieldset>
                    </Style>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </>
    );
  }
}

export default multiUpdater(Profile);

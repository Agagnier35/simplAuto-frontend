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

interface ProfileState {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  location: Location;
  radius: number;
  birthDate: SchemaDate;
  gender: string;
  newPassword: string;
  confirmation: string;
  notificationEmailOffer: boolean | null;
  notificationEmailMessage: boolean | null;
  notificationInAppOffer: boolean | null;
  notificationInAppMessage: boolean | null;
  language: string;
  touched: Dictionary<{
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    location: boolean;
    newPassword: boolean;
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
    gender: '',
    newPassword: '',
    confirmation: CLASSNAME_INIT_CONFIRMATION,
    notificationEmailOffer: null,
    notificationEmailMessage: null,
    notificationInAppOffer: null,
    notificationInAppMessage: null,
    language: '',
    isFirstRender: true,
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      location: false,
      newPassword: false,
      confirmation: false,
      birthDate: false,
    },
  };

  datePickerInput = (
    birthDate: SchemaDate,
    profileFormValidation: ProfileFormValidation,
  ) => {
    const curr = new Date();
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
            !profileFormValidation.isBirthDateValid(date)
          }
          onBlur={() => this.fieldTouched('birthDate')}
          defaultValue={date}
          onChange={this.handleChangeDate}
        />
        <Form.Control.Feedback type="invalid">
          {profileFormValidation.birthDateError()}
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
    } as Dictionary<ProfileState>);
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      this.state[e.currentTarget.name] ||
      this.state[e.currentTarget.name] === null
    ) {
      this.setState({ [e.currentTarget.name]: false });
    } else {
      this.setState({ [e.currentTarget.name]: true });
    }
  };

  getToggleValue = (name: string, data: any) => {
    return this.state[name] === null ? data.me[name] : this.state[name];
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

  handleChangeGeoLoc = (suggest: Suggest) => {
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
    } else {
      if (e.currentTarget.value !== this.state.password) {
        this.setState({ [e.currentTarget.name]: 'wrongPW' });
      } else {
        this.setState({
          [e.currentTarget.name]: CLASSNAME_INIT_CONFIRMATION,
        });
      }
    }
  };

  validatePasswordState = (item: string) => {
    return item === 'confirmation' || (item === 'password' && this.state[item]);
  };

  validatePassword = () => {
    return (
      this.state.confirmation === CLASSNAME_INIT_CONFIRMATION &&
      this.state.password
    );
  };

  validateBirthDate = (item: string) => {
    return (
      item === 'birthDate' &&
      this.state.birthDate.day !== 0 &&
      this.state.birthDate.month !== 0 &&
      this.state.birthDate.year !== 0
    );
  };

  validateNotifications = (item: string) => {
    return (
      item === 'notificationEmailOffer' ||
      item === 'notificationEmailMessage' ||
      item === 'notificationInAppOffer' ||
      item === 'notificationInAppMessage'
    );
  };

  validateLocation = (item: string) => {
    return (
      item === 'location' &&
      this.state.location.name !== '' &&
      this.state.location.longitude !== 0 &&
      this.state.location.latitude !== 0
    );
  };

  fillObjectToUpdate = (me: User) => {
    const tempMe: Dictionary<User> = me;
    const data: Dictionary<UserUpdateInput> = { id: me.id };

    Object.keys(this.state).map(item => {
      if (this.validatePasswordState(item)) {
        if (this.validatePassword()) {
          data.password = this.state.password;
        }
      } else if (this.validateBirthDate(item)) {
        const day = this.state[item].day;
        const month = this.state[item].month;
        const year = this.state[item].year;
        data.birthDate = {
          day,
          month,
          year,
        };
      } else if (this.validateLocation(item)) {
        const name = this.state[item].name;
        const longitude = this.state[item].longitude;
        const latitude = this.state[item].latitude;
        data.location = {
          name,
          longitude,
          latitude,
        };
      } else if (
        item !== 'birthDate' &&
        item !== 'location' &&
        this.state[item]
      ) {
        data[item] = this.state[item];
      } else if (this.validateNotifications(item) && this.state[item] != null) {
        data[item] = this.state[item];
      }
    });
    return { data };
  };

  handleUpdateUser = async (
    e: FormEvent<HTMLFormElement>,
    update: () => void,
  ) => {
    e.preventDefault();
    await update();
    this.setState({
      id: '',
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
      gender: '',
      password: '',
      confirmation: CLASSNAME_INIT_CONFIRMATION,
      notificationEmailOffer: null,
      notificationEmailMessage: null,
      notificationInAppOffer: null,
      notificationInAppMessage: null,
      language: '',
    } as any);
  };

  fillState = (data: any) => {
    // Cette condition empêche de rentrer dans une boucle infinie
    if (this.state.isFirstRender) {
      this.setState({
        id: data.me.id,
        email: data.me.email,
        firstName: data.me.firstName,
        lastName: data.me.lastName,
        location: data.me.location,
        birthDate: data.me.birthDate,
        gender: data.me.gender,
        isFirstRender: false,
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
            if (loading) return <Loading />;
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
                                    required
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
                                    required
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
                                placeholder={profile.address}
                              />
                              {/* Custom code for error in the location.*/}
                              {/*Bug si on efface la location, ça plante.*/}
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
                                {profileFormValidation.locationError()}
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
                              {this.datePickerInput(
                                data.me.birthDate,
                                profileFormValidation,
                              )}
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
                                  return [
                                    <Form.Control
                                      type="radio"
                                      name="gender"
                                      className="radioSelector"
                                      key={gender}
                                      value={gender}
                                      checked={
                                        this.state.gender === gender ||
                                        (data.me.gender === gender &&
                                          this.state.gender === '')
                                      }
                                      onChange={this.handleChange}
                                    />,
                                    <p className="radioNeedSpace" key={i}>
                                      {temp[i]}{' '}
                                    </p>,
                                  ];
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
                                  return [
                                    <p className="radioNeedSpace" key={i}>
                                      {temp[i]}{' '}
                                    </p>,
                                    <Form.Control
                                      name={'language'}
                                      value={language}
                                      type="radio"
                                      className="radioSelector"
                                      onChange={this.handleChange}
                                      checked={
                                        this.state.language === language ||
                                        (data.me.language === language &&
                                          this.state.language === '')
                                      }
                                    />,
                                  ];
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
                                checked={this.getToggleValue(
                                  'notificationInAppMessage',
                                  data,
                                )}
                                defaultValue={this.getToggleValue(
                                  'notificationInAppMessage',
                                  data,
                                )}
                                name="notificationInAppMessage"
                                onChange={this.handleChangeToggle}
                              />
                              <p>{profile.notificationOffer}: </p>
                              <Toggle
                                checked={this.getToggleValue(
                                  'notificationInAppOffer',
                                  data,
                                )}
                                defaultValue={this.getToggleValue(
                                  'notificationInAppOffer',
                                  data,
                                )}
                                name="notificationInAppOffer"
                                onChange={this.handleChangeToggle}
                              />
                              <br />
                              <p>{profile.email}: </p>
                              <br />
                              <p>{profile.notificationMessage}: </p>
                              <Toggle
                                checked={this.getToggleValue(
                                  'notificationEmailMessage',
                                  data,
                                )}
                                defaultValue={this.getToggleValue(
                                  'notificationEmailMessage',
                                  data,
                                )}
                                name="notificationEmailMessage"
                                onChange={this.handleChangeToggle}
                              />
                              <p>{profile.notificationOffer}: </p>
                              <Toggle
                                checked={this.getToggleValue(
                                  'notificationEmailOffer',
                                  data,
                                )}
                                defaultValue={this.getToggleValue(
                                  'notificationEmailOffer',
                                  data,
                                )}
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
                                    onBlur={() =>
                                      this.fieldTouched('newPassword')
                                    }
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
                                    name="confirmation"
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

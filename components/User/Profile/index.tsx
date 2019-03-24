import React, { FormEvent, Component } from 'react';
import Style from './style';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Geosuggest from 'react-geosuggest';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import {
  User,
  UserUpdateInput,
  Gender,
  Date as SchemaDate,
} from '../../../generated/graphql';
import { Dictionary } from '../../../lib/Types/Dictionary';
import { GET_USER_INFO_QUERY } from './Queries';

const CLASSNAME_INIT_CONFIRMATION: string = 'inputNeedSpace';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATEUSER_MUTATION($data: UserUpdateInput!) {
    updateUser(data: $data) {
      id
    }
  }
`;

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  birthDate: SchemaDate;
  gender: string;
  newPassword: string;
  confirmation: string;
}

class Profile extends Component<MultiProps, Dictionary<ProfileState>> {
  state: Dictionary<ProfileState> = {
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    birthDate: { day: 0, month: 0, year: 0 },
    gender: '',
    newPassword: '',
    confirmation: CLASSNAME_INIT_CONFIRMATION,
  };

  datePickerInput = (birthDate: SchemaDate) => {
    const curr = new Date();
    curr.setFullYear(birthDate.year, birthDate.month - 1, birthDate.day);
    const date = curr.toISOString().substr(0, 10);

    return (
      <Form.Control
        type="date"
        name="birthDate"
        className={CLASSNAME_INIT_CONFIRMATION}
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
    } as Dictionary<ProfileState>);
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleChangeGeoLoc = (e: string) => {
    this.setState({ location: e });
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

  fillObjectToUpdate = (me: User) => {
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
      } else if (item !== 'birthDate' && this.state[item]) {
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
      location: '',
      birthDate: { day: 0, month: 0, year: 0 },
      gender: '',
      password: '',
      confirmation: CLASSNAME_INIT_CONFIRMATION,
    } as any);
  };

  render() {
    const {
      translations: { profile, general },
    } = this.props;
    return (
      <>
        <Query query={GET_USER_INFO_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage error={error} />;
            return (
              <Mutation
                mutation={UPDATE_USER_MUTATION}
                variables={this.fillObjectToUpdate(data.me)}
                refetchQueries={[{ query: GET_USER_INFO_QUERY }]}
              >
                {(handleMutation, { loading, error }) => {
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
                            <div>
                              <p>{profile.firstName}:</p>
                              <Form.Control
                                className="inputNeedSpace"
                                type="text"
                                name="firstName"
                                defaultValue={data.me.firstName}
                                placeholder={profile.firstName}
                                onChange={this.handleChange}
                              />
                              <br />
                              <p>{profile.lastName}: </p>
                              <Form.Control
                                className="inputNeedSpace"
                                type="text"
                                name="lastName"
                                defaultValue={data.me.lastName}
                                placeholder={profile.lastName}
                                onChange={this.handleChange}
                              />
                            </div>
                            <p>{general.email}: </p>
                            <Form.Control
                              className="inputNeedSpace"
                              type="email"
                              name="email"
                              placeholder={general.email}
                              defaultValue={data.me.email}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="secondInfoSection">
                          <div className="nameSection">
                            <hr />
                            <h5>{profile.genrealInfo}</h5>
                            <div>
                              <p>{profile.location}: </p>
                              <Geosuggest
                                initialValue={data.me.location}
                                onChange={this.handleChangeGeoLoc}
                                onSuggestSelect={(suggest: any) =>
                                  this.handleChangeGeoLoc(suggest.label)
                                }
                                placeholder={profile.address}
                              />
                            </div>
                            <div>
                              <p>{profile.birth}: </p>
                              {this.datePickerInput(data.me.birthDate)}
                            </div>
                            <div>
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
                                        data.me.gender === gender
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
                              <hr />
                              <h5>{profile.newPWSection}</h5>
                              <p>{profile.changePassword}: </p>
                              <Form.Control
                                className="inputNeedSpace"
                                type="password"
                                name="password"
                                placeholder={profile.changePassword}
                                onChange={this.handleConfirmationPassword}
                              />
                              <br />
                              <p>{profile.confirmationChangePassword}: </p>
                              <Form.Control
                                className={this.state.confirmation}
                                type="password"
                                name="confirmation"
                                placeholder={profile.confirmationChangePassword}
                                onChange={this.handleConfirmationPassword}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="buttonSection">
                          <Button variant="primary" type="submit">
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

export default multi(Profile);

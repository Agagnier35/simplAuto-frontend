import React, { FormEvent, Component } from 'react';
import Style from './style';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import Geosuggest from 'react-geosuggest';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import { UserUpdateInput, Gender } from '../../generated/graphql';
import { Dictionnary } from '../../lib/Dictionnary';

const CLASSNAME_INIT_CONFIRMATION = 'inputNeedSpace';

const GET_USER_INFO_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
      email
      location
      birthDate {
        day
        month
        year
      }
      gender
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATEUSER_MUTATION($data: UserUpdateInput!) {
    updateUser(data: $data) {
      id
    }
  }
`;

class ProfilePage extends Component<MultiProps, Dictionnary<UserUpdateInput>> {
  state: Dictionnary<UserUpdateInput> = {
    id: '',
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    location: undefined,
    birthDate: { day: 0, month: 0, year: 0 },
    gender: undefined,
    password: undefined,
    confirmation: { CLASSNAME_INIT_CONFIRMATION },
  };

  datePickerInput = (data: any) => {
    const curr = new Date();
    curr.setFullYear(
      parseInt(data.me.birthDate.year, 10),
      parseInt(data.me.birthDate.month, 10) - 1,
      parseInt(data.me.birthDate.day, 10),
    );
    let date = curr.toISOString().substr(0, 10);

    return (
      <input
        type="date"
        name="birthDate"
        className={CLASSNAME_INIT_CONFIRMATION}
        defaultValue={date}
        onChange={this.handleChangeDate}
      />
    );
  };

  handleChangeDate = async (e: FormEvent<HTMLInputElement>) => {
    const day = parseInt(e.currentTarget.value.substr(8, 2), 10);
    const month = parseInt(e.currentTarget.value.substr(5, 2), 10);
    const year = parseInt(e.currentTarget.value.substr(0, 4), 10);
    const curr = new Date();
    curr.setFullYear(day, month, year);
    await this.setState({
      birthDate: { day: day, month: month, year: year },
    } as any);
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  handleChangeGeoLoc = (e: string) => {
    this.setState({ location: e } as any);
  };

  handleConfirmationPassword = (e: FormEvent<any>) => {
    if (e.currentTarget.name === 'newPassword') {
      this.handleChange(e);
      this.setState({ confirmation: 'wrongPW' });
    } else {
      // if e.currentTarget.name === 'confirmation'
      if (e.currentTarget.value != this.state.password) {
        this.setState({ [e.currentTarget.name]: 'wrongPW' });
      } else {
        this.setState({
          [e.currentTarget.name]: { CLASSNAME_INIT_CONFIRMATION },
        });
      }
    }
  };

  notNullOrUndefined = (value: any) => {
    return value !== null && value !== undefined;
  };

  validatePasswordState = (item: string) => {
    // magic numbers: variable name in state
    return (
      item === 'confirmation' ||
      (item === 'password' && this.state[item] !== undefined)
    );
  };

  validatePassword = () => {
    return (
      this.state.confirmation == { CLASSNAME_INIT_CONFIRMATION } &&
      this.state.password !== undefined
    );
  };

  validateBirthDate = (item: string) => {
    // magic numbers: variable name in state
    return (
      item === 'birthDate' &&
      this.state[item].day !== 0 &&
      this.state[item].month !== 0 &&
      this.state[item].year !== 0
    );
  };

  fillObjectToUpdate = (dataQuery: any) => {
    const data: Dictionnary<UserUpdateInput> = {
      id: dataQuery.me.id,
    };

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
      }
      // magic numbers: variable name in state
      else if (item !== 'birthDate' && this.state[item] !== undefined) {
        data[item] = this.state[item];
      }
    });
    data.id = dataQuery.me.id;
    console.log(data);
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
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      location: undefined,
      birthDate: { day: 0, month: 0, year: 0 },
      gender: undefined,
      password: undefined,
      confirmation: 'inputNeedSpace',
    });
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
                variables={this.fillObjectToUpdate(data)}
                refetchQueries={[{ query: GET_USER_INFO_QUERY }]}
              >
                {(handleMutation, { loading, error, called }) => {
                  if (error) return <ErrorMessage error={error} />;
                  //if (called) return 'saved';
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

                        <div>
                          <div className="secondInfoSection">
                            <hr />
                            <h5>{profile.genrealInfo}</h5>
                            <div>
                              <p>{profile.location}: </p>
                              <Geosuggest
                                initialValue={data.me.location}
                                onChange={this.handleChangeGeoLoc}
                                onSuggestSelect={suggest =>
                                  this.handleChangeGeoLoc(suggest.label)
                                }
                                placeholder={profile.address}
                              />
                            </div>
                            <div>
                              <p>{profile.birth}: </p>
                              {this.datePickerInput(data)}
                            </div>
                            <div>
                              <p>{profile.sex}: </p>
                              {Object.keys(Gender).map((key, i) => {
                                const temp = [
                                  profile.male,
                                  profile.female,
                                  profile.other,
                                ];
                                console.log(data.me.gender);
                                console.log(key);
                                return [
                                  <Form.Control
                                    type="radio"
                                    name="gender"
                                    className="radioSelector"
                                    key={key}
                                    value={key}
                                    checked={
                                      this.state.gender === key ||
                                      (this.state.gender === undefined &&
                                        data.me.gender === key)
                                    }
                                    onChange={this.handleChange}
                                  />,
                                  <p className="radioNeedSpace" key={i}>
                                    {temp[i]}{' '}
                                  </p>,
                                ];
                              })}
                            </div>

                            <div>
                              <hr />
                              <h5>{profile.newPWSection}</h5>
                              <p>{profile.changePassword}: </p>
                              <Form.Control
                                className="inputNeedSpace"
                                type="password"
                                name="newPassword"
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

export default multi(ProfilePage);

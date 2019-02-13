import React, { FormEvent, Component, ChangeEvent } from 'react';
import Style from './profilePageStyle';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import Geosuggest from 'react-geosuggest';
import { Button } from 'react-bootstrap';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import { timesSeries } from 'async';
import { UserUpdateInput } from '../../generated/graphql';
import { IterableKey } from '../../lib/IterableKey';

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

interface ProfilePageState {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  birthDate: string;
  gender: string;
  newPassword: string;
  confirmation: string;
}

class ProfilePage extends Component<MultiProps, IterableKey<ProfilePageState>> {
  state: IterableKey<ProfilePageState> = {
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    birthDate: '',
    gender: '',
    newPassword: '',
    confirmation: 'inputNeedSpace',
  };

  //get the registered value of the user's birth date
  datePickerInput = (data: any) => {
    let curr = new Date();
    curr.setFullYear(
      parseInt(data.me.birthDate.year),
      parseInt(data.me.birthDate.month) - 1,
      parseInt(data.me.birthDate.day),
    );
    let date = curr.toISOString().substr(0, 10);

    return (
      <input
        type="date"
        name="birthDate"
        className="inputNeedSpace"
        defaultValue={date}
        onChange={this.handleChange}
      />
    );
  };

  //handle the change on most fields
  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  //handle the changing value of location
  handleChangeGeoLoc = (e: string) => {
    this.setState({ location: e } as any);
  };

  //handle the user new password
  handleConfirmationPW = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'newPassword') {
      this.handleChange(e);
      this.setState({ confirmation: 'wrongPW' } as any);
    } else {
      // if e.currentTarget.name === 'confirmation'
      if (e.currentTarget.value != this.state.newPassword) {
        this.setState({ [e.currentTarget.name]: 'wrongPW' } as any);
      } else {
        this.setState({ [e.currentTarget.name]: 'inputNeedSpace' } as any);
      }
    }
  };

  fillObjectToUpdate = (dataQuery: any) => {
    const data: IterableKey<UserUpdateInput> = {
      id: dataQuery.me.id,
    }; // TODO Shouldnt be any

    //set every changed key  from state
    Object.keys(this.state).map(item => {
      //special case if the user wants to change his PW
      if (
        item === 'confirmation' ||
        (item === 'newPassword' && this.state[item] !== '')
      ) {
        if (
          this.state.confirmation == 'inputNeedSpace' &&
          this.state.newPassword !== ''
        ) {
          data.password = this.state.newPassword;
        }
      }
      //special case if the user change his birth date
      else if (item === 'birthDate' && this.state[item] !== '') {
        const day = parseInt(this.state[item].substr(8, 2));
        const month = parseInt(this.state[item].substr(5, 2));
        const year = parseInt(this.state[item].substr(0, 4));
        data.birthDate = {
          day,
          month,
          year,
        };
      }
      //every key left
      else if (this.state[item] !== '') {
        data[item] = this.state[item];
      }
    });
    return { data };
  };

  // handle the call to the server responsible to update user info
  handleUpdateUser = async (
    e: FormEvent<HTMLFormElement>,
    update: () => void,
  ) => {
    e.preventDefault();
    await update();
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      birthDate: '',
      gender: '',
      newPassword: '',
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
                  return (
                    <Style
                      method="put"
                      onSubmit={e => this.handleUpdateUser(e, handleMutation)}
                    >
                      <h1>{profile.profilePage}</h1>
                      <fieldset disabled={loading} aria-busy={loading}>
                        {/*Section of first, last name and email*/}
                        <div className="firstInfoSection">
                          <div className="nameSection">
                            <h5>{profile.contactInfo}</h5>
                            <div>
                              {/*full name*/}
                              <p>{profile.firstName}:</p>
                              <input
                                className="inputNeedSpace"
                                type="text"
                                name="firstName"
                                defaultValue={data.me.firstName}
                                placeholder={profile.firstName}
                                onChange={this.handleChange}
                              />
                              <br />
                              <p>{profile.lastName}: </p>
                              <input
                                className="inputNeedSpace"
                                type="text"
                                name="lastName"
                                defaultValue={data.me.lastName}
                                placeholder={profile.lastName}
                                onChange={this.handleChange}
                              />
                            </div>
                            {/*email*/}
                            <p>{general.email}: </p>
                            <input
                              className="inputNeedSpace"
                              type="email"
                              name="email"
                              placeholder={general.email}
                              defaultValue={data.me.email}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>

                        {/*Section of every info */}
                        <div>
                          <div className="secondInfoSection">
                            <hr />
                            <h5>{profile.genrealInfo}</h5>
                            {/*location*/}
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
                            {/*birth date*/}
                            <div>
                              <p>{profile.birth}: </p>
                              {this.datePickerInput(data)}
                            </div>
                            {/*sex*/}
                            <div>
                              <p>{profile.sex}: </p>
                              <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={
                                  this.state.gender === 'MALE' ||
                                  (this.state.gender === '' &&
                                    data.me.gender === 'MALE')
                                }
                                onChange={this.handleChange}
                              />
                              <p className="radioNeedSpace">{profile.male} </p>
                              <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={
                                  this.state.gender === 'FEMALE' ||
                                  (this.state.gender === '' &&
                                    data.me.gender === 'FEMALE')
                                }
                                onChange={this.handleChange}
                              />
                              <p className="radioNeedSpace">
                                {profile.female}{' '}
                              </p>
                              <input
                                type="radio"
                                name="gender"
                                value="OTHER"
                                checked={
                                  this.state.gender === 'OTHER' ||
                                  (this.state.gender === '' &&
                                    data.me.gender === 'OTHER')
                                }
                                onChange={this.handleChange}
                              />
                              <p className="radioNeedSpace">{profile.other} </p>
                            </div>

                            {/*New password section */}
                            <div>
                              <hr />
                              <h5>{profile.newPWSection}</h5>
                              <p>{profile.changePassword}: </p>
                              <input
                                className="inputNeedSpace"
                                type="password"
                                name="newPassword"
                                placeholder={profile.changePassword}
                                onChange={this.handleConfirmationPW}
                              />
                              <br />
                              <p>{profile.confirmationChangePassword}: </p>
                              <input
                                className={this.state.confirmation}
                                type="password"
                                name="confirmation"
                                placeholder={profile.confirmationChangePassword}
                                onChange={this.handleConfirmationPW}
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

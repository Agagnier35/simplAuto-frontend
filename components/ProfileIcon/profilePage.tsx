import React, { FormEvent, Component, ChangeEvent } from 'react';
import Style from './profilePageStyle';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import Geosuggest from 'react-geosuggest';
import { Button } from 'react-bootstrap';
import Head from 'next/head';

const MAX_DAY = 31;
const MAX_MONTh = 12;
const MAX_YEAR = new Date().getFullYear();
const MAX_YEAR_GAP = 110;

//const GOOGLEMAPAPIACCESS =
//  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5qmk1ucd5sr6Jm-3SWVup3ZIhfjxtnU&libraries=places';

const myQuery = gql`
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

const UPDATEUSER_MUTATION = gql`
  mutation UPDATEUSER_MUTATION($data: UserUpdateInput!) {
    updateUser(data: $data) {
      id
    }
  }
`;

interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  day: string;
  month: string;
  year: string;
  gender: string;
}

class ProfilePage extends Component<MultiProps> {
  state: ProfileInfo = {
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    day: '',
    month: '',
    year: '',
    gender: '',
  };

  handlePasswordChange = () => {};

  getTimeCount = (maxValue: any) => {
    let items = [];
    for (let i = 1; i <= maxValue; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return items;
  };

  getYearCount = () => {
    let year = new Date().getFullYear();
    let items = [];
    for (let i = year; i >= MAX_YEAR - MAX_YEAR_GAP; i--) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return items;
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  geoLocChange = (e: string) => {
    this.state.location = e;
  };

  optionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  fillObjectToUpdate = (dataQ: any) => {
    const data: any = {}; // TODO Shouldnt be any

    //set client's id
    data.id = dataQ.me.id;

    //set client's first name
    if (this.state.firstName !== '') {
      data.firstName = this.state.firstName;
    }

    //set client's last name
    if (this.state.lastName !== '') {
      data.lastName = this.state.lastName;
    }

    //set client's birth date
    if (this.state.day !== '') {
      dataQ.me.birthDate.day = this.state.day;
      const day = parseInt(dataQ.me.birthDate.day);
      const month = parseInt(dataQ.me.birthDate.month);
      const year = parseInt(dataQ.me.birthDate.year);
      data.birthDate = {
        day,
        month,
        year,
      };
    }
    if (this.state.month !== '') {
      dataQ.me.birthDate.month = this.state.month;
      const day = parseInt(dataQ.me.birthDate.day);
      const month = parseInt(dataQ.me.birthDate.month);
      const year = parseInt(dataQ.me.birthDate.year);
      data.birthDate = {
        day,
        month,
        year,
      };
    }
    if (this.state.year !== '') {
      dataQ.me.birthDate.year = this.state.year;
      const day = parseInt(dataQ.me.birthDate.day);
      const month = parseInt(dataQ.me.birthDate.month);
      const year = parseInt(dataQ.me.birthDate.year);
      data.birthDate = {
        day,
        month,
        year,
      };
    }

    //set client's gender
    if (this.state.gender !== '') {
      data.gender = this.state.gender;
    }

    //set client's location
    if (this.state.location !== '') {
      data.location = this.state.location;
    }

    return { data };
  };

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
      day: '',
      month: '',
      year: '',
      gender: '',
    });
  };

  render() {
    const {
      translations: { profile, general },
    } = this.props;
    return (
      <>
        <Head>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5qmk1ucd5sr6Jm-3SWVup3ZIhfjxtnU&libraries=places" />
        </Head>
        <Query query={myQuery}>
          {({ data, loading }) => {
            if (loading) return 'loading...';
            return (
              <Mutation
                mutation={UPDATEUSER_MUTATION}
                variables={this.fillObjectToUpdate(data)}
                refetchQueries={[{ query: myQuery }]}
              >
                {(handleMutation, { loading }) => (
                  <Style
                    method="put"
                    onSubmit={e => this.handleUpdateUser(e, handleMutation)}
                  >
                    <h1>{profile.profilePage}</h1>
                    <img
                      className="profileButton"
                      src="../static/profileImage.png"
                    />
                    <fieldset disabled={loading} aria-busy={loading}>
                      {/*Section of first, last name and email*/}
                      <div className="firstInfoSection">
                        <div className="nameSection">
                          <div>
                            {/*full name*/}
                            <p>{profile.firstName}: </p>
                            <input
                              className="inputNeedSpace"
                              type="text"
                              name="firstName"
                              defaultValue={data.me.firstName}
                              placeholder={profile.firstName}
                              onChange={this.handleChange}
                            />
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
                        {/*location*/}
                        <div>
                          <p>{profile.location}: </p>
                          <Geosuggest
                            initialValue={data.me.location}
                            onChange={this.geoLocChange}
                            placeholder={profile.address}
                          />
                        </div>
                        {/*birth date*/}
                        <div>
                          <p>{profile.birth}: </p>
                          <select
                            defaultValue={data.me.birthDate.day}
                            name="day"
                            onChange={this.optionChanged}
                          >
                            {this.getTimeCount(MAX_DAY)}
                          </select>
                          <p> / </p>
                          <select
                            defaultValue={data.me.birthDate.month}
                            name="month"
                            onChange={this.optionChanged}
                          >
                            {this.getTimeCount(MAX_MONTh)}
                          </select>
                          <p> / </p>
                          <select
                            defaultValue={data.me.birthDate.year}
                            name="year"
                            onChange={this.optionChanged}
                          >
                            {this.getYearCount()}
                          </select>
                        </div>
                        {/*sex*/}
                        <div>
                          <p>{profile.sex}: </p>
                          <input
                            type="radio"
                            name="gender"
                            value="MALE"
                            checked={this.state.gender === 'MALE' || (this.state.gender === '' && data.me.gender === 'MALE')}
                            onChange={this.handleChange}
                          />
                          <p className="inputNeedSpace">{profile.male} </p>
                          <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            checked={this.state.gender === 'FEMALE' || (this.state.gender === '' && data.me.gender === 'FEMALE')}
                            onChange={this.handleChange}
                          />
                          <p className="inputNeedSpace">{profile.female} </p>
                          <input
                            type="radio"
                            name="gender"
                            value="OTHER"
                            checked={this.state.gender === 'OTHER' || (this.state.gender === '' && data.me.gender === 'OTHER')}
                            onChange={this.handleChange}
                          />
                          <p className="inputNeedSpace">{profile.other} </p>
                        </div>
                      </div>
                      <div className="buttonSection">
                        <Button variant="primary" type="submit">
                          {profile.save}
                        </Button>
                        <Button
                          variant="primary"
                          onClick={this.handlePasswordChange}
                        >
                          {profile.changePassword}
                        </Button>
                      </div>
                    </fieldset>
                  </Style>
                )}
              </Mutation>
            );
          }}
        </Query>
      </>
    );
  }
}

export default multi(ProfilePage);

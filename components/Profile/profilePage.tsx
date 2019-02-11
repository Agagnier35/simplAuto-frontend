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

interface ProfileInfo {
  [firstName: string]: string;
  lastName: string;
  email: string;
  location: string;
  birthDate: string;
  gender: string;
}

class ProfilePage extends Component<MultiProps> {
  state: ProfileInfo = {
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    birthDate: '',
    gender: '',
  };

  datePickerInput = (data: any) => {
    let curr = new Date();
    curr.setFullYear(parseInt(data.me.birthDate.year), parseInt(data.me.birthDate.month)-1, parseInt(data.me.birthDate.day));
    let date = curr.toISOString().substr(0,10);
    
    return <input type="date" name="birthDate" defaultValue={date} onChange={this.handleChange}/>;
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };
  
  handleChangeGeoLoc = (e: string) => {
    this.setState({ 'location': e } as any);
  };

  optionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  fillObjectToUpdate = (dataQuery: any) => {
    const data: any = {}; // TODO Shouldnt be any

    //set client's id
    data.id = dataQuery.me.id;

    Object.keys(this.state).map((item)=> {
      if(item === 'birthDate' && this.state[item] !== ''){
        const day = parseInt(this.state[item].substr(8,2));
        const month = parseInt(this.state[item].substr(5,2));
        const year = parseInt(this.state[item].substr(0,4));
        data.birthDate = {
          day,
          month,
          year,
        };
      }
      else if(item !== 'birthDate' && this.state[item] !== ''){
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
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      birthDate: '',
      gender: '',
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
                {(handleMutation, { loading, error } ) => {
                  if (error) return <ErrorMessage error={error} />;
                return(
                  <Style
                    method="put"
                    onSubmit={e => this.handleUpdateUser(e, handleMutation)}
                  >
                    <h1>{profile.profilePage}</h1>
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
                            onChange={this.handleChangeGeoLoc}
                            onSuggestSelect={ (suggest) => this.handleChangeGeoLoc(suggest.label) }
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
                        >
                          {profile.changePassword}
                        </Button>
                      </div>
                    </fieldset>
                  </Style>
                )}}
              </Mutation>
            );
          }}
        </Query>
      </>
    );
  }
}

export default multi(ProfilePage);

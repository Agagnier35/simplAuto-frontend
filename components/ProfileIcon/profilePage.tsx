import React, { FormEvent, Component, ChangeEvent } from 'react';
import Style from './profilePageStyle';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import Geosuggest from 'react-geosuggest';
import { Button } from 'react-bootstrap';

const MAX_DAY = 31;
const MAX_MONTh = 12;
const MAX_YEAR = new Date().getFullYear();
const MAX_YEAR_GAP = 110;

const myQuery = gql`
query {
    me {
        id
        firstName
        lastName
        email
        location
        birthDate{
          day
          month
          year
        }
        gender
        permissions
      }
  }
`;

const UPDATEUSER_MUTATION = gql`
  mutation UPDATEUSER_MUTATION($UserUpdateInput: UserUpdateInput!) {
    updateUser(data: $UserUpdateInput) {
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

class ProfilePage extends Component<MultiProps>{

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

    handlePasswordChange = () => {
        
    }

    getDayCount = () => {
        let items = [];         
        for (let i = 1; i <= MAX_DAY; i++) {      
            items.push(<option key={i} value={i} >{i}</option>);
        }
        return items;
    }  

    getMonthCount = () => {
        let items = [];         
        for (let i = 1; i <= MAX_MONTh; i++) {             
            items.push(<option key={i} value={i} >{i}</option>);
        }
        return items;
    }

    getYearCount = () => {
        let year = new Date().getFullYear();
        let items = [];         
        for (let i = year; i >= MAX_YEAR - MAX_YEAR_GAP; i--) {             
            items.push(<option key={i} value={i} >{i}</option>);
        }
        return items;
    }

    handleChange = (e: FormEvent<HTMLInputElement>) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
    };
    
    geoLocChange = (e: string) => {
        this.state.location = e;
    };

    optionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ loca: e.currentTarget.value } as any);
    };

    fillObjectToUpdate = (data:any) => {
        return {
            id: data.me.id,
            email: data.me.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            location: this.state.location,
            birthDate: { day: this.state.day, month: this.state.month, year: this.state.year },
            gender: data.me.gender,
            permissions: data.me.permissions,
        }
    }

    handleUpdateUser = async (e: FormEvent<HTMLFormElement>, update: () => void) => {
        
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
            gender: '', });
    };

  render() {
    const {
        translations: { profile, general },
      } = this.props;
    return (
        <Query query={myQuery}> 
            {({data}) => (
            <Mutation mutation={UPDATEUSER_MUTATION} variables={this.fillObjectToUpdate(data)}>
            {(handleMutation) => (
                <Style
                    method="post"
                    onSubmit={e => this.handleUpdateUser(e, handleMutation)}>
                    <h1>Mon profil</h1>
                    <img className="profileButton" src="../static/profileImage.png" />
                    <fieldset>

                        {/*Section of first, last name and email*/}
                        <div className="firstInfoSection">
                            
                            <div className="nameSection">
                                <div>
                                    {/*full name*/}
                                    <p>{profile.firstName}: </p><input className="inputNeedSpace" 
                                            type="text" name="firstName" defaultValue={data.me.firstName}
                                            placeholder={profile.firstName}
                                            onChange={this.handleChange}/>
                                    <p>{profile.lastName}: </p><input className="inputNeedSpace" 
                                            type="text" name="lastName" defaultValue={data.me.lastName}
                                            placeholder={profile.lastName}
                                            onChange={this.handleChange}/>
                                </div>
                                {/*email*/}
                                <p>{general.email}: </p><input className="inputNeedSpace" type="email"
                                    name="email"
                                    placeholder={general.email}
                                    defaultValue={data.me.email}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>

                        {/*Section of every info */}
                        <div>
                            {/*location*/}
                            <div>
                                <p>{profile.location}: </p>
                                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5qmk1ucd5sr6Jm-3SWVup3ZIhfjxtnU&libraries=places"></script>
                                <Geosuggest initialValue={data.me.location}
                                    onChange={this.geoLocChange}
                                    placeholder={profile.address}/>
                            </div>
                            {/*birth date*/}
                            <div>
                                <p>{profile.birth}: </p>
                                <select defaultValue={data.me.birthDate.day}
                                        name="day"
                                        onChange={this.optionChanged}>
                                    {this.getDayCount()}
                                </select>
                                <p> / </p>
                                <select defaultValue={data.me.birthDate.month}
                                        name="month"
                                        onChange={this.optionChanged}>
                                    {this.getMonthCount()}
                                </select>
                                <p> / </p>
                                <select defaultValue={data.me.birthDate.year}
                                        name="year"
                                        onChange={this.optionChanged}>
                                    {this.getYearCount()}
                                </select>
                            </div>
                            {/*sex*/}
                            <div>
                                <p>{profile.sex}: </p>
                                <input type="radio" name="gender" value="MALE" checked={data.me.gender === 'MALE'} onChange={this.handleChange}/> 
                                <p className="inputNeedSpace">{profile.male} </p>
                                <input type="radio" name="gender" value="FEMALE" checked={data.me.gender === 'FEMALE'} onChange={this.handleChange}/> 
                                <p className="inputNeedSpace">{profile.female} </p>
                                <input type="radio" name="gender" value="OTHER" checked={data.me.gender === 'OTHER'} onChange={this.handleChange}/> 
                                <p className="inputNeedSpace">{profile.other} </p>
                            </div>
                        </div>
                        <div className="buttonSection">
                            <Button variant="primary" type="submit">{profile.save}</Button>
                            <Button variant="primary" onClick={this.handlePasswordChange}>{profile.changePassword}</Button>
                        </div>
                    </fieldset>
                        
                    </Style>
                    )}
                </Mutation>
        )}
      </Query>
    );
  }
}

export default multi(ProfilePage);
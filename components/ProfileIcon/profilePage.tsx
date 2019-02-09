import React, { FormEvent, Component } from 'react';
import Form from './profilePageStyle';
import { Query } from 'react-apollo';
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
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        day: '',
        month: '',
        year: '',
        gender: '',
    };

    handleSaveClick = () => {
        
    }

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

  render() {
    const {
        translations: { profile, general },
      } = this.props;
    return (
    <Query query={myQuery}> 
    {({data}) => (
    <Form>
        <h1>Mon profil</h1>
        <img className="profileButton" src="../static/profileImage.png" />
        <fieldset>

            {/*Section of first, last name and email*/}
            <div className="firstInfoSection">
                
                <div className="nameSection">
                    <div>
                        {/*full name*/}
                        <p>{profile.firstName}: </p><input className="inputNeedSpace" 
                                type="text" id="FirstName" defaultValue={data.me.firstName}/>
                        <p>{profile.lastName}: </p><input className="inputNeedSpace" 
                                type="text" id="LastName" defaultValue={data.me.lastName}/>
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
                        
                        placeholder={profile.address}
                        className="geoLoc"/>
                </div>
                {/*birth date*/}
                <div>
                    <p>{profile.birth}: </p>
                    <select defaultValue={data.me.birthDate.day}>
                        {this.getDayCount()}
                    </select>
                    <p> / </p>
                    <select defaultValue={data.me.birthDate.month}>
                        {this.getMonthCount()}
                    </select>
                    <p> / </p>
                    <select defaultValue={data.me.birthDate.year}>
                        {this.getYearCount()}
                    </select>
                </div>
                {/*sex*/}
                <div>
                    <p>{profile.sex}: </p>
                    <input type="radio" name="gender" value="male" checked={data.me.gender === 'MALE'} onChange={this.handleChange}/> 
                    <p className="inputNeedSpace">{profile.male} </p>
                    <input type="radio" name="gender" value="female" checked={data.me.gender === 'FEMALE'} onChange={this.handleChange}/> 
                    <p className="inputNeedSpace">{profile.female} </p>
                    <input type="radio" name="gender" value="other" checked={data.me.gender === 'OTHER'} onChange={this.handleChange}/> 
                    <p className="inputNeedSpace">{profile.other} </p>
                </div>
            </div>
            <div className="buttonSection">
                <Button variant="primary" onClick={this.handleSaveClick}>{profile.save}</Button>
                <Button variant="primary" onClick={this.handlePasswordChange}>{profile.changePassword}</Button>
            </div>
        </fieldset>
            
        </Form>
        )}
      </Query>
    );
  }
}

export default multi(ProfilePage);
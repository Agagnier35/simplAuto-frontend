import React, { FormEvent, Component } from 'react';
import Form from './profilePageStyle';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';

const myQuery = gql`
query {
    me {
        firstName
        lastName
        email
        location
        age
        gender
    }
  }
`;

class ProfilePage extends Component<MultiProps>{

    getDayCount() {
        let items = [];         
        for (let i = 1; i <= 31; i++) {             
          items.push(<option key={i} value={i} >{i}</option>);
        }
        return items;
    }  

    getMonthCount = () => {
        let items = [];         
        for (let i = 1; i <= 12; i++) {             
          items.push(<option key={i} value={i}>{i}</option>);
        }
        return items;
    }

    getYearCount = () => {
        let year = new Date().getFullYear();
        let items = [];         
        for (let i = year; i >= year - 110; i--) {             
          items.push(<option key={i} value={i}>{i}</option>);
        }
        return items;
    }

    clickSearchPosition = () => {

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
        <fieldset>

            {/*Section of first, last nam and email*/}
            <div className="firstInfoSection">
                <img className="profileButton" src="../static/profileImage.png" />
                <div className="vertical-center">
                    <div>
                        {/*full name*/}
                        <p>{profile.firstName}: </p><input className="inputNeedSpace" 
                                type="text" name="FirstName" defaultValue={data.me.firstName}/>
                        <p>{profile.lastName}: </p><input className="inputNeedSpace" 
                                type="text" name="LastName" defaultValue={data.me.lastName}/>
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
                    <p>{profile.location}: </p><input className="inputNeedSpace" 
                                type="text" name="FirstName" defaultValue={data.me.location}/>
                    <button>{profile.search}</button>
                </div>
                {/*birth date*/}
                <div>
                    <p>{profile.birth}: </p>
                    <select>
                        {this.getDayCount()}
                    </select>
                    <p> / </p>
                    <select>
                        {this.getMonthCount()}
                    </select>
                    <p> / </p>
                    <select>
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
            <button onClick={this.clickSearchPosition}>{profile.save}</button>
        </fieldset>
            
        </Form>
        )}
      </Query>
    );
  }
}

export default multi(ProfilePage);
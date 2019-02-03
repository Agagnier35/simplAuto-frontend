import React, { Component } from 'react';
import Form from './profilePageStyle';
import { multi, MultiProps } from '../../lib/MultiLang';

class ProfilePage extends Component<MultiProps>{

    getDayCount() {
        let items = [];         
        for (let i = 1; i <= 31; i++) {             
          items.push(<option key={i} value={i}>{i}</option>);   
          //here I will be creating my options dynamically based on
          //what props are currently passed to the parent component
        }
        return items;
    }  

    getmonthCount = () => {
        let items = [];         
        for (let i = 1; i <= 12; i++) {             
          items.push(<option key={i} value={i}>{i}</option>);   
          //here I will be creating my options dynamically based on
          //what props are currently passed to the parent component
        }
        return items;
    }

    getyearCount = () => {
        let year = new Date().getFullYear()
        let items = [];         
        for (let i = year; i >= year - 110; i--) {             
          items.push(<option key={i} value={i}>{i}</option>);   
          //here I will be creating my options dynamically based on
          //what props are currently passed to the parent component
        }
        return items;
    }

  render() {
    return (
    <Form>
        <h1>Mon profil</h1>
        <fieldset>

            {/*Section of first, last nam and email*/}
            <div className="firstInfoSection">
                <img className="profileButton" src="../static/profileImage.png" />
                <div className="vertical-center">
                    <div>
                        {/*full name*/}
                        <p>First name: </p><input className="inputNeedSpace" type="text" name="FirstName" defaultValue="Prenom"/>
                        <p>Last name: </p><input className="inputNeedSpace" type="text" name="LastName" defaultValue="Nom"/>
                    </div>
                {/*email*/}
                <p>email: </p><input className="inputNeedSpace" type="text" name="email" defaultValue="prenom.nom@gmail.com"/>
                </div>
            </div>

            {/*Section of every info */}
            <div>
                {/*location*/}
                <div>
                    <p>Location: </p><input className="inputNeedSpace" type="text" name="FirstName" defaultValue="my address"/>
                    <button>Search</button>
                </div>
                {/*birth date*/}
                <div>
                    <p>Birth date: </p>
                    <select>
                        {this.getDayCount()}
                    </select>
                    <p> / </p>
                    <select>
                        {this.getmonthCount()}
                    </select>
                    <p> / </p>
                    <select>
                        {this.getyearCount()}
                    </select>
                </div>
                {/*sex*/}
                <div>
                    <p>sex: </p>
                    {/*<form>
                        <input type="radio" name="gender" value="male"/> Male
                        <input type="radio" name="gender" value="female"/> Female
                        <input type="radio" name="gender" value="other"/> Other
                    </form>*/}
                </div>
            </div>
            <button>save</button>
            <button>buy</button>
        </fieldset>
            
        </Form>
    );
  }
}

export default multi(ProfilePage);
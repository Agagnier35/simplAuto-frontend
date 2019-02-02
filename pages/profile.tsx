import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import Form from './profilePageStyle';

const ProfilePage = ({
}: MultiProps) => {
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
              <p>First name: </p><input className="inputNeedSpace" type="text" name="FirstName" value="Prenom"/>
              <p>Last name: </p><input className="inputNeedSpace" type="text" name="LastName" value="Nom"/>
            </div>
            {/*email*/}
            <p>email: </p><input className="inputNeedSpace" type="text" name="email" value="prenom.nom@gmail.com"/>
          </div>
        </div>

        {/*Section of every info */}
        <div>
          {/*location*/}
          <div>
            <p>Location: </p><input className="inputNeedSpace" type="text" name="FirstName" value="my address"/>
            <button>Search</button>
          </div>
          {/*birth date*/}
          <div>
            <p>Birth date: </p>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <p> / </p>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <p> / </p>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          {/*sex*/}
          <div>
            <p>sex: </p>
            <form action="">
              <input type="radio" name="gender" value="male"/> Male
              <input type="radio" name="gender" value="female"/> Female
              <input type="radio" name="gender" value="other"/> Other
            </form>
          </div>
        </div>
        <button>save</button>
        <button>buy</button>
      </fieldset>
        
    </Form>
    
  );
};

export default multiUpdater(ProfilePage);

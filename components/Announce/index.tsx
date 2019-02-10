import React, {Component } from 'react';
import { multi, MultiProps } from '../../lib/MultiLang';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Announce from './Announce';
import Announces from './Announces';


interface AllAnnouncesCharacteristic {
    characteristic: {[id: string] : string};
  }

class AllAnnounces extends Component<MultiProps, AllAnnouncesCharacteristic> {
    
    render(){
    return(
        <div>
            <Announces></Announces>
        </div>
    )
    }
  }
  export default multi(AllAnnounces)
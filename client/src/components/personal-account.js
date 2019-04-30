import React, { Component } from 'react';
import AUTHAPI from '../utils/google-auth';

class PersonalAccount extends Component{
    componentDidMount = () => {
        AUTHAPI.getUserData().then( userResponse => {
            if(userResponse.data){
                this.props.setUser(userResponse.data);
            }
        })
    }
    render() {
        return (
            <div>
                {JSON.stringify(this.props.user)}
            </div>
        );
    }
}

export default PersonalAccount;
import React, { Component } from 'react';
import AUTHAPI from '../utils/google-auth';
import { Link } from 'react-router-dom';

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
                { this.props.user.email ? (`Hello, your email for future communication is set to ${this.props.user.email}`): (<p>{`Please sign in at `} <Link to="/">Homepage</Link> </p>)}
            </div>
        );
    }
}

export default PersonalAccount;
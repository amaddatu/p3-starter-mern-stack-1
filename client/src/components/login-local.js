import React, { Component } from 'react';
import LOCALAPI from '../utils/local-auth';
import { Link, Redirect } from 'react-router-dom';

class LoginLocal extends Component{
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleInputChange = event => {
        // copy
        let name = event.target.name;
        let value = event.target.value;
        //modify

        //setState
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(event.target);
        LOCALAPI.loginUser({
            email: this.state.email,
            password: this.state.password
        }).then( response => {
            let user = response.data;
            // make sure we have an email
            if(user && user.email){
                this.props.setUser(user);
                this.setState({
                    errorMessage: null
                });
            }
            else{
                this.setState({
                    errorMessage: "Could not log in"
                });
            }
        }).catch( error => {
            this.setState({
                errorMessage: "Could not log in"
            });
        })
    }


    componentDidMount = () => {
        // AUTHAPI.getUserData().then( userResponse => {
        //     if(userResponse.data){
        //         this.props.setUser(userResponse.data);
        //     }
        // })
    }
    render() {
        if(this.props.user && this.props.user.email){
            return <Redirect to="/personal-account"/>;
        }
        return (
            <div>
                <form className="search">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="Type in Email"
                        id="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Type in Password"
                        id="password"
                        />
                    </div>
                    
                    <button type="submit" onClick={this.handleFormSubmit} className="btn btn-success">
                        Search
                        </button>
                    </form>
                    {this.state.errorMessage}
            </div>
        );
    }
}

export default LoginLocal;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import AUTHAPI from './utils/google-auth';
import PersonalAccount from './components/personal-account';

class App extends Component {
  state = {
    user: {}
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/personal-account" render={
            () => (
              <PersonalAccount {...this.props} setUser={this.setUser} user={this.state.user} />
            )
          } />
          <Route exact path="/" render={
            () => (
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Test: {JSON.stringify(AUTHAPI.getUserData())}
                </p>
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href={AUTHAPI.getAuthorizeLink()}
                  rel="noopener noreferrer"
                >
                  Google Login
                </a>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            )
          } />
        </Router>
      </div>
    );
  }
}

export default App;

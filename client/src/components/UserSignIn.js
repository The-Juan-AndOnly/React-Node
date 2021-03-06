import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: []
  };

  // on cancel sends user back to main page
  cancel = () => {
    this.props.history.push('/');
  };

  // handles state change of controlled input
  change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    // Returns user to previous page that required a sign in or returns user to home page if user was not redirected to sign in
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    if (emailAddress === '' || password === '') {
      this.setState(() => {
        return {
          errors: [{ msg: 'Email Address and/or Password is Incorrect' }]
        };
      });
    } else {
      context.actions
        .signIn(emailAddress, password)
        .then(user => {
          if (user === null) {
            this.setState(() => {
              return {
                errors: [{ msg: 'Sign-in was unsuccessful' }]
              };
            });
          } else {
            this.props.history.push(from);
          }
        })
        .catch(err => {
          this.props.history.push('/error');
        });
    }
  };

  render() {
    const { emailAddress, password, errors } = this.state;
    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign In</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText='Sign In'
              elements={() => (
                <React.Fragment>
                  <input
                    id='emailAddress'
                    name='emailAddress'
                    type='text'
                    value={emailAddress}
                    onChange={this.change}
                    placeholder='Email Address'
                  />
                  <input
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={this.change}
                    placeholder='Password'
                  />
                </React.Fragment>
              )}
            />
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to='/signup'>Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}

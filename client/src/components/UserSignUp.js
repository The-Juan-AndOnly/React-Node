import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  };

  // on cancel send user back to main page
  cancel = () => {
    this.props.history.push('/');
  };

  // handles state udates from controlled inputs
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

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;
    // Create a user object that will be passed into the createUser method
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    // Quick front end check to ensure that both the password and confirmPassword do match
    if (confirmPassword !== password) {
      this.setState({ errors: [{ msg: 'Passwords do not match' }] });
    } else {
      context.data
        .createUser(user)
        .then(errors => {
          // If errors are returned we'll set the errors state to the errors arrayto then be displayed
          // Once a new user is successfully created we'll sign the user in.

          if (errors.length) {
            this.setState({ errors });
          } else {
            context.actions.signIn(emailAddress, password).then(() => {
              this.props.history.push('/');
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;
    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign Up</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText='Sign Up'
              elements={() => (
                <React.Fragment>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    value={firstName}
                    onChange={this.change}
                    placeholder='First Name'
                  />
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    value={lastName}
                    onChange={this.change}
                    placeholder='Last Name'
                  />
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
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={this.change}
                    placeholder='Confirm Password'
                  />
                </React.Fragment>
              )}
            />
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to='/signin'>Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

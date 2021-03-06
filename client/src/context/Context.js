import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from '../Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  // Create state for authUser with their id/firstName/lastName/email and one for the password.
  // States initial value will either be the value stored in cookies or null
  state = {
    authenticatedUser: Cookies.getJSON('authUser') || null,
    password: Cookies.getJSON('pass') || null
  };

  render() {
    const { authenticatedUser, password } = this.state;
    // Values that will be passed into Context Provider
    const value = {
      authenticatedUser,
      password,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  // Sign in function that will use the getUser method from Data.js then if a user is returned will update the state with user information as well as create a Cookie for the authUser and password
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);

    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          password
        };
      });
      Cookies.set('authUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('pass', JSON.stringify(password), { expires: 1 });
    }

    return user;
  };

  // on signout sets the state back to null and removes Cookies
  signOut = () => {
    this.setState({ authenticatedUser: null, password: null });
    Cookies.remove('authUser');
    Cookies.remove('pass');
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

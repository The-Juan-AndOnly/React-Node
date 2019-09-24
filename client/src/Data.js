import apiBaseUrl from './config';

export default class Data {
  // Call to the REST API that expects a path, default method of 'GET', and a default body of 'null'
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = false
  ) {
    // Make a connection to the REST API
    const url = `${apiBaseUrl}${path}`;

    // Define our options as the 2nd param of the fetch call
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
    // If body is not null in the case of a POST or PUT request, stringify the body
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}: ${credentials.password}`
      );
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    // Make a fetch call to the api
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      emailAddress,
      password
    });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}

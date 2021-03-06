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
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    // Make a fetch call to the api
    return fetch(url, options);
  }

  // Get a user from the database
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      emailAddress,
      password
    });
    // If a user exists then return user if not then return null
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // Create a user on the database
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    // If response status is 201/Successful then return empty errors array
    // Else return the Validation Errors
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

  // Create a Course on the database
  async createCourse(course, emailAddress, password) {
    console.log(course);
    const response = await this.api('/courses', 'POST', course, true, {
      emailAddress,
      password
    });

    // If response status is 201/Successful then return empty errors array
    // Else return the Validation Errors
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

  // Update Course on the database
  async updateCourse(course, id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {
      emailAddress,
      password
    });

    // If response status is 201/Successful then return empty errors array
    // Else return the Validation Errors
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Delete a course from the database
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      emailAddress,
      password
    });

    // If response status is 201/Successful then return empty errors array
    // Else return the Validation Errors
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}

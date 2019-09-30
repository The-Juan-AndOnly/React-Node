import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    materialsNeeded: '',
    estimatedTime: '',
    errors: [],
    user: {}
  };

  // Reroutes the user back to the main courses page when pressing cancel button
  cancel = () => {
    this.props.history.push('/');
  };

  // Allows for updating state on a controlled input
  change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  //
  submit = () => {
    const { title, description, materialsNeeded, estimatedTime } = this.state;
    const { context } = this.props;
    const { emailAddress, id } = context.authenticatedUser;
    const pass = context.password;
    const userId = id;
    // Create a course object with the required information needed to create a new course
    const course = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      userId
    };

    // Creates a new course and if any errors are returned from API validation then will update state to display the errors
    context.data.createCourse(course, emailAddress, pass).then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        this.props.history.push('/');
      }
    });
  };

  render() {
    const {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      errors
    } = this.state;
    const { firstName, lastName } = this.props.context.authenticatedUser;
    return (
      <div className='bounds course--detail'>
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Create Course'
          elements={() => (
            <React.Fragment>
              <div className='grid-66'>
                <div className='course--header'>
                  <h4 className='course--label'>Course</h4>
                  <div>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      className='input-title course--title--input'
                      placeholder='Course title...'
                      value={title}
                      onChange={this.change}
                    />
                  </div>
                  <p>
                    By {firstName} {lastName}
                  </p>
                </div>
                <div className='course--description'>
                  <div>
                    <textarea
                      id='description'
                      name='description'
                      className=''
                      placeholder='Course description...'
                      value={description}
                      onChange={this.change}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='grid-25 grid-right'>
                <div className='course--stats'>
                  <ul className='course--stats--list'>
                    <li className='course--stats--list--item'>
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id='estimatedTime'
                          name='estimatedTime'
                          type='text'
                          className='course--time--input'
                          placeholder='Hours'
                          value={estimatedTime}
                          onChange={this.change}
                        />
                      </div>
                    </li>
                    <li className='course--stats--list--item'>
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id='materialsNeeded'
                          name='materialsNeeded'
                          className=''
                          placeholder='List materials...'
                          value={materialsNeeded}
                          onChange={this.change}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

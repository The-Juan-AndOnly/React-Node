import React, { Component } from 'react';

import Form from './Form';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    user: {},
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  };

  componentDidMount() {
    this.fetchCourse();
  }

  fetchCourse = async () => {
    const { id } = this.props.match.params;
    try {
      const response = await this.props.context.data.api(`/courses/${id}`);

      const data = await response.json();

      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        user
      } = data.course;
      this.setState(() => {
        return { title, description, estimatedTime, materialsNeeded, user };
      });
      if (user.id !== this.props.context.authenticatedUser.id) {
        this.props.history.push('/forbidden');
      }
    } catch (err) {
      this.props.history.push('/notfound');
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = () => {
    const { title, description, materialsNeeded, estimatedTime } = this.state;
    const { context } = this.props;
    const { emailAddress } = context.authenticatedUser;
    const pass = context.password;
    const id = this.props.match.params.id;
    const course = {
      title,
      description,
      materialsNeeded,
      estimatedTime
    };

    context.data
      .updateCourse(course, id, emailAddress, pass)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        this.props.history.push('/error');
      });
  };
  render() {
    const {
      errors,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const { context } = this.props;
    const { firstName, lastName } = context.authenticatedUser;

    return (
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Update Course'
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
      </div>
    );
  }
}

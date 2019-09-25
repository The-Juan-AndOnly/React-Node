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
  render() {
    const {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      errors
    } = this.state;
    return (
      <div className='bounds course--detail'>
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Sign Up'
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
                      value=''
                      onChange={this.change}
                    />
                  </div>
                  <p>By Joe Smith</p>
                </div>
                <div className='course--description'>
                  <div>
                    <textarea
                      id='description'
                      name='description'
                      className=''
                      placeholder='Course description...'
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
                          value=''
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
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='grid-100 pad-bottom'>
                <button className='button' type='submit'>
                  Create Course
                </button>
                <button
                  className='button button-secondary'
                  onClick={() => this.props.history.push('/')}
                >
                  Cancel
                </button>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

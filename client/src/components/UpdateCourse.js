import React, { Component } from 'react';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
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
        materialsNeeded
      } = data.course;
      this.setState({ title, description, estimatedTime, materialsNeeded });
    } catch (err) {
      this.props.history.push('/noutfound');
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted', this.state);
  };
  render() {
    return (
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
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
                    value={this.state.title}
                    onChange={this.handleChange}
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
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
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
                        value={this.state.estimatedTime}
                        onChange={this.handleChange}
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
                        value={this.state.materialsNeeded}
                        onChange={this.handleChange}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>
                Update Course
              </button>
              <button
                className='button button-secondary'
                onClick={() => this.props.history.push('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

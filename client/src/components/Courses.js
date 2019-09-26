import React, { Component } from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
  state = {
    courses: [],
    isLoading: true
  };
  componentDidMount() {
    this.fetchCourses();
  }
  // Fetch Courses using context.data.api
  fetchCourses = async () => {
    try {
      const response = await this.props.context.data.api('/courses');
      const data = await response.json();
      this.setState(() => ({ courses: data.courses, isLoading: false }));
    } catch (err) {
      this.props.history.push('/error');
    }
  };

  render() {
    const { courses, isLoading } = this.state;
    let courseData = courses.map(course => {
      return (
        <div className='grid-33' key={course.id}>
          <Link
            className='course--module course--link'
            to={`/course/${course.id}`}
          >
            <h4 className='course--label'>Course</h4>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        </div>
      );
    });
    return (
      <div className='bounds'>
        {isLoading ? <Loader /> : courseData}
        <div className='grid-33'>
          <Link
            className='course--module course--add--module'
            to={`/courses/create`}
          >
            <h3 className='course--add--title'>
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 13 13'
                className='add'
              >
                <polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

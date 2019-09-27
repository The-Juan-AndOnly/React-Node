import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
  state = {
    course: {},
    user: {}
  };
  componentDidMount() {
    this.fetchCourse();
  }

  displayCourseOptions = (course, user) => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    if (authUser) {
      if (authUser.id === user.id) {
        return (
          <span>
            <Link className='button' to={`/courses/${course.id}/update`}>
              Update Course
            </Link>
            <button className='button' onClick={this.handleDelete}>
              Delete Course
            </button>
          </span>
        );
      } else {
        return;
      }
    } else {
      return;
    }
  };

  // Retrieve a single course using context.data.api
  fetchCourse = async () => {
    const courseId = this.props.match.params.id;
    try {
      const response = await this.props.context.data.api(
        `/courses/${courseId}`
      );
      const data = await response.json();
      this.setState({ course: data.course, user: data.course.user });
    } catch (err) {
      this.props.history.push('/notfound');
    }
  };

  // Delete the course
  handleDelete = () => {
    const courseId = this.props.match.params.id;
    const { context } = this.props;
    const { authenticatedUser, password } = context;
    const { emailAddress } = authenticatedUser;

    if (window.confirm('Are you sure you want to delete this course?')) {
      context.data
        .deleteCourse(courseId, emailAddress, password)
        .then(errors => {
          if (errors.length) {
            this.props.history.push('/forbidden');
          } else {
            this.props.history.push('/');
          }
        });
    } else {
      return;
    }
  };

  render() {
    const { course, user } = this.state;

    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              {this.displayCourseOptions(course, user)}
              <Link className='button button-secondary' to='/'>
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>

              <h3 className='course--title'>{course.title}</h3>

              <p>
                By {user.firstName} {user.lastName}
              </p>
            </div>
            <div className='course--description'>
              <Markdown source={course.description} />
            </div>
          </div>
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime || 'N/A'}</h3>
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>

                  <Markdown source={course.materialsNeeded || 'N/A'} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CourseDetail;

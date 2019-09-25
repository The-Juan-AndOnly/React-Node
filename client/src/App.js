import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

// import Home from './components/Home';
import Header from './layout/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';

import NotFound from './components/NotFound';
import PrivateRoute from './PrivateRoute';

import {
  UserSignInWithContext,
  UserSignUpWithContext
} from './context/ContextHelper';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route component={Header} />
        <Switch>
          <Route exact path='/' component={Courses} />

          <Route
            exact
            path='/course/:id'
            render={props => <CourseDetail {...props} />}
          />
          <Route path='/courses/:id/update' component={UpdateCourse} />
          <Route path='/courses/create' component={CreateCourse} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signout' component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

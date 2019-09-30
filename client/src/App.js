import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Components that are subscribed to context
import {
  CoursesWithContext,
  CourseDetailWithContext,
  CreateCourseWithContext,
  UpdateCourseWithContext,
  UserSignOutWithContext,
  UserSignInWithContext,
  UserSignUpWithContext,
  HeaderWithContext
} from './context/ContextHelper';

// Error Handling Routes
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';

// Private Route for Authorization
import PrivateRoute from './PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <PrivateRoute
            exact
            path='/courses/:id/update'
            component={UpdateCourseWithContext}
          />
          <PrivateRoute
            exact
            path='/courses/create'
            component={CreateCourseWithContext}
          />
          <Route path='/courses/:id' component={CourseDetailWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
          <Route path='/forbidden' component={Forbidden} />
          <Route path='/error' component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

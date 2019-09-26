import Courses from '../components/Courses';
import CourseDetail from '../components/CourseDetail';
import CreateCourse from '../components/CreateCourse';
import UpdateCourse from '../components/UpdateCourse';
import UserSignIn from '../components/UserSignIn';
import UserSignOut from '../components/UserSignOut';
import UserSignUp from '../components/UserSignUp';
import Header from '../layout/Header';

// import withContext
import withContext from './Context';

//Context associations
export const CoursesWithContext = withContext(Courses);
export const CourseDetailWithContext = withContext(CourseDetail);
export const CreateCourseWithContext = withContext(CreateCourse);
export const UpdateCourseWithContext = withContext(UpdateCourse);
export const UserSignUpWithContext = withContext(UserSignUp);
export const UserSignOutWithContext = withContext(UserSignOut);
export const UserSignInWithContext = withContext(UserSignIn);
export const HeaderWithContext = withContext(Header);

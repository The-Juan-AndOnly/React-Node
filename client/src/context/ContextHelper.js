import UserSignIn from '../components/UserSignIn';
import UserSignUp from '../components/UserSignUp';

// import withContext
import withContext from './Context';

//Context associations
export const UserSignUpWithContext = withContext(UserSignUp);
export const UserSignInWithContext = withContext(UserSignIn);

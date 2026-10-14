import { useNavigate } from 'react-router-native';
import SignInForm from './SignInForm';
import useSignIn from '../../hooks/useSignIn';

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();
  const loading = result?.loading ?? false;

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });

      if (data) {
        navigate('/');
      }
    } catch (e) {
      console.log('Sign-in error:', e);
    }
  };

  return <SignInForm onSubmit={onSubmit} loading={loading} />;
};

export default SignIn;
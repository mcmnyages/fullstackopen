import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from '../FormikTextInput/index';
import Text from './../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit, loading = false }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable
            style={[
              styles.button,
              loading && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text color="textWhite" fontWeight="bold">
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
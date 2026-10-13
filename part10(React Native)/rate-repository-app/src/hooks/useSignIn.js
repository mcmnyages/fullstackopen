import { useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';
import authStorage from '../utils/authStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
    }

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
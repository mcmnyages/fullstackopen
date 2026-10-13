import {useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const payload = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    return payload;
  };

  return [signIn, result];
};

export default useSignIn;
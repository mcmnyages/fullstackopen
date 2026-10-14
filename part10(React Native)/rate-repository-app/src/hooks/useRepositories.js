import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';

export const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data ? data.repositories : undefined;

  return { 
    repositories, 
    loading,
    error, 
    refetch 
  };
};

export const useRepository = (id) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data ? data.repository : undefined;

  return {
    repository,
    loading,
    error,
    refetch,
  };
};


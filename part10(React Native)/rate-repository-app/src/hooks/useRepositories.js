import { useQuery,useMutation } from '@apollo/client/react';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';
import { CREATE_REVIEW } from '../graphql/mutations';

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

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      },
    });
    return response;
  };

  return [createReview, result];
};


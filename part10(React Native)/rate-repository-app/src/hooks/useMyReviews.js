import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries';

const useMyReviews = (variables) => {
  const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true, ...variables },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        includeReviews: true,
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.me?.reviews,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result,
  };
};

export default useMyReviews;
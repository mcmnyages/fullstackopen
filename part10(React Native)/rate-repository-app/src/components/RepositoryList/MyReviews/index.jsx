import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../../../graphql/mutations';
import ReviewItem from '../../RepositoryList/ReviewItem';
import useMyReviews from '../../../hooks/useMyReviews';

const MyReviews = () => {
  const navigate = useNavigate();
  const first = 3; 
  
  const { reviews, fetchMore, loading, refetch } = useMyReviews({ first });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
              refetch();
            } catch (e) {
              console.error('Error deleting review:', e);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  if (loading && !reviews) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  const reviewNodes = reviews?.edges?.map((edge) => edge.node) ?? [];

  if (reviewNodes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>You haven&rsquo;t written any reviews yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviewNodes}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showActions={true}
          onDelete={() => handleDelete(item.id)}
          onViewRepository={() => handleViewRepository(item.repository.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#586069',
    textAlign: 'center',
  },
});

export default MyReviews;
import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../../../graphql/queries';
import ReviewItem from '../../RepositoryList/ReviewItem';

const MyReviews = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) ?? [];

  if (reviews.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          You haven&rsquo;t written any reviews yet.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
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
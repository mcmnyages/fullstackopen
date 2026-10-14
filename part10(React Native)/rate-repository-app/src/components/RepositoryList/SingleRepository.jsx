import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import {useRepository} from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  spinner: {
    padding: 20,
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading || !repository) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository} showGitHubButton={true} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepository;
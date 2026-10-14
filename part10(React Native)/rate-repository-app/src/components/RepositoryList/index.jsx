import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import {useRepositories} from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  spinner: {
    padding: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
// Component handling side effects (hook)
const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading && !repositories) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;







import React, { useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import { useRepositories } from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  spinner: {
    padding: 20,
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// Add ListHeaderComponent to render the Picker
export const RepositoryListContainer = ({ repositories, selectedSort, setSelectedSort }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSort}
            onValueChange={(itemValue) => setSelectedSort(itemValue)}
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest_rated" />
            <Picker.Item label="Lowest rated repositories" value="lowest_rated" />
          </Picker>
        </View>
      }
    />
  );
};

// Component handling state and side effects
const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');

  // Map the selected string value to query variables: orderBy and orderDirection
  const getQueryVariables = () => {
    switch (selectedSort) {
      case 'highest_rated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest_rated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'latest':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getQueryVariables();
  const { repositories, loading } = useRepositories({ orderBy, orderDirection });

  if (loading && !repositories) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    />
  );
};

export default RepositoryList;
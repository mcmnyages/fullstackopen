// src/components/RepositoryList/index.jsx
import React, { useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import { useRepositories } from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  spinner: {
    padding: 20,
  },
  headerContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#e1e4e8',
    borderRadius: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ 
  repositories, 
  selectedSort, 
  setSelectedSort, 
  searchKeyword, 
  onEndReached,
  setSearchKeyword 
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories..."
            value={searchKeyword}
            onChangeText={(text) => setSearchKeyword(text)}
          />
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
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Debounce searchKeyword by 500ms
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

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
  
  // Pass both sorting variables and the debounced search keyword to the hook
  const { repositories, loading,fetchMore } = useRepositories({ 
    first:5,
    orderBy, 
    orderDirection, 
    searchKeyword: debouncedKeyword 
  });

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
      onEndReached={fetchMore}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
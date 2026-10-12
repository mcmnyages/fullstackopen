import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
  },
  language: {
    marginTop: 5,
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 4,
  },
  stats: {
    marginTop: 5,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.language}>{item.language}</Text>
      <Text style={styles.stats}>
        Stars: {item.stargazersCount}
      </Text>
      <Text style={styles.stats}>
        Forks: {item.forksCount}
      </Text>
      <Text style={styles.stats}>
        Reviews: {item.reviewCount}
      </Text>
      <Text style={styles.stats}>
        Rating average: {item.ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem;
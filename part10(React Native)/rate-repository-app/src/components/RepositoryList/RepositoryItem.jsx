import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  language: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
});

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={{ marginTop: 4 }}>
            {item.description}
          </Text>
          <View style={styles.language}>
            <Text color="textWhite" fontWeight="bold">
              {item.language}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
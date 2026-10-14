import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5, // width / 2 to create a circle
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
  },
  reviewText: {
    marginTop: 4,
    color: theme.colors.textPrimary,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.user.username}
        </Text>
        <Text color="textSecondary" style={{ marginTop: 2 }}>
          {formattedDate}
        </Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
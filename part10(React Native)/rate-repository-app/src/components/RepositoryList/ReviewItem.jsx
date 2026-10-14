import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReviewItem = ({ review, showActions, onDelete, onViewRepository }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.reviewContent}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.repositoryName}>
            {review.repository ? review.repository.fullName : ''}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.viewButton]} 
            onPress={onViewRepository}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewContent: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    flexShrink: 1,
  },
  repositoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#24292e',
    marginBottom: 4,
  },
  date: {
    color: '#586069',
    marginBottom: 6,
    fontSize: 14,
  },
  text: {
    color: '#24292e',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaecef',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a49',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ReviewItem;
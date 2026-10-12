import { Pressable, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
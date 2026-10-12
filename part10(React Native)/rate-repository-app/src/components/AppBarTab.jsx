import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to} component={Pressable}>
      <Text color="textWhite" fontWeight="bold" fontSize="subheading" style={styles.tab}>
        {title}
      </Text>
    </Link>
  );
};

export default AppBarTab;
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { GET_CURRENT_USER } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 15,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const currentUser = data?.me;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab title="Repositories" to="/" />

        {currentUser ? (
          <>
            <AppBarTab title="Create a review" to="/create-review" />
            <AppBarTab title="My Reviews" to="/my-reviews" />
            <Pressable onPress={handleSignOut} style={styles.tab}>
              <Text color="textWhite" fontWeight="bold" fontSize="subheading">
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" to="/signin" />
            <AppBarTab title="Sign Up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from '../components/AppBar';


const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
    },
});

const Main = () => {
    return (

        <View style={styles.container}>
            <AppBar />
            <RepositoryList />
        </View>
    );
};

export default Main;
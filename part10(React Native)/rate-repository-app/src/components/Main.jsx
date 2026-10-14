import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './RepositoryList/SingleRepository';
import AppBar from '../components/AppBar';
import SignIn from './SignIn'
import SignUp from './SignUp'
import CreateReview from './RepositoryList/CreateReview';
import MyReviews from './RepositoryList/MyReviews';

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
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<RepositoryList />} />
                <Route path="/repository/:id" element={<SingleRepository />} />
                <Route path="/create-review" element={<CreateReview />} />
                <Route path="/my-reviews" element={<MyReviews />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
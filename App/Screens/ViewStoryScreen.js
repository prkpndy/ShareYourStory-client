import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import ProfilePicture from '../Components/ProfilePicture';
import UserDetails from '../Components/UserDetails';
import constants from '../../constants';

const ViewStoryScreen = ({navigation}) => {
    const handleProfilePicturePress = () => {
        navigation.navigate('screen3');
    };

    return (
        <View style={styles.container}>
            <View style={styles.profilePictureContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleProfilePicturePress}>
                    <ProfilePicture
                        dimensions={styles.profilePicture}
                        borderColor={'bright'}
                    />
                </TouchableOpacity>
            </View>
            <UserDetails />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.accentColor,
    },
    profilePictureContainer: {
        marginBottom: 50,
    },
    profilePicture: {
        height: 200,
        width: 200,
    },
});

export default ViewStoryScreen;

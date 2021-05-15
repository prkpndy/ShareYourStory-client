import React from 'react';
import {View, StyleSheet} from 'react-native';

import ProfilePicture from '../Components/ProfilePicture';
import UserDetails from '../Components/UserDetails';
import constants from '../../constants';

const EndScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.profilePictureContainer}>
                <ProfilePicture
                    dimensions={styles.profilePicture}
                    borderColor={'dark'}
                />
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

export default EndScreen;

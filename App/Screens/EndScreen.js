import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import ProfilePicture from '../Components/ProfilePicture';
import UserDetails from '../Components/UserDetails';
import {DetailsContext} from '../../App';

const EndScreen = ({navigation}) => {
    const props = useContext(DetailsContext);

    return (
        <View style={styles.container}>
            <View style={styles.profilePictureContainer}>
                <ProfilePicture
                    dimensions={styles.profilePicture}
                    isProfilePictureDownloaded={
                        props.isProfilePictureDownloaded
                    }
                    profilePictureDetails={props.profilePictureDetails}
                    borderColor={'dark'}
                />
            </View>
            <UserDetails userDetails={props.userDetails} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d5e9f5',
    },
    profilePictureContainer: {
        marginBottom: 50,
    },
    profilePicture: {
        height: 128,
        width: 128,
    },
});

export default EndScreen;

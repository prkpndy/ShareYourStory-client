import React, {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import ProfilePicture from '../Components/ProfilePicture';
import UserDetails from '../Components/UserDetails';
import {DetailsContext} from '../../App';

const ViewStoryScreen = ({navigation}) => {
    const props = useContext(DetailsContext);
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
                        isProfilePictureDownloaded={
                            props.isProfilePictureDownloaded
                        }
                        profilePictureDetails={props.profilePictureDetails}
                        borderColor={'bright'}
                    />
                </TouchableOpacity>
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

export default ViewStoryScreen;

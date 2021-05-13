import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import ProfilePicture from '../Components/ProfilePicture';
import UpdateProfilePicture from '../Components/UpdateProfilePicture';
import getProfilePicture from '../requests/getProfilePicture';
import constants from '../../constants';

const AddStoryScreen = ({route}) => {
    const [isUpdatePicture, setIsUpdatePicture] = useState(false);

    const handleProfilePicturePress = () => {
        if (!route.params.isProfilePictureDownloaded) {
            const result = getProfilePicture(
                'http://192.168.1.7:5000/downloadProfilePicture/' +
                    constants.ID,
            );
            if (result) {
                route.params.setIsProfilePictureDownloaded(true);
                route.params.setProfilePictureDetails(result);
            }
        }
    };

    const handleProfilePictureLongPress = () => {
        setIsUpdatePicture(true);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={handleProfilePictureLongPress}
                onPress={handleProfilePicturePress}>
                <ProfilePicture
                    dimensions={styles.profilePicture}
                    isProfilePictureDownloaded={
                        route.params.isProfilePictureDownloaded
                    }
                    profilePictureDetails={route.params.profilePictureDetails}
                    borderColor={'none'}
                />
            </TouchableOpacity>
            <UpdateProfilePicture
                isModalVisible={isUpdatePicture}
                onCancel={() => setIsUpdatePicture(false)}
            />
            <TouchableOpacity
                style={styles.addStoryButton}
                onPress={() => {
                    ImagePicker.openPicker({
                        width: 300,
                        height: 300,
                        cropping: true,
                    })
                        .then(image => {
                            console.log(image);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }}>
                <Image
                    style={styles.addStoryButtonImage}
                    source={require('../res/images/addStoryButton.png')}
                />
            </TouchableOpacity>
            <View style={styles.userInfo}>
                <Text>Prakhar Pandey</Text>
                <Text>Student</Text>
                <Text>www.prakharpandey.com</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        height: 128,
        width: 128,
    },
    addStoryButton: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addStoryButtonText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 80,
        color: 'white',
    },
    addStoryButtonImage: {
        height: 40,
        width: 40,
    },
    userInfo: {
        alignItems: 'center',
    },
});

export default AddStoryScreen;

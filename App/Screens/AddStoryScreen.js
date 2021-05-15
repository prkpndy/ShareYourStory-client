import React, {useState, useContext} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import ProfilePicture from '../Components/ProfilePicture';
import UpdateProfilePicture from '../Components/UpdateProfilePicture';
import AddStory from '../Components/AddStory';
import UserDetails from '../Components/UserDetails';
import {DetailsContext} from '../../App';

const AddStoryScreen = ({navigation}) => {
    const props = useContext(DetailsContext);
    const [isUpdatePicture, setIsUpdatePicture] = useState(false);
    const [isAddStory, setIsAddStory] = useState(false);

    const handleProfilePictureLongPress = () => {
        setIsUpdatePicture(true);
    };

    const handleAddStoryPress = () => {
        setIsAddStory(true);
    };

    const handleStoryAdded = () => {
        navigation.navigate('screen2');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={handleProfilePictureLongPress}>
                <ProfilePicture
                    dimensions={styles.profilePicture}
                    isProfilePictureDownloaded={
                        props.isProfilePictureDownloaded
                    }
                    profilePictureDetails={props.profilePictureDetails}
                    borderColor={'none'}
                />
            </TouchableOpacity>
            <UpdateProfilePicture
                isModalVisible={isUpdatePicture}
                onCancel={() => setIsUpdatePicture(false)}
                userId={props.userDetails.id}
                handleProfilePictureRemoved={props.handleProfilePictureRemoved}
                handleProfilePictureUpdated={props.handleProfilePictureUpdated}
                apolloClient={props.apolloClient}
            />
            <AddStory
                isModalVisible={isAddStory}
                onCancel={() => setIsAddStory(false)}
                userId={props.userDetails.id}
                handleStoryAdded={handleStoryAdded}
                apolloClient={props.apolloClient}
            />
            <TouchableOpacity
                style={styles.addStoryButton}
                onPress={handleAddStoryPress}>
                <Image
                    style={styles.addStoryButtonImage}
                    source={require('../res/images/addStoryButton.png')}
                />
            </TouchableOpacity>
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
});

export default AddStoryScreen;

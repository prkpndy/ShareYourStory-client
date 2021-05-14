import React from 'react';
import {Image} from 'react-native';

const ProfilePicture = props => {
    if (props.isProfilePictureDownloaded) {
        return (
            <Image
                source={{
                    uri: `file://${props.profilePictureDetails.path}`,
                    ...props.dimensions,
                }}
            />
        );
    }
    return (
        <Image
            style={props.dimensions}
            source={require('../res/images/noProfilePicture.png')}
        />
    );
};

export default ProfilePicture;

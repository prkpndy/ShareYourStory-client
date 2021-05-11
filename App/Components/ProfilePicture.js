import React from 'react';
import {Image} from 'react-native';

const ProfilePicture = props => {
    return (
        <Image
            style={props.dimensions}
            source={require('../res/images/noProfilePicture.png')}
        />
    );
};

export default ProfilePicture;

import React, {useContext} from 'react';
import {Image, StyleSheet} from 'react-native';

import {DetailsContext} from '../../App';
import constants from '../../constants';

const ProfilePicture = props => {
    const contextData = useContext(DetailsContext);

    if (contextData.isProfilePictureDownloaded) {
        return (
            <Image
                source={{
                    uri: `file://${contextData.profilePictureDetails.path}`,
                    ...props.dimensions,
                }}
                style={
                    props.borderColor === 'bright'
                        ? styles.bright
                        : props.borderColor === 'dark'
                        ? styles.dark
                        : null
                }
            />
        );
    }
    return (
        <Image
            style={
                props.borderColor === 'bright'
                    ? {...styles.bright, ...props.dimensions}
                    : props.borderColor === 'dark'
                    ? {...styles.dark, ...props.dimensions}
                    : props.dimensions
            }
            source={require('../res/images/noProfilePicture.png')}
        />
    );
};

const styles = StyleSheet.create({
    bright: {
        borderColor: constants.profilePictureBorderColorBright,
        borderWidth: 4,
        padding: 5,
    },
    dark: {
        borderColor: constants.profilePictureBorderColorDark,
        borderWidth: 4,
        padding: 5,
    },
});

export default ProfilePicture;

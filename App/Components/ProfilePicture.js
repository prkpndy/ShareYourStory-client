import React from 'react';
import {Image, StyleSheet} from 'react-native';

const ProfilePicture = props => {
    if (props.isProfilePictureDownloaded) {
        return (
            <Image
                source={{
                    uri: `file://${props.profilePictureDetails.path}`,
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
        borderColor: '#fcf400',
        borderWidth: 4,
        padding: 5,
    },
    dark: {
        borderColor: '#7a7878',
        borderWidth: 4,
        padding: 5,
    },
});

export default ProfilePicture;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserDetails = props => {
    return (
        <View style={styles.userInfo}>
            {Object.keys(props.userDetails).map((key, index) => {
                const value = props.userDetails[key];
                if (value) {
                    return <Text key={key}>value</Text>;
                } else {
                    return null;
                }
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        alignItems: 'center',
    },
});

export default UserDetails;

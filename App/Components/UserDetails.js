import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const userDetailsField = ['name', 'occupation', 'email', 'website'];

const UserDetails = props => {
    return (
        <View style={styles.userInfo}>
            {userDetailsField.map(value => {
                if (props.userDetails[value]) {
                    return <Text key={value}>{props.userDetails[value]}</Text>;
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

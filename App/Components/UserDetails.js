import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {DetailsContext} from '../../App';

const userDetailsField = ['name', 'occupation', 'email', 'website'];

const UserDetails = () => {
    const contextData = useContext(DetailsContext);

    return (
        <View style={styles.userInfo}>
            {userDetailsField.map(value => {
                if (contextData.userDetails[value]) {
                    return (
                        <Text key={value}>
                            {contextData.userDetails[value]}
                        </Text>
                    );
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

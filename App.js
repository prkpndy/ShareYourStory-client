/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
// import {createUploadLink} from 'apollo-upload-client';

import AddStoryScreen from './App/Screens/AddStoryScreen'; // Screen 1
import ViewStoryScreen from './App/Screens/ViewStoryScreen'; // Screen 2
import StoryScreen from './App/Screens/ViewStoryScreen'; // Screen 3
import EndScreen from './App/Screens/EndScreen'; // Screen 4

const ScreenStack = createStackNavigator();

// const client = new ApolloClient({
//     // uri: 'http://192.168.1.7:5000/graphql',
//     link: createUploadLink({uri: 'http://192.168.1.7:5000/graphql'}),
//     cache: new InMemoryCache(),
//     credentials: 'include',
// });

const App = () => {
    const [
        isProfilePictureDownloaded,
        setIsProfilePictureDownloaded,
    ] = useState(false);
    const [profilePictureDetails, setProfilePictureDetails] = useState({
        path: 'res/images/noProfilePicture.png',
        type: 'image/png',
        name: 'noProfilePicture.png',
    });
    const [userDetails, setUserDetails] = useState(null);

    return (
        <NavigationContainer>
            <ScreenStack.Navigator initialRouteName="screen1">
                <ScreenStack.Screen
                    name="screen1"
                    component={AddStoryScreen}
                    initialParams={{
                        isProfilePictureDownloaded,
                        setIsProfilePictureDownloaded,
                        profilePictureDetails,
                        setProfilePictureDetails,
                        userDetails,
                        setUserDetails,
                    }}
                />
                <ScreenStack.Screen
                    name="screen2"
                    component={ViewStoryScreen}
                    initialParams={{
                        isProfilePictureDownloaded,
                        profilePictureDetails,
                        userDetails,
                    }}
                />
                <ScreenStack.Screen name="screen3" component={StoryScreen} />
                <ScreenStack.Screen
                    name="screen4"
                    component={EndScreen}
                    initialParams={{
                        isProfilePictureDownloaded,
                        profilePictureDetails,
                        userDetails,
                    }}
                />
            </ScreenStack.Navigator>
        </NavigationContainer>
    );
};

export default App;

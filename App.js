/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, InMemoryCache} from '@apollo/client';

import AddStoryScreen from './App/Screens/AddStoryScreen'; // Screen 1
import ViewStoryScreen from './App/Screens/ViewStoryScreen'; // Screen 2
import StoryScreen from './App/Screens/StoryScreen'; // Screen 3
import EndScreen from './App/Screens/EndScreen'; // Screen 4

import getUserDetailsQuery from './App/queries/getUserDetailsQuery';

import getProfilePicture from './App/requests/getImage';

import constants from './constants';
import DetailsContext from './App/DetailsContext';

const ScreenStack = createStackNavigator();

const client = new ApolloClient({
    uri: 'http://192.168.1.7:5000/graphql',
    cache: new InMemoryCache(),
});

// export const DetailsContext = React.createContext();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProfilePictureDownloaded: false,
            isUserDetailsRecieved: false,
            profilePictureDetails: {
                path: 'res/images/noProfilePicture.png',
                type: 'image/png',
                name: 'noProfilePicture.png',
            },
            userDetails: {
                id: constants.ID,
                isProfilePictureAvailable: false,
            },
        };

        this.sendRequestForProfilePicture = this.sendRequestForProfilePicture.bind(
            this,
        );
        this.handleProfilePictureDownloaded = this.handleProfilePictureDownloaded.bind(
            this,
        );
        this.handleProfilePictureRemoved = this.handleProfilePictureRemoved.bind(
            this,
        );
        this.handleProfilePictureUpdated = this.handleProfilePictureUpdated.bind(
            this,
        );
    }

    handleProfilePictureDownloaded(profilePictureDetails) {
        this.setState({
            isProfilePictureDownloaded: true,
            profilePictureDetails,
        });
    }

    handleProfilePictureUpdated(imageExtension) {
        this.setState({
            isProfilePictureDownloaded: false,
            userDetails: {
                ...this.state.userDetails,
                isProfilePictureAvailable: true,
                profilePictureExtension: imageExtension,
            },
        });
    }

    handleProfilePictureRemoved() {
        this.setState({
            isProfilePictureDownloaded: false,
            userDetails: {
                ...this.state.userDetails,
                isProfilePictureAvailable: false,
            },
        });
    }

    sendRequestForProfilePicture() {
        getProfilePicture(
            constants.url + '/downloadProfilePicture/' + constants.ID,
            this.handleProfilePictureDownloaded,
        );
    }

    sendRequestForUserDetails() {
        client
            .query({query: getUserDetailsQuery, variables: {id: constants.ID}})
            .then(result => {
                console.log(result.data.getUserDetails);
                this.setState({
                    isUserDetailsRecieved: true,
                    userDetails: result.data.getUserDetails,
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.isUserDetailsRecieved) {
            this.sendRequestForUserDetails();
        }
        if (
            this.state.isUserDetailsRecieved &&
            this.state.userDetails.isProfilePictureAvailable &&
            !this.state.isProfilePictureDownloaded
        ) {
            this.sendRequestForProfilePicture();
        }
        return (
            <NavigationContainer>
                <DetailsContext.Provider
                    value={{
                        isProfilePictureDownloaded: this.state
                            .isProfilePictureDownloaded,
                        profilePictureDetails: this.state.profilePictureDetails,
                        userDetails: this.state.userDetails,
                        handleProfilePictureRemoved: this
                            .handleProfilePictureRemoved,
                        handleProfilePictureUpdated: this
                            .handleProfilePictureUpdated,
                        apolloClient: client,
                    }}>
                    <ScreenStack.Navigator initialRouteName="screen1">
                        <ScreenStack.Screen
                            name="screen1"
                            component={AddStoryScreen}
                            options={{
                                title: 'Home',
                                headerStyle: {
                                    backgroundColor: constants.primaryColor,
                                },
                                headerTintColor: constants.headerTintColor,
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                        <ScreenStack.Screen
                            name="screen2"
                            component={ViewStoryScreen}
                            options={{
                                title: 'View Story',
                                headerStyle: {
                                    backgroundColor: constants.primaryColor,
                                },
                                headerTintColor: constants.headerTintColor,
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                        <ScreenStack.Screen
                            name="screen3"
                            component={StoryScreen}
                            options={{headerShown: false}}
                        />
                        <ScreenStack.Screen
                            name="screen4"
                            component={EndScreen}
                            options={{
                                title: 'Cheers!',
                                headerStyle: {
                                    backgroundColor: constants.primaryColor,
                                },
                                headerTintColor: constants.headerTintColor,
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </ScreenStack.Navigator>
                </DetailsContext.Provider>
            </NavigationContainer>
        );
    }
}

export default App;

/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ProfilePicture from '../../App/Components/ProfilePicture';
import DetailsContext from '../../App/DetailsContext';

const profilePictureDetails = {
    path: 'res/images/noProfilePicture.png',
    type: 'image/png',
    name: 'noProfilePicture.png',
};

it('renders correctly', () => {
    const tree = renderer
        .create(
            <DetailsContext.Provider
                value={{
                    isProfilePictureDownloaded: false,
                    profilePictureDetails,
                }}>
                <ProfilePicture
                    dimensions={{height: 200, width: 200}}
                    borderColor={'bright'}
                />
            </DetailsContext.Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

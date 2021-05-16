/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import DetailsContext from '../../App/DetailsContext';
import UserDetails from '../../App/Components/UserDetails';

const userDetails = {
    name: 'John Doe',
    occupation: 'Front End Developer',
    email: 'johndoe@gmail.com',
    website: 'www.jest.js.io',
};

it('renders correctly', () => {
    const tree = renderer
        .create(
            <DetailsContext.Provider
                value={{
                    userDetails,
                }}>
                <UserDetails />
            </DetailsContext.Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

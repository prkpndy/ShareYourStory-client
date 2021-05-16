/**
 * @format
 */

import 'react-native';
import React from 'react';
import ProgressBar from '../../App/Components/ProgressBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<ProgressBar onCompletion={() => {}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

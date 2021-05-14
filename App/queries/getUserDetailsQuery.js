import {gql} from '@apollo/client';

export default gql`
    query getUserDetails($id: ID!) {
        getUserDetails(id: $id) {
            id
            name
            occupation
            email
            website
            isProfilePictureAvailable
            profilePictureExtension
        }
    }
`;

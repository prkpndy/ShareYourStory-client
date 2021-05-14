import {gql} from '@apollo/client';

export default gql`
    mutation removeProfilePicture($id: ID!) {
        removeProfilePicture(id: $id)
    }
`;

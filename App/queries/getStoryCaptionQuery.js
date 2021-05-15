import {gql} from '@apollo/client';

export default gql`
    query getStoryCaption($id: ID!) {
        getStoryCaption(id: $id)
    }
`;

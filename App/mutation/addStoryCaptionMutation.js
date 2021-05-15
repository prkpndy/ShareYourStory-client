import {gql} from '@apollo/client';

export default gql`
    mutation addStoryCaption($id: ID!, $caption: String!) {
        addStoryCaption(id: $id, caption: $caption)
    }
`;

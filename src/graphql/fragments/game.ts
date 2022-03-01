import { gql } from '@apollo/client';

export const GameFragment = gql`
  fragment GameFragment on Games {
    id
    name
    slug
    cover {
      url
    }
    developers {
      name
    }
    price
  }
`;

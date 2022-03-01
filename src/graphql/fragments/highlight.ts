import { gql } from '@apollo/client';

export const HighlightFragment = gql`
  fragment HighlightFragment on ComponentPageHighlight {
    id
    title
    subtitle
    background {
      url
    }
    floatImage {
      url
    }
    buttonLabel
    buttonLink
    alignment
  }
`;

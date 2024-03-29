import { COLLECTION_FRAGMENT, COLLECTION_PRODUCT_FRAGMENT } from './fragments';

export const FEATURED_COLLECTIONS_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        ...Collection
      }
    }
  }
`;

export const FEATURED_COLLECTION_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...Collection
      }
    }
  }
` as const;

export const COLLECTIONS_QUERY = `#graphql
  ${COLLECTION_FRAGMENT}
  query Collections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;

export const COLLECTION_DETAILS_QUERY = `#graphql
  ${COLLECTION_PRODUCT_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
      ) {
        nodes {
          ...CollectionProduct
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ` as const;

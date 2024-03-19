import { useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Pagination, getPaginationVariables, Image } from '@shopify/hydrogen';
import type { CollectionsQuery } from 'storefrontapi.generated';
import { COLLECTIONS_QUERY } from '~/graphql/storefront';
import { CollectionsGrid } from '~/components/collections/grid';

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const { collections } = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({ collections });
};

export default function Collections() {
  const { collections }: CollectionsQuery = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Collections</h1>
      <Pagination connection={collections}>
        {({ nodes, isLoading, PreviousLink, NextLink }) => (
          <div>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>Load previous</span>}
            </PreviousLink>
            <CollectionsGrid collections={nodes} />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more</span>}
            </NextLink>
          </div>
        )}
      </Pagination>
    </div>
  );
}

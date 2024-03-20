import { useLoaderData } from '@remix-run/react';
import {
  type LoaderFunctionArgs,
  json,
  type MetaFunction,
  redirect,
} from '@shopify/remix-oxygen';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';

import { CollectionDetailsQuery } from 'storefrontapi.generated';
import { ProductGrid } from '~/components/product/grid';

import { COLLECTION_DETAILS_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';
import { PageLayout } from '~/components/common';

export const loader = async ({
  params: { handle },
  context,
  request,
}: LoaderFunctionArgs) => {
  if (!handle) {
    return redirect('/collections');
  }
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });
  const { collection }: CollectionDetailsQuery = await context.storefront.query(
    COLLECTION_DETAILS_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle,
      },
    },
  );
  if (!collection) {
    throw new Response(null, { status: 404 });
  }
  return json({
    collection,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  createMeta({
    title: data?.collection.title ?? 'Collection',
    description: data?.collection.description,
  });

export default function Collection() {
  const { collection } = useLoaderData<typeof loader>();
  return (
    <PageLayout title={collection.title} description={collection.description}>
      <Pagination connection={collection.products}>
        {({ nodes, isLoading, PreviousLink, NextLink }) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>Load previous</span>}
            </PreviousLink>
            <ProductGrid products={nodes} />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </PageLayout>
  );
}

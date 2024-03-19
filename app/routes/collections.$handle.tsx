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
    <>
      <header className='grid w-full justify-items-start gap-8 py-8'>
        <h1 className='inline-block whitespace-pre-wrap text-4xl font-bold'>
          {collection.title}
        </h1>
        {collection.description && (
          <div className='flex w-full items-baseline justify-between'>
            <div>
              <p className='inherit text-copy inline-block max-w-md whitespace-pre-wrap'>
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
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
    </>
  );
}

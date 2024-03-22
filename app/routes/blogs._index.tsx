import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';

import { BLOGS_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';
import { PageLayout, PaginationContainer } from '~/components/common';

export const loader = async ({
  request,
  context: { storefront },
}: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const { blogs } = await storefront.query(BLOGS_QUERY, {
    variables: {
      ...paginationVariables,
    },
  });

  return json({ blogs });
};

export const meta: MetaFunction = () => createMeta({ title: 'Blogs' });

export default function Blogs() {
  const { blogs } = useLoaderData<typeof loader>();

  return (
    <PageLayout title='Blogs'>
      <Pagination connection={blogs}>
        {({ nodes, isLoading, PreviousLink, NextLink }) => (
          <PaginationContainer
            isLoading={isLoading}
            PreviousLink={PreviousLink}
            NextLink={NextLink}
          >
            {nodes.map((blog) => {
              return (
                <Link
                  className='blog'
                  key={blog.handle}
                  prefetch='intent'
                  to={`/blogs/${blog.handle}`}
                >
                  <h2>{blog.title}</h2>
                </Link>
              );
            })}
          </PaginationContainer>
        )}
      </Pagination>
    </PageLayout>
  );
}

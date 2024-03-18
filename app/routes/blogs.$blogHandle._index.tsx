import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';

import { BLOG_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';
import { ArticleItem } from '~/components/blog/article-item';

export const loader = async ({
  request,
  params,
  context: { storefront },
}: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, { status: 404 });
  }

  const { blog } = await storefront.query(BLOG_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      ...paginationVariables,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 });
  }

  return json({ blog });
};

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  createMeta({
    title: data?.blog.title,
  });

export default function Blog() {
  const { blog } = useLoaderData<typeof loader>();
  const { articles } = blog;

  return (
    <div className='blog'>
      <h1>{blog.title}</h1>
      <div className='blog-grid'>
        <Pagination connection={articles}>
          {({ nodes, isLoading, PreviousLink, NextLink }) => {
            return (
              <>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
                {nodes.map((article, index) => {
                  return (
                    <ArticleItem
                      article={article}
                      key={article.id}
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  );
                })}
                <NextLink>
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink>
              </>
            );
          }}
        </Pagination>
      </div>
    </div>
  );
}

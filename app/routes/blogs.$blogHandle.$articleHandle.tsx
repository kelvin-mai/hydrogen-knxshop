import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Image } from '@shopify/hydrogen';

import { ARTICLE_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';
import { RawHtml } from '~/components/common';

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { blogHandle, articleHandle } = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 });
  }

  const { blog } = await context.storefront.query(ARTICLE_QUERY, {
    variables: { blogHandle, articleHandle },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  const article = blog.articleByHandle;

  return json({ article });
}

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  createMeta({
    title: data?.article.title,
  });

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  const { title, image, contentHtml, author } = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div>
      <h1 className='py-4 text-3xl font-bold'>
        {title}
        <span>
          {publishedDate} &middot; {author?.name}
        </span>
      </h1>
      {image && <Image data={image} sizes='90vw' loading='eager' />}
      <RawHtml html={contentHtml} />
    </div>
  );
}

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { PageQuery } from 'storefrontapi.generated';
import { PAGE_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';
import { RawHtml } from '~/components/common';

export async function loader({ params, context }: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const { page }: PageQuery = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ page });
}

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  createMeta({
    title: data?.page.title,
  });

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <div className='page'>
      <header>
        <h1>{page.title}</h1>
      </header>
      <main>
        <RawHtml html={page.body} />
      </main>
    </div>
  );
}

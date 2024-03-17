import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { SITEMAP_QUERY } from '~/graphql/storefront';
import { MAX_URLS, generateSitemap } from '~/lib/sitemap';

export async function loader({
  request,
  context: { storefront },
}: LoaderFunctionArgs) {
  const data = await storefront.query(SITEMAP_QUERY, {
    variables: {
      urlLimits: MAX_URLS,
      language: storefront.i18n.language,
    },
  });

  if (!data) {
    throw new Response('No data found', { status: 404 });
  }

  const sitemap = generateSitemap({
    data,
    baseUrl: new URL(request.url).origin,
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',

      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { parseGid } from '@shopify/hydrogen';

import { ROBOTS_QUERY } from '~/graphql/storefront';
import { robotsTxtData } from '~/lib/robots';

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const { shop } = await context.storefront.query(ROBOTS_QUERY);

  const shopId = parseGid(shop.id).id;
  const body = robotsTxtData({ url: url.origin, shopId });

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',

      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
};

import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  throw new Response(`${new URL(request.url).pathname} not found`, {
    status: 404,
  });
};

export default function CatchAll() {
  return null;
}

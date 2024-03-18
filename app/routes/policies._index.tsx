import { useLoaderData, Link, MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { POLICIES_QUERY } from '~/graphql/storefront/policy';
import { createMeta } from '~/lib/meta';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const data = await context.storefront.query(POLICIES_QUERY);
  const policies = Object.values(data.shop || {});

  if (!policies.length) {
    throw new Response('No policies found', { status: 404 });
  }

  return json({ policies });
};

export const meta: MetaFunction = () =>
  createMeta({
    title: 'Policies',
  });

export default function Policies() {
  const { policies } = useLoaderData<typeof loader>();

  return (
    <div className='policies'>
      <h1>Policies</h1>
      <div>
        {policies.map((policy) => {
          if (!policy) return null;
          return (
            <fieldset key={policy.id}>
              <Link to={`/policies/${policy.handle}`}>{policy.title}</Link>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}

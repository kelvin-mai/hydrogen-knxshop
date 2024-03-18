import { Link, useLoaderData } from '@remix-run/react';
import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import { Image } from '@shopify/hydrogen';

import { FeaturedCollectionQuery } from 'storefrontapi.generated';
import { FEATURED_COLLECTIONS_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { collections }: FeaturedCollectionQuery =
    await context.storefront.query(FEATURED_COLLECTIONS_QUERY);
  return defer({ collections });
};

export const meta: MetaFunction = () =>
  createMeta({ description: 'A custom storefront by Hydrogen' });

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  return (
    <section className='w-full gap-4'>
      <h2 className='text-lead max-w-prose whitespace-pre-wrap font-bold'>
        Collections
      </h2>
      <div className='grid grid-flow-row grid-cols-1 gap-2 gap-y-6 sm:grid-cols-3 md:gap-4 lg:gap-6'>
        {collections.nodes.map((c) => (
          <Link key={c.id} to={`/collections/${c.handle}`}>
            <div className='grid gap-4'>
              {c.image && (
                <Image
                  key={c.id}
                  alt={`Image of ${c.title}`}
                  data={c.image}
                  sizes='(max-width: 32rem) 100vw, 33vw'
                  crop='center'
                />
              )}
              <h2 className='text-copy max-w-prose whitespace-pre-wrap font-medium'>
                {c.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

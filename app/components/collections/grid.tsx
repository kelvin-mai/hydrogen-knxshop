import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';

import { CollectionFragment } from 'storefrontapi.generated';

type CollectionsGridProps = {
  collections: CollectionFragment[];
};

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
}) => {
  return (
    <div className='grid grid-cols-4 gap-2'>
      {collections.map((c, i) => (
        <Link key={c.id} to={`/collections/${c.handle}`} prefetch='intent'>
          {c.image && (
            <Image
              alt={c.image.altText || c.title}
              aspectRatio='1/1'
              data={c.image}
              loading={i < 3 ? 'eager' : undefined}
            />
          )}
          <h5>{c.title}</h5>
        </Link>
      ))}
    </div>
  );
};

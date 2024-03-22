import { Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';

import { CollectionProductFragment } from 'storefrontapi.generated';

type ProductCardProps = {
  product: CollectionProductFragment;
  loading?: 'eager';
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  loading,
}) => {
  const { price, compareAtPrice } = product.variants?.nodes[0] || {};
  const isDiscounted = (compareAtPrice?.amount ?? 0) > price?.amount;
  return (
    <Link to={`/products/${product.handle}`}>
      <div className='grid gap-6'>
        <div className='relative rounded shadow-sm'>
          {isDiscounted && (
            <label className='text-notice absolute right-0 top-0 m-4 text-right text-xs text-red-600 subpixel-antialiased'>
              Sale
            </label>
          )}
          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
            loading={loading}
          />
        </div>
        <div className='grid gap-1'>
          <h3 className='w-full max-w-prose overflow-hidden text-ellipsis whitespace-nowrap font-semibold'>
            {product.title}
          </h3>
          <div className='inherit text-copy flex max-w-prose gap-4 whitespace-pre-wrap'>
            <Money withoutTrailingZeros data={price} />
            {isDiscounted && (
              <Money
                className='line-through opacity-50'
                withoutTrailingZeros
                data={compareAtPrice}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

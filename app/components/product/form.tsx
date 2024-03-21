import { FetcherWithComponents, Link } from '@remix-run/react';
import { CartForm, ShopPayButton, VariantSelector } from '@shopify/hydrogen';

import {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import { cn } from '~/lib/classname';
import { AddToCart } from './add-to-cart';

type ProductFormProps = {
  product: ProductFragment;
  variants: ProductVariantFragment[];
  analytics?: unknown;
  storeDomain?: string;
};

export const ProductForm: React.FC<ProductFormProps> = ({
  analytics,
  product,
  variants,
  storeDomain,
}) => {
  return (
    <div className='flex flex-col gap-2 pt-4'>
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({ option }) => (
          <div key={option.name}>
            <h5 className='text-lg font-bold'>{option.name}</h5>
            <div className='flex flex-wrap gap-2'>
              {option.values.map(({ value, isAvailable, isActive, to }) => (
                <Link
                  key={option.name + value}
                  prefetch='intent'
                  preventScrollReset
                  replace
                  to={to}
                  className={cn(
                    'rounded border-2 px-2',
                    isActive
                      ? 'border-mantis-500 bg-mantis-100'
                      : 'border-transparent',
                    isAvailable ? 'opacity-100' : 'opacity-30',
                  )}
                >
                  {value}
                </Link>
              ))}
            </div>
          </div>
        )}
      </VariantSelector>
      <CartForm
        route='/cart'
        inputs={{
          lines: product.selectedVariant
            ? [{ merchandiseId: product.selectedVariant.id, quantity: 1 }]
            : [],
        }}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher: FetcherWithComponents<any>) => (
          <AddToCart
            product={product}
            analytics={analytics}
            fetcher={fetcher}
          />
        )}
      </CartForm>
      {product.selectedVariant?.availableForSale && storeDomain && (
        <ShopPayButton
          width='100%'
          className='overflow-hidden rounded-md'
          variantIds={[product.selectedVariant.id]}
          storeDomain={storeDomain}
        />
      )}
    </div>
  );
};

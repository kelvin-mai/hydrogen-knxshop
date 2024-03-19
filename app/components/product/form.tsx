import { FetcherWithComponents, Link } from '@remix-run/react';
import { CartForm, VariantSelector } from '@shopify/hydrogen';
import {
  ProductFragment,
  ProductVariantFragment,
} from 'storefrontapi.generated';
import { cn } from '~/lib/classname';

type ProductFormProps = {
  product: ProductFragment;
  variants: ProductVariantFragment[];
  analytics?: unknown;
};

export const ProductForm: React.FC<ProductFormProps> = ({
  analytics,
  product,
  variants,
}) => {
  return (
    <div>
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({ option }) => (
          <div key={option.name}>
            <h5>{option.name}</h5>
            <div>
              {option.values.map(({ value, isAvailable, isActive, to }) => (
                <Link
                  key={option.name + value}
                  prefetch='intent'
                  preventScrollReset
                  replace
                  to={to}
                  className={cn(
                    isActive
                      ? 'border border-black'
                      : 'border border-transparent',
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
          <>
            <input
              name='analytics'
              type='hidden'
              value={JSON.stringify(analytics)}
            />
            <button
              onClick={() => {}}
              disabled={
                !product.selectedVariant ||
                !product.selectedVariant.availableForSale ||
                fetcher.state !== 'idle'
              }
            >
              {product.selectedVariant?.availableForSale
                ? 'Add to cart'
                : 'Sold out'}
            </button>
          </>
        )}
      </CartForm>
    </div>
  );
};

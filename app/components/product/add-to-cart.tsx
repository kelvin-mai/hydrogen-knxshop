import { FetcherWithComponents } from '@remix-run/react';
import { useEffect } from 'react';

import { ProductFragment } from 'storefrontapi.generated';
import { Button } from '~/components/ui';
import { useAside } from '~/context/aside';

type AddToCartProps = {
  analytics?: unknown;
  product: ProductFragment;
  fetcher: FetcherWithComponents<any>;
};

export const AddToCart: React.FC<AddToCartProps> = ({
  product,
  analytics,
  fetcher,
}) => {
  const {
    cart: { open, setOpen },
  } = useAside();
  useEffect(() => {
    if (fetcher.state === 'loading') {
      setOpen(true);
    }
  }, [open, fetcher]);
  return (
    <>
      <input name='analytics' type='hidden' value={JSON.stringify(analytics)} />
      <Button
        className='text-md w-full'
        onClick={() => {}}
        disabled={
          !product.selectedVariant ||
          !product.selectedVariant.availableForSale ||
          fetcher.state !== 'idle'
        }
      >
        {product.selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </Button>
    </>
  );
};

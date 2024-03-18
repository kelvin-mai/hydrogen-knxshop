import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import { CartApiQueryFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import { CartLinePrice } from './line-price';
import { CartLineQuantity } from './line-quantity';

type CartLine = CartApiQueryFragment['lines']['nodes'][0];

type CartLineItemProps = {
  line: CartLine;
};

export const CartLineItem: React.FC<CartLineItemProps> = ({ line }) => {
  const { merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  return (
    <li className='flex gap-4'>
      {image && (
        <Image
          className='h-[100px] w-[100px]'
          alt={title}
          aspectRatio='1/1'
          data={image}
          height={100}
          width={100}
          loading='lazy'
        />
      )}
      <div className='flex-grow'>
        <Link prefetch='intent' to={lineItemUrl}>
          <p>
            <strong>{product.title}</strong>
          </p>
        </Link>
        <CartLinePrice line={line} />
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} />
      </div>
    </li>
  );
};

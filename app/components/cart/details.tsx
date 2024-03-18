import { Money } from '@shopify/hydrogen';

import { CartApiQueryFragment } from 'storefrontapi.generated';
import { Button } from '~/components/ui';
import { CartDiscounts } from './discounts';
import { CartLineItem } from './line-item';

type CartDetailsProps = {
  cart: CartApiQueryFragment;
};

export const CartDetails: React.FC<CartDetailsProps> = ({ cart }) => {
  return (
    <div>
      <div aria-labelledby='cart-lines'>
        <ul>
          {cart.lines.nodes.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </ul>
      </div>
      <div aria-labelledby='cart-summary space-y-2 mt-auto'>
        <h4 className='text-lg font-semibold'>Totals</h4>
        <dl className='flex justify-between'>
          <dt>Subtotal</dt>
          <dd>
            {cart.cost.subtotalAmount.amount ? (
              <Money data={cart.cost.subtotalAmount} />
            ) : (
              <span> - </span>
            )}
          </dd>
        </dl>
        <CartDiscounts discountCodes={cart.discountCodes} />
        <a href={cart.checkoutUrl} target='_self'>
          <Button className='mt-2 w-full'>Continue to Checkout</Button>
        </a>
      </div>
    </div>
  );
};

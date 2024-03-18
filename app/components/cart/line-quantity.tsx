import { CartForm } from '@shopify/hydrogen';
import { Plus, Minus } from 'lucide-react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';

import { Button } from '~/components/ui';

type CartLine = CartApiQueryFragment['lines']['nodes'][0];

type CartLineQuantityProps = {
  line: CartLine;
};

export const CartLineQuantity: React.FC<CartLineQuantityProps> = ({
  line,
}: {
  line: CartLine;
}) => {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div>
      <small>Quantity: {quantity}</small>
      <div className='flex justify-between'>
        <CartForm
          route='/cart'
          action={CartForm.ACTIONS.LinesUpdate}
          inputs={{ lines: [{ id: lineId, quantity: prevQuantity }] }}
        >
          <button
            aria-label='Decrease quantity'
            disabled={quantity <= 1}
            name='decrease-quantity'
            value={prevQuantity}
          >
            <Minus />
          </button>
        </CartForm>
        <CartForm
          route='/cart'
          action={CartForm.ACTIONS.LinesUpdate}
          inputs={{ lines: [{ id: lineId, quantity: nextQuantity }] }}
        >
          <button
            aria-label='Increase quantity'
            name='increase-quantity'
            value={nextQuantity}
          >
            <Plus />
          </button>
        </CartForm>
        <CartForm
          route='/cart'
          action={CartForm.ACTIONS.LinesRemove}
          inputs={{ lineIds: [lineId] }}
        >
          <Button type='submit'>Remove</Button>
        </CartForm>
      </div>
    </div>
  );
};

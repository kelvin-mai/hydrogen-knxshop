import { CartForm } from '@shopify/hydrogen';

import { CartApiQueryFragment } from 'storefrontapi.generated';
import { cn } from '~/lib/classname';
import { Button, Input } from '~/components/ui';

type CartDiscountsProps = {
  discountCodes: CartApiQueryFragment['discountCodes'];
};

type DiscountFormProps = React.PropsWithChildren & {
  discountCodes?: string[];
};

export const UpdateDiscountForm: React.FC<DiscountFormProps> = ({
  discountCodes,
  children,
}) => (
  <CartForm
    route='/cart'
    action={CartForm.ACTIONS.DiscountCodesUpdate}
    inputs={{
      discountCodes: discountCodes || [],
    }}
  >
    {children}
  </CartForm>
);

export const CartDiscounts: React.FC<CartDiscountsProps> = ({
  discountCodes,
}) => {
  const codes =
    discountCodes?.filter((d) => d.applicable).map(({ code }) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl className={cn(codes.length || 'hidden')}>
        <div>
          <dt>Discount(s)</dt>
          <CartForm
            route='/cart'
            action={CartForm.ACTIONS.DiscountCodesUpdate}
            inputs={{
              discountCodes: [],
            }}
          >
            <code>{codes?.join(', ')}</code>
            <button>Remove</button>
          </CartForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <CartForm
        route='/cart'
        action={CartForm.ACTIONS.DiscountCodesUpdate}
        inputs={{
          discountCodes: codes,
        }}
      >
        <div className='flex items-center gap-2'>
          <Input type='text' name='discountCode' placeholder='Discount code' />
          <Button type='submit'>Apply</Button>
        </div>
      </CartForm>
    </div>
  );
};

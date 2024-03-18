import { ShoppingCart } from 'lucide-react';
import { CartApiQueryFragment } from 'storefrontapi.generated';

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui';
import { cn } from '~/lib/classname';
import { CartDetails } from './details';

type CartAsideProps = {
  cart: CartApiQueryFragment;
};

export const CartAside: React.FC<CartAsideProps> = ({ cart }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='relative p-2'>
          <ShoppingCart />
          <div
            className={cn(
              'absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-sm text-white',
              cart.totalQuantity > 0 || 'hidden',
            )}
          >
            {cart.totalQuantity || 0}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {cart.totalQuantity > 0
              ? 'Order Summary'
              : `Looks like you haven't added anything yet, let's get you started!`}
          </SheetDescription>
        </SheetHeader>
        {cart.totalQuantity > 0 ? (
          <CartDetails cart={cart} />
        ) : (
          <SheetClose asChild>
            <Button className='w-full'>Continue Shopping</Button>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
};

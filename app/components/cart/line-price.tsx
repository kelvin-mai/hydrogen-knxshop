import { Money } from '@shopify/hydrogen';
import type { CartApiQueryFragment } from 'storefrontapi.generated';

type CartLine = CartApiQueryFragment['lines']['nodes'][0];

type CartLinePriceProps = {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
};

export const CartLinePrice: React.FC<CartLinePriceProps> = ({
  line,
  priceType = 'regular',
  ...props
}) => {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...props} data={moneyV2} />;
};

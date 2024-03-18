import { redirect } from '@shopify/remix-oxygen';

export const loader = () => {
  return redirect('/account/orders');
};

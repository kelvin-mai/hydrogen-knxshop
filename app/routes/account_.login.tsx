import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export const loader = ({ context }: LoaderFunctionArgs) => {
  return context.customerAccount.login();
};

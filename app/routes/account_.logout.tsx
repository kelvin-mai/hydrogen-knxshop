import { redirect, type ActionFunctionArgs } from '@shopify/remix-oxygen';

// if we dont implement this, /account/logout will get caught by account.$.tsx to do login
export const loader = () => {
  return redirect('/');
};

export const action = ({ context }: ActionFunctionArgs) => {
  return context.customerAccount.logout();
};

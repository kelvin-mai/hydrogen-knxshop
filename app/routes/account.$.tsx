import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';

// fallback wild card for all unauthenticated routes in account section
export const loader = async ({ context }: LoaderFunctionArgs) => {
  await context.customerAccount.handleAuthStatus();

  return redirect('/account', {
    headers: {
      'Set-Cookie': await context.session.commit(),
    },
  });
};
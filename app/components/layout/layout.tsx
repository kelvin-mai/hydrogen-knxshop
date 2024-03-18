import { Suspense } from 'react';
import { Await } from '@remix-run/react';

import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Footer } from './footer';
import { Header } from './header';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
};

export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
}: LayoutProps) {
  return (
    <>
      {header && <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />}
      <main className='container'>{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
        </Await>
      </Suspense>
    </>
  );
}

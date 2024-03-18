import { Await } from '@remix-run/react';
import { Suspense } from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Aside } from './aside';
import { Footer } from './footer';
import { Header, HeaderMenu } from './header';
import { CartMain } from './cart';
import { PredictiveSearchForm, PredictiveSearchResults } from './search';

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
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside menu={header?.menu} shop={header?.shop} />
      {header && <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />}
      <main>{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
        </Await>
      </Suspense>
    </>
  );
}

function CartAside({ cart }: { cart: LayoutProps['cart'] }) {
  return (
    <Aside id='cart-aside' heading='CART'>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout='aside' />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id='search-aside' heading='SEARCH'>
      <div className='predictive-search'>
        <br />
        <PredictiveSearchForm>
          {({ fetchResults, inputRef }) => (
            <div>
              <input
                name='q'
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder='Search'
                ref={inputRef}
                type='search'
              />
              &nbsp;
              <button
                onClick={() => {
                  window.location.href = inputRef?.current?.value
                    ? `/search?q=${inputRef.current.value}`
                    : `/search`;
                }}
              >
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  menu,
  shop,
}: {
  menu: HeaderQuery['menu'];
  shop: HeaderQuery['shop'];
}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id='mobile-menu-aside' heading='MENU'>
        <HeaderMenu
          menu={menu}
          viewport='mobile'
          primaryDomainUrl={shop.primaryDomain.url}
        />
      </Aside>
    )
  );
}
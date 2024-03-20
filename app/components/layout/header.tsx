import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { Menu, ShoppingCart } from 'lucide-react';

import { FALLBACK_HEADER_MENU } from '~/constants/fallbacks';
import type { LayoutProps } from './layout';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui';
import { NavItem } from './nav-item';
import { CartAside } from '~/components/cart';
import { SearchForm } from '../search';
import { HeaderMenu } from './header-menu';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

export function Header({ header, isLoggedIn, cart }: HeaderProps) {
  const { shop, menu } = header;
  const menuItems = (menu || FALLBACK_HEADER_MENU).items.map((i) => (
    <NavItem
      key={i.id}
      url={i.url}
      title={i.title}
      primaryDomainUrl={shop.primaryDomain.url}
      className='py-2 text-lg'
    />
  ));
  return (
    <header>
      <div className='container'>
        <div className='flex items-center justify-between pt-2'>
          <NavLink prefetch='intent' to='/' end>
            <img
              src='/assets/logo.webp'
              alt='Brand Logo'
              className='h-[65px]'
            />
          </NavLink>
          <Sheet>
            <SheetTrigger className='sm:hidden'>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col'>{menuItems}</div>
            </SheetContent>
          </Sheet>
          <div className='hidden md:block'>
            <SearchForm />
          </div>
          <div className='flex items-center'>
            <NavLink prefetch='intent' to='/account'>
              <Suspense fallback='Sign in'>
                <Await resolve={isLoggedIn} errorElement='Sign in'>
                  {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
                </Await>
              </Suspense>
            </NavLink>
            <Suspense fallback={<ShoppingCart />}>
              <Await resolve={cart}>
                {(cart) => <CartAside cart={cart} />}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
      <nav className='bg-slate-200 py-2' role='navigation'>
        <div className='container'>
          <HeaderMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
        </div>
      </nav>
    </header>
  );
}

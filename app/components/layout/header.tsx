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
      <div className='flex items-center justify-between px-8 pt-2'>
        <NavLink prefetch='intent' to='/' end>
          <img src='/assets/logo.webp' alt='Brand Logo' className='h-[65px]' />
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
        <SearchForm />
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
              {(cart) => (cart ? <CartAside cart={cart} /> : null)}
            </Await>
          </Suspense>
        </div>
      </div>
      <nav className='hidden bg-slate-200 sm:block' role='navigation'>
        <div className='container flex gap-2'>{menuItems}</div>
      </nav>
    </header>
  );
}

import { Await } from '@remix-run/react';
import { Suspense } from 'react';
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

// function SearchAside() {
//   return (
//     <Aside id='search-aside' heading='SEARCH'>
//       <div className='predictive-search'>
//         <br />
//         <PredictiveSearchForm>
//           {({ fetchResults, inputRef }) => (
//             <div>
//               <input
//                 name='q'
//                 onChange={fetchResults}
//                 onFocus={fetchResults}
//                 placeholder='Search'
//                 ref={inputRef}
//                 type='search'
//               />
//               &nbsp;
//               <button
//                 onClick={() => {
//                   window.location.href = inputRef?.current?.value
//                     ? `/search?q=${inputRef.current.value}`
//                     : `/search`;
//                 }}
//               >
//                 Search
//               </button>
//             </div>
//           )}
//         </PredictiveSearchForm>
//         <PredictiveSearchResults />
//       </div>
//     </Aside>
//   );
// }

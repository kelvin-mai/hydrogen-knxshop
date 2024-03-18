import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { FALLBACK_FOOTER_MENU } from '~/constants/fallbacks';
import { PaymentList } from '~/components/common';
import { NavItem } from './nav-item';

type FooterProps = FooterQuery & {
  shop: HeaderQuery['shop'];
};

export const Footer: React.FC<FooterProps> = ({ menu, shop }) => {
  const today = new Date();
  return (
    <footer className='mt-auto bg-black pb-4 text-white'>
      <div className='container'>
        {menu && shop?.primaryDomain?.url && (
          <div className='flex items-center gap-4 p-4' role='navigation'>
            {(menu || FALLBACK_FOOTER_MENU).items.map((i) => (
              <NavItem
                key={i.id}
                url={i.url}
                title={i.title}
                primaryDomainUrl={shop.primaryDomain.url}
              />
            ))}
          </div>
        )}
        <PaymentList />
        <div className='pt-4 text-center text-sm'>
          <p className='inline-flex items-center'>
            © {today.getFullYear()} Seeland Jung USA |{' '}
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://kelvinmai.io'
            >
              Kelvin Mai
            </a>
          </p>
          <p>
            Powered by{' '}
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.shopify.com/?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore'
            >
              Shopify
            </a>{' '}
            and{' '}
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://hydrogen.shopify.dev/'
            >
              Hydrogen
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { PaymentList } from '~/components/common';
import { FooterMenu } from './footer-menu';

type FooterProps = FooterQuery & {
  shop: HeaderQuery['shop'];
};

export const Footer: React.FC<FooterProps> = ({ menu, shop }) => {
  const today = new Date();
  return (
    <footer className='pb-4'>
      <FooterMenu menu={menu} primaryDomainUrl={shop?.primaryDomain?.url} />
      <div className='text-center text-sm text-slate-500'>
        <PaymentList className='py-4' />
        <p>
          © {today.getFullYear()} Seeland Jung USA |{' '}
          <a
            rel='noopener noreferrer'
            target='_blank'
            className='hover:underline'
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
            className='hover:underline'
            href='https://www.shopify.com/?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore'
          >
            Shopify
          </a>{' '}
          and{' '}
          <a
            rel='noopener noreferrer'
            target='_blank'
            className='hover:underline'
            href='https://hydrogen.shopify.dev/'
          >
            Hydrogen
          </a>
        </p>
      </div>
    </footer>
  );
};

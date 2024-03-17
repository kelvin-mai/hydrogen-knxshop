import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { FooterMenu } from './menu';
import { PaymentList } from './payment-list';

type FooterProps = FooterQuery & {
  shop: HeaderQuery['shop'];
};

export const Footer: React.FC<FooterProps> = ({ menu, shop }) => {
  const today = new Date();
  return (
    <footer className='mt-auto bg-black pb-4 text-white'>
      <div className='container'>
        {menu && shop?.primaryDomain?.url && (
          <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
        )}
        <PaymentList />
        <div className='text-center text-sm'>
          <p className='inline-flex items-center'>
            © {today.getFullYear()} Seeland Jung USA |{' '}
            <a
              className='text-white'
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
              className='text-white'
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.shopify.com/?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore'
            >
              Shopify
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

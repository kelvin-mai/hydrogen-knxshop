import { NavLink } from '@remix-run/react';

import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { useRootLoaderData } from '~/root';
import { FALLBACK_FOOTER_MENU } from '~/constants/fallbacks';
import { cn } from '~/lib/classname';

type FooterMenuProps = {
  menu: FooterQuery['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
};

export const FooterMenu: React.FC<FooterMenuProps> = ({
  menu,
  primaryDomainUrl,
}) => {
  const { publicStoreDomain } = useRootLoaderData();

  return (
    <nav className='flex items-center gap-4 p-4' role='navigation'>
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel='noopener noreferrer' target='_blank'>
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch='intent'
            className={({ isActive, isPending }) =>
              cn(
                isActive && 'font-bold',
                isPending ? 'text-slate-500' : 'text-inherit',
              )
            }
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
};

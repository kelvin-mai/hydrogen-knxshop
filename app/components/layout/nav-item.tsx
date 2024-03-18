import { NavLink } from '@remix-run/react';

import { cn } from '~/lib/classname';
import { useRootLoaderData } from '~/root';

type NavItemProps = {
  className?: string;
  activeClass?: string;
  pendingClass?: string;
  url?: string | null;
  title: string;
  primaryDomainUrl: string;
};

export const NavItem: React.FC<NavItemProps> = ({
  className,
  activeClass = 'font-bold',
  pendingClass = 'text-slate-500',
  url,
  title,
  primaryDomainUrl,
}) => {
  if (!url) return null;
  // if the url is internal, we strip the domain
  const { publicStoreDomain } = useRootLoaderData();

  const to =
    url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url;
  const isExternal = !to.startsWith('/');
  return isExternal ? (
    <a
      href={to}
      rel='noopener noreferrer'
      target='_blank'
      className={className}
    >
      {title}
    </a>
  ) : (
    <NavLink
      end
      prefetch='intent'
      className={({ isActive, isPending }) =>
        cn(
          isActive && activeClass,
          isPending ? pendingClass : 'text-inherit',
          className,
        )
      }
      to={to}
    >
      {title}
    </NavLink>
  );
};

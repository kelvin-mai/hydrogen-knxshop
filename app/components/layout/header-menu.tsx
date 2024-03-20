import { MenuFragment } from 'storefrontapi.generated';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '~/components/ui';
import { NavItem } from './nav-item';
import { cn } from '~/lib/classname';

type HeaderMenuProps = {
  menu?: MenuFragment | null;
  primaryDomainUrl?: string;
};

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  menu,
  primaryDomainUrl,
}) => {
  if (!menu || !primaryDomainUrl) {
    return null;
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menu.items.map((i) =>
          i.items.length === 0 ? (
            <NavigationMenuItem key={i.id}>
              <NavItem
                key={i.id}
                url={i.url}
                title={i.title}
                primaryDomainUrl={primaryDomainUrl}
                className={navigationMenuTriggerStyle()}
              />
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={i.id}>
              <NavigationMenuTrigger>{i.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[600px] gap-2'>
                  {i.items.map((ii) => (
                    <li key={ii.id}>
                      <NavItem
                        url={ii.url}
                        title={ii.title}
                        primaryDomainUrl={primaryDomainUrl}
                        className={cn(navigationMenuTriggerStyle(), 'w-full')}
                        activeClass='bg-slate-100/50'
                      />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

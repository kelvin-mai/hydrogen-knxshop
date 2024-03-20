import { MenuFragment } from 'storefrontapi.generated';
import { NavItem } from './nav-item';

type FooterMenuProps = {
  menu?: MenuFragment | null;
  primaryDomainUrl?: string;
};

export const FooterMenu: React.FC<FooterMenuProps> = ({
  menu,
  primaryDomainUrl,
}) => {
  if (!menu || !primaryDomainUrl) {
    return null;
  }
  return (
    <nav
      className='from-mantis-500 to-mantis-700 bg-gradient-to-br p-4 text-white'
      role='navigation'
    >
      <ul className='container flex items-start gap-8'>
        {menu.items.map((i) =>
          i.items.length === 0 ? (
            <li key={i.id}>
              <NavItem
                url={i.url}
                title={i.title}
                primaryDomainUrl={primaryDomainUrl}
              />
            </li>
          ) : (
            <li className='flex flex-col' key={i.id}>
              <p className='font-semibold'>{i.title}</p>
              <ul>
                {i.items.map((ii) => (
                  <li key={ii.id}>
                    <NavItem
                      url={ii.url}
                      title={ii.title}
                      primaryDomainUrl={primaryDomainUrl}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

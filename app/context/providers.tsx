import { AsideProvider } from './aside';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AsideProvider>{children}</AsideProvider>;
};

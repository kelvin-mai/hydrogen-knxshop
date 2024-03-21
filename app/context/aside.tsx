import { createContext, useContext, useState } from 'react';

type AsideContext = {
  cart: { open: boolean; setOpen: (b: boolean) => void };
};

const initialState: AsideContext = {
  cart: { open: false, setOpen: (b) => {} },
};

export const asideContext = createContext<AsideContext>(initialState);

export const AsideProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <asideContext.Provider value={{ cart: { open, setOpen } }}>
      {children}
    </asideContext.Provider>
  );
};

export const useAside = () => useContext(asideContext);

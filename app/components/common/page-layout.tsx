type PageLayoutProps = React.PropsWithChildren & {
  title?: string;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className='min-h-[75vh]'>
      {title && (
        <header>
          <h1 className='py-4 text-4xl font-bold'>{title}</h1>
        </header>
      )}
      {children}
    </div>
  );
};

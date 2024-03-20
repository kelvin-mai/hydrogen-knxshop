type PageLayoutProps = React.PropsWithChildren & {
  title?: string;
  description?: string;
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className='min-h-[75vh]'>
      {title && (
        <header>
          <h1 className='py-4 text-4xl font-bold'>{title}</h1>
          {description && <p>{description}</p>}
        </header>
      )}
      {children}
    </div>
  );
};

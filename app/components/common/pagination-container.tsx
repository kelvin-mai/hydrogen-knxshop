import { LinkProps } from '@remix-run/react';

import { Button } from '~/components/ui';

type PaginationContainerProps = React.PropsWithChildren & {
  isLoading: boolean;
  NextLink: React.FC<
    Omit<LinkProps, 'to'> & {
      ref?: React.Ref<HTMLAnchorElement>;
    }
  >;
  PreviousLink: React.FC<
    Omit<LinkProps, 'to'> & {
      ref?: React.Ref<HTMLAnchorElement>;
    }
  >;
};

export const PaginationContainer: React.FC<PaginationContainerProps> = ({
  isLoading,
  PreviousLink,
  NextLink,
  children,
}) => {
  const buttonClassname = 'w-full my-4';
  return (
    <>
      <PreviousLink>
        {isLoading ? (
          'Loading...'
        ) : (
          <Button className={buttonClassname} variant='ghost'>
            Load previous
          </Button>
        )}
      </PreviousLink>
      {children}
      <NextLink>
        {isLoading ? (
          'Loading...'
        ) : (
          <Button className={buttonClassname} variant='ghost'>
            Load more
          </Button>
        )}
      </NextLink>
    </>
  );
};

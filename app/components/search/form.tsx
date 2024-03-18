import { useEffect, useRef } from 'react';

import { Form } from '@remix-run/react';
import { Input, Button } from '~/components/ui';

export const SearchForm = ({ searchTerm }: { searchTerm: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // focus the input when cmd+k is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Form method='get' className='flex gap-4'>
      <Input
        defaultValue={searchTerm}
        name='q'
        placeholder='Search…'
        ref={inputRef}
        type='search'
      />
      <Button type='submit'>Search</Button>
    </Form>
  );
};

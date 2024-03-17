import type { MetaFunction } from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => {
  return [
    { title: 'Hydrogen' },
    { description: 'A custom storefront by Hydrogen' },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Hello from the home page!</h1>
    </div>
  );
}

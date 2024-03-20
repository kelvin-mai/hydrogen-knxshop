import type { CollectionProductFragment } from 'storefrontapi.generated';
import { ProductCard } from './card';

type ProductGridProps = {
  products: CollectionProductFragment[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className='grid grid-cols-4 gap-2'>
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          loading={i < 8 ? 'eager' : undefined}
        />
      ))}
    </div>
  );
};

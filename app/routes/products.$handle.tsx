import { Suspense } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Money, getSelectedProductOptions } from '@shopify/hydrogen';
import type { SelectedOption } from '@shopify/hydrogen/storefront-api-types';

import { PRODUCT_QUERY, VARIANTS_QUERY } from '~/graphql/storefront';
import { redirectToFirstVariant } from '~/lib/variants';
import { createMeta } from '~/lib/meta';
import { PageLayout, RawHtml } from '~/components/common';
import { ProductForm } from '~/components/product';

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const { shop, product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle, selectedOptions },
  });

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({ product, request });
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: { handle },
  });

  return defer({ shop, product, variants });
}

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  createMeta({ title: data?.product.title });

export default function Product() {
  const { shop, product, variants } = useLoaderData<typeof loader>();
  const { selectedVariant } = product;
  return (
    <PageLayout title={product.title}>
      <div className='grid grid-cols-2 gap-4'>
        {selectedVariant?.image && (
          <Image
            alt={selectedVariant.image.altText || 'Product Image'}
            aspectRatio='1/1'
            data={selectedVariant.image}
            key={selectedVariant.image.id}
            sizes='(min-width: 45em) 50vw, 100vw'
          />
        )}
        <div>
          <h1 className='pb-4 text-xl font-bold'>{product.title}</h1>
          <>
            {selectedVariant?.compareAtPrice ? (
              <div className='text-lg'>
                <p>Sale</p>
                <div>
                  {selectedVariant ? (
                    <Money data={selectedVariant.price} />
                  ) : null}
                  <s>
                    <Money data={selectedVariant.compareAtPrice} />
                  </s>
                </div>
              </div>
            ) : (
              selectedVariant?.price && (
                <div className='text-lg'>
                  <Money data={selectedVariant?.price} />
                </div>
              )
            )}
          </>
          <Suspense fallback={<ProductForm product={product} variants={[]} />}>
            <Await
              errorElement='There was a problem loading product variants'
              resolve={variants}
            >
              {(data) => (
                <ProductForm
                  product={product}
                  variants={data.product?.variants.nodes || []}
                  storeDomain={shop.primaryDomain.url}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      {product.descriptionHtml && (
        <>
          <h2 className='py-2 text-xl font-bold'>Description</h2>
          <RawHtml html={product.descriptionHtml} />
        </>
      )}
    </PageLayout>
  );
}

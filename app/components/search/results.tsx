import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import { Image, Pagination } from '@shopify/hydrogen';

import { SearchQuery } from 'storefrontapi.generated';
import { applyTrackingParams } from '~/lib/search';
import { PaginationContainer } from '~/components/common';

type SearchResultsProps = {
  results: SearchQuery | null;
  searchTerm: string;
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchTerm,
}) => {
  if (!results) {
    return null;
  }
  return (
    <div className='grid grid-cols-[1fr_2fr]'>
      <div>
        <h2>Pages</h2>
        {results.pages.nodes.map((p) => (
          <div key={p.id}>
            <Link prefetch='intent' to={`/pages/${p.handle}`}>
              {p.title}
            </Link>
          </div>
        ))}
        <hr />
        <h2>Articles</h2>
        {results.articles.nodes.map((a) => (
          <div key={a.id}>
            <Link prefetch='intent' to={`/blogs/${a.blog.handle}/${a.handle}`}>
              {a.title}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h2>Products</h2>
        <Pagination connection={results.products}>
          {({ nodes, isLoading, NextLink, PreviousLink }) => (
            <PaginationContainer
              isLoading={isLoading}
              NextLink={NextLink}
              PreviousLink={PreviousLink}
            >
              {nodes.map((product) => {
                const trackingParams = applyTrackingParams(
                  product,
                  `q=${encodeURIComponent(searchTerm)}`,
                );

                return (
                  <div className='search-results-item' key={product.id}>
                    <Link
                      prefetch='intent'
                      to={`/products/${product.handle}${trackingParams}`}
                    >
                      {product.variants.nodes[0].image && (
                        <Image
                          data={product.variants.nodes[0].image}
                          alt={product.title}
                          width={50}
                        />
                      )}
                      <div>
                        <p>{product.title}</p>
                        <small>
                          <Money data={product.variants.nodes[0].price} />
                        </small>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </PaginationContainer>
          )}
        </Pagination>
      </div>
    </div>
  );
};

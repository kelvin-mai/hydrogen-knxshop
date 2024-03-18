import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { getPaginationVariables } from '@shopify/hydrogen';

import { SEARCH_QUERY } from '~/graphql/storefront';
import { createMeta } from '~/lib/meta';
import { SearchForm, SearchResults } from '~/components/search';

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const variables = getPaginationVariables(request, { pageBy: 8 });
  const searchTerm = String(searchParams.get('q') || '');

  if (!searchTerm) {
    return {
      searchResults: { results: null, totalResults: 0 },
      searchTerm,
    };
  }

  const { errors, ...data } = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: searchTerm,
      ...variables,
    },
  });

  if (!data) {
    throw new Error('No search data returned from Shopify API');
  }

  const totalResults = Object.values(data).reduce((total, value) => {
    return total + value.nodes.length;
  }, 0);

  const searchResults = {
    results: data,
    totalResults,
  };

  return defer({
    searchTerm,
    searchResults,
  });
};

export const meta: MetaFunction = () => createMeta({ title: 'Search' });

export default function SearchPage() {
  const { searchTerm, searchResults } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Search</h1>
      <SearchForm searchTerm={searchTerm} />
      {!searchTerm || !searchResults.totalResults ? (
        <p>No results, try a different search.</p>
      ) : (
        <SearchResults
          results={searchResults.results}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}

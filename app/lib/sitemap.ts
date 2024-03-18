import { flattenConnection } from '@shopify/hydrogen';

import type { SitemapQuery } from 'storefrontapi.generated';

/**
 * the google limit is 50K, however, the storefront API
 * allows querying only 250 resources per pagination page
 */
export const MAX_URLS = 250;

type Entry = {
  url: string;
  lastMod?: string;
  changeFreq?: string;
  image?: {
    url: string;
    title?: string;
    caption?: string;
  };
};

const xmlEncode = (string: string) => {
  return string.replace(/[&<>'"]/g, (char) => `&#${char.charCodeAt(0)};`);
};

const renderUrlTag = ({ url, lastMod, changeFreq, image }: Entry) => {
  const imageTag = image
    ? `<image:image>
        <image:loc>${image.url}</image:loc>
        <image:title>${image.title ?? ''}</image:title>
        <image:caption>${image.caption ?? ''}</image:caption>
      </image:image>`.trim()
    : '';

  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${changeFreq}</changefreq>
      ${imageTag}
    </url>
  `.trim();
};

export const generateSitemap = ({
  data,
  baseUrl,
}: {
  data: SitemapQuery;
  baseUrl: string;
}) => {
  const products = flattenConnection(data.products)
    .filter((product) => product.onlineStoreUrl)
    .map((product) => {
      const url = `${baseUrl}/products/${xmlEncode(product.handle)}`;

      const productEntry: Entry = {
        url,
        lastMod: product.updatedAt,
        changeFreq: 'daily',
      };

      if (product.featuredImage?.url) {
        productEntry.image = {
          url: xmlEncode(product.featuredImage.url),
        };

        if (product.title) {
          productEntry.image.title = xmlEncode(product.title);
        }

        if (product.featuredImage.altText) {
          productEntry.image.caption = xmlEncode(product.featuredImage.altText);
        }
      }

      return productEntry;
    });

  const collections = flattenConnection(data.collections)
    .filter((collection) => collection.onlineStoreUrl)
    .map((collection) => {
      const url = `${baseUrl}/collections/${collection.handle}`;

      return {
        url,
        lastMod: collection.updatedAt,
        changeFreq: 'daily',
      };
    });

  const pages = flattenConnection(data.pages)
    .filter((page) => page.onlineStoreUrl)
    .map((page) => {
      const url = `${baseUrl}/pages/${page.handle}`;

      return {
        url,
        lastMod: page.updatedAt,
        changeFreq: 'weekly',
      };
    });

  const urls = [...products, ...collections, ...pages];

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${urls.map(renderUrlTag).join('')}
    </urlset>`;
};

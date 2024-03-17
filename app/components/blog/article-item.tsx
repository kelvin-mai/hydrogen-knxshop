import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';

import type { ArticleItemFragment } from 'storefrontapi.generated';

type ArticleItemProps = {
  article: ArticleItemFragment;
  loading?: HTMLImageElement['loading'];
};

export const ArticleItem: React.FC<ArticleItemProps> = ({
  article,
  loading,
}) => {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt!));
  return (
    <div className='blog-article' key={article.id}>
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
        {article.image && (
          <div className='blog-article-image'>
            <Image
              alt={article.image.altText || article.title}
              aspectRatio='3/2'
              data={article.image}
              loading={loading}
              sizes='(min-width: 768px) 50vw, 100vw'
            />
          </div>
        )}
        <h3>{article.title}</h3>
        <small>{publishedAt}</small>
      </Link>
    </div>
  );
};

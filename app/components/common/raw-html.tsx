import { cn } from '~/lib/classname';

type RawHtmlProps = {
  className?: string;
  override?: boolean;
  html: string;
};

export const RawHtml: React.FC<RawHtmlProps> = ({
  className,
  override = false,
  html,
}) => {
  return (
    <div
      className={cn(
        'max-w-none',
        override ? '' : 'prose dark:prose-invert',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

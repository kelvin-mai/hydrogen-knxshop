const TITLE = 'KNXSHOP';

const metaDescription = (s: string) => s.substring(0, 154);

export const createMeta = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => [
  { title: title ? `${title} | ${TITLE}` : TITLE },
  { description: metaDescription(description ?? '') },
];

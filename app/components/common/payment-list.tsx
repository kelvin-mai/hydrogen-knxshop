import { cn } from '~/lib/classname';

export const PaymentList: React.FC<{ className?: string }> = ({
  className,
}) => {
  const svgs = [
    {
      name: 'amex',
      alt: 'American Express',
    },
    {
      name: 'apple-pay',
      alt: 'Apple Pay',
    },
    {
      name: 'diners-club',
      alt: 'Diners Club',
    },
    {
      name: 'discover',
      alt: 'Discover',
    },
    {
      name: 'google-pay',
      alt: 'Google Pay',
    },
    {
      name: 'mastercard',
      alt: 'Mastercard',
    },
    {
      name: 'meta-pay',
      alt: 'Meta Pay',
    },
    {
      name: 'paypal',
      alt: 'Paypal',
    },
    {
      name: 'shop',
      alt: 'Shop',
    },
    {
      name: 'venmo',
      alt: 'Venmo',
    },
    {
      name: 'visa',
      alt: 'Visa',
    },
  ];

  return (
    <ul className={cn('flex flex-wrap justify-center gap-2', className)}>
      {svgs.map((svg) => (
        <li key={svg.name}>
          <img src={`/assets/payment-cards/${svg.name}.svg`} alt={svg.alt} />
        </li>
      ))}
    </ul>
  );
};

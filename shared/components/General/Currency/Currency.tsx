type Props = {
  cents?: number;
};

export const Currency = ({ cents }: Props) => {
  const numFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return <>{cents !== undefined ? numFormatter.format(cents / 100) : '-'}</>;
};

import { ROUTES } from '@shared/index';
import { Button } from '@shared/components';
import { Item } from 'chargebee-typescript/lib/resources';
import { useRouter } from 'next/router';

type OverviewProps = {
  item: Item;
};

export const Overview = ({ item }: OverviewProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${ROUTES.BILLING}/${item.id}`);
  };

  return (
    <div>
      <Button onClick={handleClick}>{item.external_name}</Button>
    </div>
  );
};

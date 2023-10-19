import { DetailsTable } from '@shared/components';
import { AdminDetailsItem } from '../AdminDetails';

type Props = {
  item: AdminDetailsItem;
};

export const AdminDetailsTable = ({ item }: Props) => {
  if (!item) return null;

  const properties = Object.entries(item).map((property) => {
    const text = property[0];
    const result = text.replace(/([A-Z])/g, ' $1');
    const label = result.charAt(0).toUpperCase() + result.slice(1);

    return {
      id: label,
      label,
      data: property[1]?.toString(),
    };
  });

  return <DetailsTable bodyElements={properties} />;
};

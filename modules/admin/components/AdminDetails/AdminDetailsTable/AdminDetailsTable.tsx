import { DetailsTable } from '@shared/components';
import { formatters } from '@shared/utils/formatters';
import { AdminDetailsItem } from '../AdminDetails';

type Props = {
  item: AdminDetailsItem;
  ignoreItems?: string[];
};

export const AdminDetailsTable = ({ item, ignoreItems }: Props) => {
  if (!item) return null;

  console.log(Object.entries(item));

  const properties = Object.entries(item)
    .filter((property) => !ignoreItems?.some((item) => property[0] === item))
    .map((property) => {
      const text = property[0];
      const result = text.replace(/([A-Z])/g, ' $1');
      const label = result.charAt(0).toUpperCase() + result.slice(1);
      const value = property[1];

      return {
        id: label,
        label,
        data:
          typeof value === 'object' && Boolean(Date.parse(value))
            ? `${formatters.formatDate(
                item.createdAt!,
              )} @ ${formatters.formatDate(item.createdAt!, 'time')}`
            : typeof value === 'object' || typeof value === 'undefined'
            ? '-'
            : value?.toString(),
      };
    });

  console.log('properties', properties);

  return <DetailsTable bodyElements={properties} />;
};

import { styles } from './AdminDetailTable.styles';
import { Copy, TableSkeleton } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  item: IAdminItem;
  properties: AdminDetailProperty[];
};

export const AdminDetailTable = ({ item, properties }: Props) => {
  if (!item)
    return (
      <div css={spacing.top.medium}>
        <TableSkeleton />
      </div>
    );

  return (
    <table css={styles.table}>
      <tbody>
        {properties.map((property) => {
          return (
            <tr key={property.id || property.label}>
              <th>{property.label}</th>
              <td>
                {property.data ?? '-'}{' '}
                {property.copyValue && (
                  <span className="copy-button" css={styles.copyButton}>
                    <Copy value={property.copyValue} hideTooltip />
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

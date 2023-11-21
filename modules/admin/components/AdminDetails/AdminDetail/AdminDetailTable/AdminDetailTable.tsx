import { styles } from './AdminDetailTable.styles';
import { Copy } from '@shared/components';

export type AdminDetailProperty = {
  id: string;
  label: string;
  data: any;
  copyValue?: string;
};

type Props = {
  item: any;
  properties: AdminDetailProperty[];
};

export const AdminDetailTable = ({ item, properties }: Props) => {
  if (!item) return null;

  return (
    <table css={styles.table}>
      <tbody>
        {properties.map((property) => {
          return (
            <tr key={property.id || property.label}>
              <th>{property.label}</th>
              <td>
                {property.data || '-'}{' '}
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

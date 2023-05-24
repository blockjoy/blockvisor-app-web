import { Scrollbar, SvgIcon } from '@shared/components';
import { FC } from 'react';
import { styles } from './FirewallDropdownItems.styles';
import IconTrash from '@public/assets/icons/trash.svg';

type Props = {
  items: FilteredIpAddr[];
  listType: string;
  onRemoveClicked: (index: number) => void;
};

export const FirewallDropdownItems: FC<Props> = ({
  items,
  listType,
  onRemoveClicked,
}) => {
  return (
    <Scrollbar additionalStyles={[styles.scrollbar]}>
      <table css={styles.table}>
        <tbody>
          {!items?.length ? (
            <tr>
              <td>No {listType} rules added</td>
            </tr>
          ) : (
            items?.map((item, index) => (
              <tr key={item.ip}>
                <td style={{ width: '140px' }}>{item.ip}</td>
                <td style={{ width: '120px' }}>{item.description}</td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => onRemoveClicked(index)}
                    className="remove-button"
                    css={styles.removeButton}
                  >
                    <SvgIcon size="16px">
                      <IconTrash />
                    </SvgIcon>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Scrollbar>
  );
};

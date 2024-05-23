import { Scrollbar, SvgIcon } from '@shared/components';
import { styles } from './FirewallDropdownItems.styles';
import IconTrash from '@public/assets/icons/common/Trash.svg';

type Props = {
  items: FilteredIpAddr[];
  listType: 'allow' | 'deny';
  onRemoveClicked: (index: number) => void;
};

export const FirewallDropdownItems = ({
  items,
  listType,
  onRemoveClicked,
}: Props) => {
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
                <td style={{ width: '35%' }}>{item.ip}</td>
                <td style={{ width: '50%' }}>{item.description}</td>
                <td
                  style={{ width: '15%', minWidth: '70px', textAlign: 'right' }}
                >
                  <button
                    onClick={() => onRemoveClicked(index)}
                    className="remove-button"
                    css={styles.removeButton}
                  >
                    <SvgIcon size="16px" isDefaultColor>
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

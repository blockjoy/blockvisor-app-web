import { useHostView } from '@modules/host/hooks/useHostView';
import { Button, HostStatus, SvgIcon } from '@shared/components';
import { styles } from './HostViewHeaderScrolledDown.styles';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type Props = {
  isVisible: boolean;
  onDeleteClicked: VoidFunction;
  canDelete: boolean;
};

export const HostViewHeaderScrolledDown = ({
  isVisible,
  canDelete,
  onDeleteClicked,
}: Props) => {
  const { host } = useHostView();

  return (
    <header css={[styles.wrapper, isVisible && styles.wrapperVisible]}>
      <h3 css={styles.header}>{host?.name}</h3>
      <div css={styles.status}>
        <HostStatus hasBorder={false} />
      </div>
      <Button
        disabled={!canDelete}
        customCss={[styles.deleteButton]}
        onClick={onDeleteClicked}
        style="basic"
        size="small"
      >
        <SvgIcon size="12px">
          <IconDelete />
        </SvgIcon>
        <p>Delete</p>
      </Button>
    </header>
  );
};

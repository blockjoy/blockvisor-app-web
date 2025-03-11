import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node-launcher/store/nodeLauncherAtoms';
import { nodeLauncherSelectors } from '@modules/node-launcher/store/nodeLauncherSelectors';
import { Button } from '@shared/components';
import { styles } from './NodeLauncherFooter.styles';
import { SerializedStylesAll } from 'types/theme';

type Props = {
  disabled?: boolean;
  handleClick?: (() => void) | (() => Promise<void>);
} & React.PropsWithChildren;

export const NodeLauncherFooter = ({
  children,
  disabled,
  handleClick,
}: Props) => {
  const isUpdating = useRecoilValue(nodeLauncherSelectors.isUpdating);
  const isLaunching = useRecoilValue(nodeLauncherAtoms.isLaunching);
  const error = useRecoilValue(nodeLauncherAtoms.error);

  const customCsss: SerializedStylesAll = [styles.createButton];
  if (isLaunching && !Boolean(error))
    customCsss.push(styles.createButtonLoading);

  return (
    <div css={styles.wrapper}>
      <Button
        disabled={disabled || isUpdating || isLaunching}
        onClick={handleClick}
        customCss={customCsss}
      >
        {children}
      </Button>
    </div>
  );
};

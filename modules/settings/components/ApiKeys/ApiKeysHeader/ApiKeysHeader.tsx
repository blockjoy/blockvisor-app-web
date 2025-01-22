import { Button, SvgIcon } from '@shared/components';
import { styles } from './ApiKeysHeader.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';

type Props = {
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeysHeader = ({ handleView }: Props) => {
  return (
    <header css={styles.header}>
      <div>API Keys</div>
      <Button
        size="small"
        style="outline"
        onClick={() => handleView?.('create')}
      >
        <SvgIcon size="10px">
          <IconPlus />
        </SvgIcon>
        <span>New API Key</span>
      </Button>
    </header>
  );
};

import { Button, ButtonGroup, SvgIcon } from '@shared/components';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './PaymentMethodActions.styles';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type PaymentMethodActionsProps = {
  handleDelete: VoidFunction;
  handleDefault: VoidFunction;
  isPrimary: boolean;
  isLoading?: boolean;
};

export const PaymentMethodActions = ({
  handleDelete,
  handleDefault,
  isPrimary,
  isLoading,
}: PaymentMethodActionsProps) => {
  return (
    <ButtonGroup type="flex" additionalStyles={[flex.justify.end]}>
      {!isPrimary && (
        <Button
          size="small"
          onClick={handleDefault}
          style="outline"
          loading={isLoading}
          customCss={[styles.primaryBtn]}
        >
          Set as Primary
        </Button>
      )}
      <Button
        style="icon"
        css={[flex.display.flex, spacing.left.small]}
        onClick={handleDelete}
        customCss={[styles.deleteBtn]}
      >
        <SvgIcon isDefaultColor size="16px">
          <IconDelete />
        </SvgIcon>
      </Button>
    </ButtonGroup>
  );
};

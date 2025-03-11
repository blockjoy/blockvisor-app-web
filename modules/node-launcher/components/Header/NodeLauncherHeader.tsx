import { styles } from './NodeLauncherHeader.styles';
import IconArrowLeft from '@public/assets/icons/common/ArrowLeft.svg';
import { Button, SvgIcon, Tooltip } from '@shared/components';

type Props = {
  title: string;
  subtitle?: string;
  disabled?: boolean;
  tooltip?: string;
  handleBack?: VoidFunction;
} & React.PropsWithChildren;

export const NodeLauncherHeader = ({
  children,
  title,
  subtitle,
  disabled,
  tooltip,
  handleBack,
}: Props) => {
  return (
    <div css={styles.header}>
      {handleBack && (
        <Button
          onClick={handleBack}
          css={styles.back}
          style="basic"
          disabled={disabled}
        >
          {tooltip && (
            <Tooltip noWrap top="-30px" left="50%" tooltip={tooltip} />
          )}
          <SvgIcon size="16px">
            <IconArrowLeft />
          </SvgIcon>
        </Button>
      )}
      <div>
        <h2 css={styles.title}>{title}</h2>
        {subtitle && <p css={styles.subtitle}>{subtitle}</p>}
      </div>
      <div css={styles.content}>{children}</div>
    </div>
  );
};

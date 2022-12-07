import { Button, PageTitle } from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './SupportView.styles';
import CopyIcon from '@public/assets/icons/copy-12.svg';
import { toast } from 'react-toastify';

export const SupportView = () => {
  const email = 'support@blockjoy.com';
  const handleButtonClick = () => window.open(`mailto:<${email}>`);

  function handleCopy(value: string) {
    value && navigator.clipboard.writeText(value);
    toast.success('Copied');
  }

  return (
    <>
      <PageTitle title="Support" />
      <div css={[styles.wrapper]}>
        <h1>Need any help?</h1>
        <p
          css={[
            typo.small,
            colors.text3,
            spacing.top.medium,
            styles.textSpacingBottom,
          ]}
        >
          If you need support using this app, please send us an email via your
          email application or copy and paste our email support@blockjoy.com
          from down below.
        </p>
        <div css={[styles.buttonWrapper]}>
          <Button display="inline" onClick={handleButtonClick}>
            Open Email
          </Button>
          <Button onClick={() => handleCopy(email)} style="basic">
            Copy mail address
            <CopyIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

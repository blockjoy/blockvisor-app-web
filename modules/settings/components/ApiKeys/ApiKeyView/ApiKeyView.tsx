import { useRecoilState } from 'recoil';
import { copyToClipboard } from '@shared/index';
import { Button, CopyToClipboard, Modal } from '@shared/components';
import { settingsAtoms } from '@modules/settings';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';

type Props = {
  handleView?: (view: ApiKeysView) => void;
};

export const ApiKeyView = ({ handleView }: Props) => {
  const [apiKeyToken, setApiKeyToken] = useRecoilState(
    settingsAtoms.apiKeyToken,
  );

  const handleCopyAndClose = () => {
    if (apiKeyToken?.apiKey) copyToClipboard(apiKeyToken?.apiKey);
    setApiKeyToken(null);
    handleView?.({
      drawer: null,
      modal: null,
    });
  };

  return (
    <Modal portalId="api-key-view-modal" isOpen={true} inContainer>
      <h2 css={[typo.medium, spacing.bottom.medium]}>Save your new Token!</h2>
      <div css={spacing.bottom.medium}>
        <p css={spacing.bottom.small}>
          Your new API Key is created! This is the last time the token will be
          shown.
        </p>
        <p>Please save it securely to your machine.</p>
      </div>
      <div css={spacing.bottom.medium}>
        <CopyToClipboard value={apiKeyToken?.apiKey!} disabled={false} />
      </div>
      <div css={[flex.display.flex, flex.justify.end]}>
        <Button style="primary" onClick={handleCopyAndClose}>
          Copy & Close
        </Button>
      </div>
    </Modal>
  );
};

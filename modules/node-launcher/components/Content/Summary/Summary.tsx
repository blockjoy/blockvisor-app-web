import { PROTOCOL_PRESENTATION } from '@modules/node-launcher/constants/protocols';
import { nodeLauncherAtoms } from '@modules/node-launcher/store/nodeLauncherAtoms';
import { parseVariant } from '@modules/node-launcher/utils/variant';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NodeLauncherFooter } from '../../Footer/NodeLauncherFooter';
import { NodeLauncherHeader } from '../../Header/NodeLauncherHeader';
import { ProtocolIcon } from '../Protocols/ProtocolIcon/ProtocolIcon';
import { styles } from './Summary.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { spacing } from 'styles/utils.spacing.styles';
import { billingAtoms, billingSelectors } from '@modules/billing';
import { Alert, Pricing, Unauthorized } from '@shared/components';
import { authSelectors } from '@modules/auth';
import { Checkout } from '../Checkout/Checkout';
import { width } from 'styles/utils.width.styles';
import { containers } from 'styles/containers.styles';
import { Note } from '@shared/components/General/Note/Note';
import {
  NODE_LAUNCHER_ERRORS,
  NODE_LAUNCHER_ERROR_MESSAGES,
} from '@modules/node-launcher/constants/nodeLauncher';

type Props = {
  handleLaunchNode?: () => Promise<void>;
};

export const Summary = ({ handleLaunchNode }: Props) => {
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);
  const selectedRegion = useRecoilValue(nodeLauncherAtoms.selectedRegion);
  const defaultPaymentMethod = useRecoilValue(
    billingSelectors.defaultPaymentMethod,
  );

  const setCurrentStep = useSetRecoilState(nodeLauncherAtoms.currentStep);

  const isLaunching = useRecoilValue(nodeLauncherAtoms.isLaunching);
  const error = useRecoilValue(nodeLauncherAtoms.error);

  const price = useRecoilValue(billingAtoms.price);

  const billingExempt = useRecoilValue(
    authSelectors.hasPermission('billing-exempt'),
  );

  const protocolPresentation = PROTOCOL_PRESENTATION.find(
    (p) => p.key === selectedProtocol?.key,
  );

  const variant = parseVariant(selectedVariant ?? '');

  const handleStep = (step: NodeLauncherStep) => setCurrentStep(step);

  const canCreate = useRecoilValue(authSelectors.hasPermission('node-create'));

  const errors = Object.keys(NODE_LAUNCHER_ERRORS).filter(
    (errMsgKey) => !NODE_LAUNCHER_ERRORS[errMsgKey],
  );

  console.log('NODE_LAUNCHER_ERRORS', NODE_LAUNCHER_ERRORS);

  return (
    <div>
      <NodeLauncherHeader
        title="Summary"
        subtitle="Overview of the Node"
        tooltip="Back to Config"
        disabled={isLaunching}
        handleBack={() => handleStep('config')}
      />
      <div css={styles.wrapper}>
        <div css={[styles.header, spacing.bottom.large]}>
          <ProtocolIcon
            Icon={protocolPresentation?.Icon}
            color={protocolPresentation?.color}
          />
          <h3 css={styles.title}>{`${selectedProtocol?.name} Node`}</h3>
        </div>
        <div css={[styles.item, spacing.bottom.large]}>
          <div css={styles.itemInner}>
            <h4 css={styles.itemTitle}>Node Type</h4>
            <p css={styles.itemContent}>{variant.nodeType}</p>
          </div>
          <div css={styles.itemInner}>
            <h4 css={styles.itemTitle}>Network</h4>
            <p css={styles.itemContent}>{variant.network}</p>
          </div>
          <div css={styles.itemInner}>
            <h4 css={styles.itemTitle}>Client</h4>
            <p css={styles.itemContent}>{variant.client}</p>
          </div>
        </div>
        <div css={styles.item}>
          <div>
            <h4 css={styles.itemTitle}>Region</h4>
            <p css={styles.itemContent}>
              {`${selectedRegion?.region?.skuCode}: ${selectedRegion?.region?.displayName}` ??
                'Auto select'}
            </p>
          </div>
        </div>

        {price && (
          <div css={[styles.item, spacing.top.large]}>
            <div>
              <h4 css={styles.itemTitle}>Price</h4>
              <Pricing />
            </div>
          </div>
        )}
        {!billingExempt && (
          <div css={[styles.item, spacing.top.large]}>
            <div css={[styles.paymentMethods, containers.small]}>
              <h4 css={styles.itemTitle}>Payment method</h4>
              <Checkout />
            </div>
          </div>
        )}
      </div>

      {Boolean(errors.length) && (
        <Note
          additionalStyles={[spacing.top.medium]}
          type="error"
          title="Invalid configuration"
        >
          {errors.map((errMsgKey) => (
            <span>{NODE_LAUNCHER_ERROR_MESSAGES[errMsgKey]}</span>
          ))}
        </Note>
      )}

      {!canCreate && (
        <Alert additionalStyles={[styles.unathorized, spacing.top.medium]}>
          You don't have permission to create a node. Please contact your
          organization's administrator.
        </Alert>
      )}

      <NodeLauncherFooter
        disabled={!canCreate || !defaultPaymentMethod}
        handleClick={handleLaunchNode}
      >
        <span css={styles.button}>
          {isLaunching && !Boolean(error) ? (
            <span css={styles.cogIcon}>
              <IconCog />
            </span>
          ) : (
            <IconRocket />
          )}
          <span>
            {isLaunching && !Boolean(error) ? 'Launching' : 'Launch Node'}
          </span>
        </span>
      </NodeLauncherFooter>
    </div>
  );
};

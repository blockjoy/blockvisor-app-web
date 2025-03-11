import { ConfigBasic } from './ConfigBasic';
import { ConfigAdvanced } from './ConfigAdvanced';
import { NodeLauncherFooter } from '../../Footer/NodeLauncherFooter';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node-launcher/store/nodeLauncherAtoms';
import { NodeLauncherHeader } from '../../Header/NodeLauncherHeader';
import { nodeLauncherSelectors } from '@modules/node-launcher/store/nodeLauncherSelectors';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { billingAtoms, billingSelectors } from '@modules/billing';

export const Config = () => {
  const setCurrentStep = useSetRecoilState(nodeLauncherAtoms.currentStep);

  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);
  const selectedVersion = useRecoilValue(nodeLauncherSelectors.selectedVersion);
  const regions = useRecoilValue(nodeAtoms.regions);

  const handleBack = () => setCurrentStep('protocol');

  const handleNext = () => {
    // const nextStep: NodeLauncherStep = subscription ? 'summary' : 'checkout';

    setCurrentStep('summary');
  };

  const isDisabled =
    !selectedVariant ||
    !selectedVersion ||
    !selectedProtocol ||
    !Boolean(selectedVariant && regions.length);

  return (
    <>
      <NodeLauncherHeader
        title="Configuration"
        subtitle="Setup Your Node"
        tooltip="Back to Protocol"
        handleBack={handleBack}
      />

      <ConfigBasic />

      <ConfigAdvanced />

      <NodeLauncherFooter disabled={isDisabled} handleClick={handleNext}>
        {selectedVariant && !regions.length ? 'Currently unavailable' : 'Next'}
      </NodeLauncherFooter>
    </>
  );
};

import { useRecoilValue } from 'recoil';
import { PageTitle } from '@shared/components';
import { Protocols } from './Content/Protocols/Protocols';
import { nodeLauncherAtoms } from '../store/nodeLauncherAtoms';
import { wrapper } from 'styles/wrapper.styles';
import { LauncherWithGuardProps } from '@modules/billing';
import { useNodeLauncher } from '../hooks/useNodeLauncher';
import { styles } from './NodeLauncher.styles';
import { Summary } from './Content/Summary/Summary';
import { Config } from './Content/Config/Config';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import { Checkout } from './Content/Checkout/Checkout';

export const NodeLauncher = ({
  fulfilReqs,
  resetFulfilReqs,
  onCreateClick,
  hasPermissionsToCreate,
}: LauncherWithGuardProps) => {
  const currentStep = useRecoilValue(nodeLauncherAtoms.currentStep);

  const { handleLaunchNode } = useNodeLauncher();

  return (
    <>
      <PageTitle title="Launch Node" icon={<IconRocket />} />
      <div css={[wrapper.main, styles.wrapper]}>
        {currentStep === 'protocol' ? (
          <Protocols />
        ) : currentStep === 'config' ? (
          <Config />
        ) : currentStep === 'checkout' ? (
          <Checkout />
        ) : currentStep === 'summary' ? (
          <Summary handleLaunchNode={handleLaunchNode} />
        ) : null}
      </div>
    </>
  );
};

import { PageTitle } from '@shared/components';
import { NodeTitle } from '@modules/node';
import IconRocket from '@public/assets/icons/app/Rocket.svg';

export const NodeLauncherTitle = () => (
  <PageTitle>
    <NodeTitle titleText="Launch Node" icon={<IconRocket />} />
  </PageTitle>
);

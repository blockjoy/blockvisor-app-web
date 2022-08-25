import { FC } from 'react';
import IconChain from 'icons/chain-12.svg';
import IconCheckmark from 'icons/checkmark-12.svg';
import IconConsensus from 'icons/consensus-12.svg';
import IconFlag from 'icons/flag-12.svg';
import IconExclamation from 'icons/exclamation-12.svg';
import IconIndicator from 'icons/indicator-12.svg';
import IconStopwatch from 'icons/stopwatch-12.svg';
import IconUpdate from 'icons/update-12.svg';
import IconRefresh from 'icons/refresh-12.svg';

export interface Props {
  status: HostState | NodeState;
}

export const StateIcon: FC<Props> = ({ status }) => {
  function renderIcon() {
    switch (status) {
      case 'syncing':
        return <IconRefresh />;
      case 'synced':
        return <IconChain />;
      case 'upgrading':
        return <IconUpdate />;
      case 'consensus':
        return <IconConsensus />;
      case 'stopped':
        return <IconIndicator />;
      case 'pending':
        return <IconStopwatch />;
      case 'normal':
        return <IconCheckmark />;
      case 'loaded':
        return <IconFlag />;
      case 'issue':
        return <IconExclamation />;
    }
  }

  return renderIcon();
};

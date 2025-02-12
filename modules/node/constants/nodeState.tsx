import { NodeStatePresentation } from '../types/common';
import IconBroadcasting from '@public/assets/icons/nodeStatus/Broadcasting.svg';
import IconCancelled from '@public/assets/icons/nodeStatus/Cancelled.svg';
import IconDelegating from '@public/assets/icons/nodeStatus/Delegating.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconDelinquent from '@public/assets/icons/nodeStatus/Delinquent.svg';
import IconDisabled from '@public/assets/icons/nodeStatus/Disabled.svg';
import IconEarning from '@public/assets/icons/nodeStatus/Earning.svg';
import IconElected from '@public/assets/icons/nodeStatus/Elected.svg';
import IconElecting from '@public/assets/icons/nodeStatus/Electing.svg';
import IconExporting from '@public/assets/icons/nodeStatus/Exporting.svg';
import IconRunning from '@public/assets/icons/nodeStatus/Running.svg';
import IconStopped from '@public/assets/icons/nodeStatus/Stopped.svg';
import IconTrash from '@public/assets/icons/common/Trash.svg';
import IconProcessing from '@public/assets/icons/nodeStatus/Processing.svg';
import IconIngesting from '@public/assets/icons/nodeStatus/Ingesting.svg';
import IconMining from '@public/assets/icons/nodeStatus/Mining.svg';
import IconMinting from '@public/assets/icons/nodeStatus/Minting.svg';
import IconRelaying from '@public/assets/icons/nodeStatus/Relaying.svg';
import IconRemoved from '@public/assets/icons/nodeStatus/Removed.svg';
import IconRemoving from '@public/assets/icons/nodeStatus/Removing.svg';
import IconSynced from '@public/assets/icons/nodeStatus/Synced.svg';
import IconSyncing from '@public/assets/icons/nodeStatus/Syncing.svg';
import IconHeart from '@public/assets/icons/common/Heart.svg';

export const NODE_STATE_PRESENTATION: Record<string, NodeStatePresentation> = {
  deleted: {
    color: 'colorDanger',
    Icon: IconTrash,
  },
  deleting: {
    Icon: IconTrash,
  },
  failed: {
    color: 'colorDanger',
    Icon: IconDelinquent,
  },
  running: {
    color: 'colorPrimary',
    Icon: IconRunning,
  },
  starting: {
    Icon: IconCog,
    options: { iconSpining: true },
  },
  stopped: {
    Icon: IconStopped,
  },
  upgrading: {
    Icon: IconCog,
    options: { iconSpining: true },
  },
};

export const NODE_STATE_PRESENTATION_EXTENDED: Record<
  string,
  NodeStatePresentation
> = {
  broadcasting: {
    color: 'colorPrimary',
    Icon: IconBroadcasting,
  },
  cancelled: {
    Icon: IconCancelled,
  },
  delegating: {
    Icon: IconDelegating,
  },
  delete_pending: {
    Icon: IconTrash,
  },
  delinquent: {
    color: 'colorDanger',
    Icon: IconDelinquent,
  },
  disabled: {
    Icon: IconDisabled,
  },
  downloading: {
    color: 'colorPrimary',
    Icon: IconCog,
    options: { iconSpining: true },
  },
  earning: {
    Icon: IconEarning,
  },
  elected: {
    Icon: IconElected,
  },
  electing: {
    Icon: IconElecting,
  },
  exporting: {
    Icon: IconExporting,
  },
  ingesting: {
    Icon: IconIngesting,
  },
  mining: {
    Icon: IconMining,
  },
  minting: {
    Icon: IconMinting,
  },
  processing: {
    Icon: IconProcessing,
  },
  relaying: {
    Icon: IconRelaying,
  },
  removed: {
    Icon: IconRemoved,
  },
  removing: {
    Icon: IconRemoving,
  },
  syncing: {
    color: 'colorPrimary',
    Icon: IconSyncing,
  },
  synced: {
    color: 'colorPrimary',
    Icon: IconSynced,
  },
  updating: {
    color: 'colorPrimary',
    Icon: IconProcessing,
  },
  uploading: {
    color: 'colorPrimary',
    Icon: IconCog,
    options: { iconSpining: true },
  },
};

export const PROTOCOL_HEALTH_PRESENTATION: Record<
  string,
  NodeStatePresentation
> = {
  healthy: {
    color: 'colorPrimary',
    Icon: IconHeart,
  },
  neutral: {
    Icon: IconHeart,
  },
  unhealthy: {
    color: 'colorDanger',
    Icon: IconHeart,
  },
};

export const NODE_PROGRESS_STATUSES = ['uploading', 'downloading'];

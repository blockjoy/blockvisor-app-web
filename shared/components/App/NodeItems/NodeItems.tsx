import { NodeStatusDownloader } from './Partials/NodeStatusDownloader';
import { NodeStatusTextWIcon } from './Partials/NodeStatusTextWIcon';

import { BlockHeight } from './Items/BlockHeight';
import { Cost } from './Items/Cost';
import { CreatedAt } from './Items/CreatedAt';
import { CreatedBy } from './Items/CreatedBy';
import { DisplayName } from './Items/DisplayName';
import { IpAddress } from './Items/IpAddress';
import { IpGetaway } from './Items/IpGetaway';
import { NodeStatus } from './Items/NodeStatus';
import { ProtocolHealth } from './Items/ProtocolHealth';
import { ProtocolName } from './Items/ProtocolName';
import { ProtocolStatus } from './Items/ProtocolStatus';
import { Region } from './Items/Region';
import { RPCUrl } from './Items/RPCUrl';
import { Version } from './Items/Version';

import { Info } from './Groups/Info';

export const NodePartials = {
  NodeStatusDownloader,
  NodeStatusTextWIcon,
};

export const NodeItems = {
  BlockHeight,
  Cost,
  CreatedAt,
  CreatedBy,
  DisplayName,
  IpAddress,
  IpGetaway,
  NodeStatus,
  ProtocolHealth,
  ProtocolName,
  ProtocolStatus,
  Region,
  RPCUrl,
  Version,
};

export const NodeGroups = {
  Info,
};

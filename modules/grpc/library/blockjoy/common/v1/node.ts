/* eslint-disable */

export const protobufPackage = "blockjoy.common.v1";

/** All possible node types. */
export enum NodeType {
  NODE_TYPE_UNSPECIFIED = 0,
  NODE_TYPE_MINER = 1,
  NODE_TYPE_ETL = 2,
  NODE_TYPE_VALIDATOR = 3,
  NODE_TYPE_API = 4,
  NODE_TYPE_ORACLE = 5,
  NODE_TYPE_RELAY = 6,
  NODE_TYPE_EXECUTION = 7,
  NODE_TYPE_BEACON = 8,
  NODE_TYPE_MEVBOOST = 9,
  NODE_TYPE_NODE = 10,
  NODE_TYPE_FULLNODE = 11,
  NODE_TYPE_LIGHTNODE = 12,
  NODE_TYPE_ARCHIVE = 13,
  UNRECOGNIZED = -1,
}

/** Non-chain specific node states. */
export enum NodeStatus {
  NODE_STATUS_UNSPECIFIED = 0,
  /** NODE_STATUS_PROVISIONING - The node is currently being created on the host. */
  NODE_STATUS_PROVISIONING = 1,
  NODE_STATUS_BROADCASTING = 2,
  NODE_STATUS_CANCELLED = 3,
  NODE_STATUS_DELEGATING = 4,
  NODE_STATUS_DELINQUENT = 5,
  NODE_STATUS_DISABLED = 6,
  NODE_STATUS_EARNING = 7,
  NODE_STATUS_ELECTING = 8,
  NODE_STATUS_ELECTED = 9,
  NODE_STATUS_EXPORTED = 10,
  NODE_STATUS_INGESTING = 11,
  NODE_STATUS_MINING = 12,
  NODE_STATUS_MINTING = 13,
  NODE_STATUS_PROCESSING = 14,
  NODE_STATUS_RELAYING = 15,
  /**
   * NODE_STATUS_DELETE_PENDING - A message to delete has been sent, and as soon as the process is kicked off
   * the node will move to the deleting status.
   */
  NODE_STATUS_DELETE_PENDING = 16,
  /** NODE_STATUS_DELETING - The node is currently in the process of being removed. */
  NODE_STATUS_DELETING = 17,
  /** NODE_STATUS_DELETED - This node is deleted. */
  NODE_STATUS_DELETED = 18,
  /**
   * NODE_STATUS_PROVISIONING_PENDING - The node has been created, and it will move to pending as soon as the host
   * that it will run on has acked the messages sent to it.
   */
  NODE_STATUS_PROVISIONING_PENDING = 19,
  NODE_STATUS_UPDATE_PENDING = 20,
  NODE_STATUS_UPDATING = 21,
  UNRECOGNIZED = -1,
}

/** The container status of a node. */
export enum ContainerStatus {
  CONTAINER_STATUS_UNSPECIFIED = 0,
  CONTAINER_STATUS_CREATING = 1,
  CONTAINER_STATUS_RUNNING = 2,
  CONTAINER_STATUS_STARTING = 3,
  CONTAINER_STATUS_STOPPING = 4,
  CONTAINER_STATUS_STOPPED = 5,
  CONTAINER_STATUS_UPGRADING = 6,
  CONTAINER_STATUS_UPGRADED = 7,
  CONTAINER_STATUS_DELETING = 8,
  CONTAINER_STATUS_DELETED = 9,
  CONTAINER_STATUS_INSTALLING = 10,
  CONTAINER_STATUS_SNAPSHOTTING = 11,
  CONTAINER_STATUS_FAILED = 12,
  CONTAINER_STATUS_BUSY = 13,
  UNRECOGNIZED = -1,
}

/** The sync status of a node. */
export enum SyncStatus {
  SYNC_STATUS_UNSPECIFIED = 0,
  SYNC_STATUS_SYNCING = 1,
  SYNC_STATUS_SYNCED = 2,
  UNRECOGNIZED = -1,
}

/** The staking status of a node. */
export enum StakingStatus {
  STAKING_STATUS_UNSPECIFIED = 0,
  STAKING_STATUS_FOLLOWER = 1,
  STAKING_STATUS_STAKED = 2,
  STAKING_STATUS_STAKING = 3,
  STAKING_STATUS_VALIDATING = 4,
  STAKING_STATUS_CONSENSUS = 5,
  STAKING_STATUS_UNSTAKED = 6,
  UNRECOGNIZED = -1,
}

/** Field properties for displaying in the UI. */
export enum UiType {
  UI_TYPE_UNSPECIFIED = 0,
  /**
   * UI_TYPE_SWITCH - Either "true" or "false" must be returned. The property should be rendered
   * as a checkbox.
   */
  UI_TYPE_SWITCH = 1,
  /**
   * UI_TYPE_PASSWORD - This field should be treated as a password field, i.e. a text field whose
   * content is hidden.
   */
  UI_TYPE_PASSWORD = 2,
  /** UI_TYPE_TEXT - This field should be treated as a text field. */
  UI_TYPE_TEXT = 3,
  /** UI_TYPE_FILE_UPLOAD - This field should let the user upload string from a file. */
  UI_TYPE_FILE_UPLOAD = 4,
  UNRECOGNIZED = -1,
}

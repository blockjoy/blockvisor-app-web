import { styles } from './NodeLauncher.styles';
import { useEffect, useState } from 'react';
import { NodeLauncherConfig } from './Config/NodeLauncherConfig';
import { NodeLauncherProtocol } from './Protocol/NodeLauncherProtocol';
import { NodeLauncherSummary } from './Summary/NodeLauncherSummary';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';
import { EmptyColumn, PageTitle } from '@shared/components';
import { useDefaultOrganization } from '@modules/organization';
import { wrapper } from 'styles/wrapper.styles';
import { ROUTES } from '@shared/constants/routes';
import {
  UiType,
  NodeProperty,
  NodeType,
  NodeServiceCreateRequest,
  FilteredIpAddr,
  NodePlacement,
  NodeScheduler_ResourceAffinity,
} from '@modules/grpc/library/blockjoy/v1/node';
import {
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  sortVersions,
  sortNetworks,
  sortNodeTypes,
} from '@modules/node/utils/sortLists';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { Mixpanel } from '@shared/services/mixpanel';
import IconRocket from '@public/assets/icons/app/Rocket.svg';
import { usePermissions } from '@modules/auth';
import { useHostList } from '@modules/host';
import { useSubscription } from '@modules/billing';
import { useUpdateSubscription } from '@modules/billing';
import { billingSelectors, PaymentRequired } from '@modules/billing';
import {
  checkIfOwner,
  PermissionsCreateResource,
  useHasPermissionsToCreateResource,
} from '@modules/auth';
import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';

export type NodeLauncherState = {
  blockchainId: string;
  nodeTypeVersion: string;
  nodeType: NodeType;
  properties?: NodeProperty[];
  keyFiles?: NodeFiles[];
  network?: string;
  allowIps: FilteredIpAddr[];
  denyIps: FilteredIpAddr[];
  placement: NodePlacement;
};

export type CreateNodeParams = {
  version: string;
  nodeType: number;
  blockchain: string;
  nodeTypeProperties: NodeProperty[];
  key_files?: File[];
  network: string;
  allowedIps: FilteredIpAddr[];
  deniedIps: FilteredIpAddr[];
};

export const NodeLauncher = () => {
  const router = useRouter();

  const { blockchains } = useGetBlockchains();
  const { createNode } = useNodeAdd();
  const { hostList } = useHostList();

  const [, setHasRegionListError] = useState(true);
  const [serverError, setServerError] = useState<string>();
  const [isCreating, setIsCreating] = useState(false);

  const [selectedNodeType, setSelectedNodeType] =
    useState<BlockchainNodeType>();
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<BlockchainVersion>();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const { defaultOrganization } = useDefaultOrganization();
  const [fulfilRequirements, setFulfilRequirements] = useState<boolean>(false);

  const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);
  const hasSubscription = useRecoilValue(billingSelectors.hasSubscription);

  const userRoleInOrganization: OrgRole = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );
  const isOwner = checkIfOwner(userRoleInOrganization);

  const canAddNode: PermissionsCreateResource =
    useHasPermissionsToCreateResource(userRoleInOrganization, hasSubscription);

  const hasPaymentMethod = useRecoilValue(billingSelectors.hasPaymentMethod);

  const { hasPermission } = usePermissions();

  const canAddNode = hasPermission('node-create');

  const [node, setNode] = useState<NodeLauncherState>({
    blockchainId: '',
    nodeType: NodeType.NODE_TYPE_UNSPECIFIED,
    nodeTypeVersion: '',
    allowIps: [],
    denyIps: [],
    placement: {},
  });

  const isNodeValid = Boolean(
    node.blockchainId && node.nodeType && (selectedHost || selectedRegion),
  );

  const isConfigValid =
    Boolean(node.network) &&
    (!node.properties?.length ||
      Boolean(
        node.properties
          ?.filter(
            (type: NodeProperty) =>
              type.required &&
              type.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
              type.uiType !== UiType.UI_TYPE_SWITCH,
          )
          .every((type) => type.value),
      ));

  const handleProtocolSelected = (
    blockchainId: string,
    nodeType: NodeType,
    properties?: NodeProperty[],
  ) => {
    setServerError(undefined);
    setIsCreating(false);
    setNode({
      ...node,
      blockchainId,
      nodeType,
      properties,
    });
    Mixpanel.track('Launch Node - Protocol Selected', {
      blockchain: blockchains?.find((b) => b.id === blockchainId)?.name,
      nodeType: NodeType[nodeType],
    });
  };

  const handleNodePropertyChanged = (name: string, value: any) => {
    setNode({
      ...node,
      [name]: value,
    });

    Mixpanel.track('Launch Node - Property Changed', {
      propertyName: name,
      propertyValue: value,
    });
  };

  const handleNodeConfigPropertyChanged = (e: any) => {
    setServerError('');

    const propertiesCopy = [...node.properties!];

    let foundProperty = propertiesCopy.find(
      (property) => property.name === e.target.name,
    );

    if (!foundProperty) return;

    const newValue =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    foundProperty.value = newValue;

    setNode({
      ...node,
      properties: propertiesCopy,
    });

    Mixpanel.track('Launch Node - Node Config Property Changed', {
      propertyName: foundProperty.name,
      propertyValue: newValue,
    });
  };

  const handleVersionChanged = (version: BlockchainVersion) => {
    Mixpanel.track('Launch Node - Version Changed');
    setSelectedVersion(version);
  };

  const handleHostChanged = (host: Host | null) => {
    Mixpanel.track('Launch Node - Host Changed');
    setSelectedHost(host);
    setSelectedRegion(null);
  };

  const handleRegionChanged = (region: Region | null) => {
    Mixpanel.track('Launch Node - Region Changed');
    setSelectedRegion(region);
  };

  const handleFileUploaded = (e: any) => {
    setServerError(undefined);
    const keyFilesCopy = [...node.keyFiles!];

    let foundNodeFiles = keyFilesCopy.find(
      (files) => files.name === e.target.name,
    );

    if (!foundNodeFiles) return;

    for (let file of e?.target?.files) {
      foundNodeFiles?.files.push(file);
    }

    setNode({
      ...node,
      keyFiles: keyFilesCopy,
    });

    Mixpanel.track('Launch Node - Key File Uploaded');
  };

  const handleRegionsLoaded = (region: Region | null) => {
    setHasRegionListError(Boolean(region));
    setSelectedRegion(region);
  };

  const handleCreateNodeClicked = () => {
    if (!hasPaymentMethod && isOwner) {
      setActiveView('action');
      setFulfilRequirements(false);
      return;
    }

    setFulfilRequirements(true);
  };

  const handleNodeCreation = () => {
    setIsCreating(true);

    const params: NodeServiceCreateRequest = {
      orgId: defaultOrganization!.id,
      version: selectedVersion?.version!,
      nodeType: +node.nodeType ?? 0,
      blockchainId: node.blockchainId ?? '',
      properties: node.properties!,
      network: node.network!,
      allowIps: node.allowIps,
      denyIps: node.denyIps,
      placement: selectedHost
        ? { hostId: selectedHost.id }
        : {
            scheduler: {
              region: selectedRegion?.name!,
              resource:
                NodeScheduler_ResourceAffinity.RESOURCE_AFFINITY_LEAST_RESOURCES,
            },
          },
    };

    createNode(
      params,
      () => {
        Mixpanel.track('Launch Node - Node Launched');
        router.push(ROUTES.NODES);
      },
      (error: string) => {
        setServerError(error!);
        setIsCreating(false);
      },
    );
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 3182023e (fix: sc-2031 permission to preview subscription; bug fixes)
  const userRole = useRecoilValue(authSelectors.userRole);
  const userRoleInOrganization = useRecoilValue(
    organizationSelectors.userRoleInOrganization,
  );

  const canAddNode: boolean = useHasPermissions(
    userRole,
    userRoleInOrganization,
    Permissions.CREATE_NODE,
  );

>>>>>>> 034b89a5 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)
  useEffect(() => {
    const activeBlockchain = blockchains.find(
      (b) => b.id === node.blockchainId,
    );

    if (!activeBlockchain) return;

    const activeNodeType =
      activeBlockchain.nodeTypes.find((nt) => nt.nodeType === node.nodeType) ||
      activeBlockchain.nodeTypes[0];

    if (!activeNodeType) return;

    const sortedVersions = sortVersions(activeNodeType.versions);

    setSelectedNodeType(sortNodeTypes(activeBlockchain.nodeTypes)[0]);
    setSelectedVersion(sortedVersions[0]);
  }, [node.blockchainId, node.nodeType]);

  useEffect(() => {
    let properties: NodeProperty[] | undefined, keyFiles;

    if (selectedVersion?.properties.length) {
      const nodeTypePropertiesCopy = [...selectedVersion?.properties!];

      properties = nodeTypePropertiesCopy.map((property) => ({
        ...property,
        value: property.default ?? '',
        disabled: false,
      }));

      keyFiles = properties
        .filter((p) => p.uiType === UiType.UI_TYPE_FILE_UPLOAD)
        .map((p) => ({
          name: p.name,
          files: [],
        }));
    }

    setNode({
      ...node,
      keyFiles,
      properties,
      network: sortNetworks(selectedVersion?.networks)[0]?.name,
    });
  }, [selectedVersion?.id]);

  useEffect(() => {
    setSelectedHost(null);
  }, [hostList]);

  useEffect(() => {
    Mixpanel.track('Launch Node - Opened');
  }, []);

  useEffect(() => {
    if (fulfilRequirements) {
      handleNodeCreation();
    }
  }, [fulfilRequirements]);

  return (
    <>
      <PageTitle title="Launch Node" icon={<IconRocket />} />
      <div css={[wrapper.main, styles.wrapper]}>
        <NodeLauncherProtocol
          onProtocolSelected={handleProtocolSelected}
          blockchainId={node.blockchainId}
          nodeType={node.nodeType}
        />
        {Boolean(node.blockchainId && node.nodeType) && (
          <NodeLauncherConfig
            onFileUploaded={handleFileUploaded}
            onNodeConfigPropertyChanged={handleNodeConfigPropertyChanged}
            onNodePropertyChanged={handleNodePropertyChanged}
            onVersionChanged={handleVersionChanged}
            selectedVersion={selectedVersion}
            networks={sortNetworks(selectedVersion?.networks)}
            versions={sortVersions(selectedNodeType?.versions)}
            nodeLauncherState={node}
          />
        )}
        {Boolean(!node.blockchainId && !node.nodeType) && (
          <div css={styles.empty}>
            <EmptyColumn
              title="Launch a Node."
              description="Select a protocol to get started."
            />
          </div>
        )}
        {Boolean(node.blockchainId && node.nodeType && selectedVersion?.id) && (
          <NodeLauncherSummary
            hasNetworkList={Boolean(selectedVersion?.networks?.length)}
            serverError={serverError!}
            isCreating={isCreating}
            isNodeValid={isNodeValid}
            isConfigValid={isConfigValid}
            nodeLauncherState={node}
            selectedRegion={selectedRegion!}
            selectedVersion={selectedVersion!}
            selectedHost={selectedHost}
            canAddNode={canAddNode}
            onHostChanged={handleHostChanged}
            onRegionChanged={handleRegionChanged}
            onCreateNodeClicked={handleCreateNodeClicked}
            onRegionsLoaded={handleRegionsLoaded}
          />
        )}
      </div>
      {activeView === 'action' && (
        <PaymentRequired
          warningMessage="Creating a Node requires a payment method."
          onHide={handleHidingPortal}
          handleSubmit={handleSubmitPayment}
        />
      )}
    </>
  );
};

import { AuthenticationServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Authentication_serviceServiceClientPb';
import {
  ConfirmRegistrationRequest,
  LoginUserRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdatePasswordRequest,
  UpdateUIPasswordRequest,
  SwitchOrgRequest,
} from '@blockjoy/blockjoy-grpc/dist/out/authentication_service_pb';
import {
  ApiToken,
  Bill,
  Blockchain,
  Host,
  HostProvision,
  Metric,
  Node,
  Organization,
  Parameter,
  RequestMeta,
  ResponseMeta,
  User,
  UserConfigurationParameter,
  Pagination,
  Invitation,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { v4 as uuidv4 } from 'uuid';
import { BillingServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Billing_serviceServiceClientPb';
import { DashboardServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Dashboard_serviceServiceClientPb';
import { HostServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Fe_host_serviceServiceClientPb';
import { HostProvisionServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Host_provision_serviceServiceClientPb';
import { NodeServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Ui_node_serviceServiceClientPb';
import { OrganizationServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Organization_serviceServiceClientPb';
import { UpdateServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Update_serviceServiceClientPb';
import { UserServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/User_serviceServiceClientPb';
import { CreateBillResponse } from '@blockjoy/blockjoy-grpc/dist/out/billing_service_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { DashboardMetricsRequest } from '@blockjoy/blockjoy-grpc/dist/out/dashboard_service_pb';
import {
  CreateHostRequest,
  DeleteHostResponse,
  GetHostsRequest,
  UpdateHostResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/fe_host_service_pb';
import {
  CreateHostProvisionRequest,
  GetHostProvisionRequest,
} from '@blockjoy/blockjoy-grpc/dist/out/host_provision_service_pb';
import {
  CreateNodeRequest,
  DeleteNodeRequest,
  FilterCriteria,
  GetNodeRequest,
  ListNodesRequest,
  UpdateNodeRequest,
  UpdateNodeResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/ui_node_service_pb';
import {
  CreateOrganizationRequest,
  DeleteOrganizationRequest,
  GetOrganizationsRequest,
  RestoreOrganizationRequest,
  UpdateOrganizationRequest,
  OrganizationMemberRequest,
  RemoveMemberRequest,
  LeaveOrganizationRequest,
} from '@blockjoy/blockjoy-grpc/dist/out/organization_service_pb';
import {
  CreateUserRequest,
  GetConfigurationResponse,
  GetUserRequest,
  UpdateUserRequest,
  UpsertConfigurationResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/user_service_pb';
import {
  GetUpdatesRequest,
  GetUpdatesResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/update_service_pb';
import {
  CommandRequest,
  CommandResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/command_service_pb';
import { BlockchainServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Blockchain_serviceServiceClientPb';
import { ListBlockchainsRequest } from '@blockjoy/blockjoy-grpc/dist/out/blockchain_service_pb';
import { CommandServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Command_serviceServiceClientPb';
import {
  StatusResponse,
  StatusResponseFactory,
} from '@modules/client/status_response';
import { KeyFilesClient } from '@blockjoy/blockjoy-grpc/dist/out/Key_file_serviceServiceClientPb';
import {
  Keyfile,
  KeyFilesSaveRequest,
} from '@blockjoy/blockjoy-grpc/dist/out/key_file_service_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { InvitationServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Invitation_serviceServiceClientPb';
import {
  CreateInvitationRequest,
  InvitationRequest,
  ListPendingInvitationRequest,
  ListReceivedInvitationRequest,
} from '@blockjoy/blockjoy-grpc/dist/out/invitation_service_pb';
import * as mqtt from 'mqtt';

export type UIUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export type UINode = {
  org_id: string;
  blockchain_id: string;
  version?: string;
  type: Node.NodeType;
  properties: Node.NodeProperty.AsObject[];
  network: string;
};
export type UINodeCreate = {
  host_id: string;
  node_type: string;
  blockchain_id: string;
  command: 'create_node';
  sub_cmd?: string;
};
export type UIHostCreate = {
  name: string;
  location?: string;
};
export type AuthHeader = {
  authorization: string;
};
export type NewPassword = {
  old_pwd: string;
  new_pwd: string;
  new_pwd_confirmation: string;
};
export type UIFilterCriteria = {
  blockchain?: string[];
  node_type?: string[];
  node_status?: string[];
};
export type UIPagination = {
  current_page: number;
  items_per_page: number;
};

export function timestamp_to_date(ts: Timestamp | undefined): Date | undefined {
  if (ts !== undefined) {
    return new Date(ts.getSeconds() * 1000);
  }
}

export function node_to_grpc_node(node: Node | undefined): GrpcNodeObject {
  return {
    ...node?.toObject()!,
    created_at_datetime: timestamp_to_date(node?.getCreatedAt()),
    updated_at_datetime: timestamp_to_date(node?.getUpdatedAt()),
  };
}

export function host_to_grpc_host(host: Host | undefined): GrpcHostObject {
  return {
    ...host?.toObject()!,
    created_at_datetime: timestamp_to_date(host?.getCreatedAt()) || undefined,
    nodesList: host?.getNodesList().map((node) => node.toObject()) || [],
    node_objects: host?.getNodesList().map((node) => node_to_grpc_node(node)),
  };
}

export function blockchain_to_grpc_blockchain(
  chain: Blockchain | undefined,
): GrpcBlockchainObject {
  return {
    id: chain?.getId() || '',
    name: chain?.getName() || '',
    status:
      chain?.getStatus() ||
      Blockchain.BlockchainStatus.BLOCKCHAIN_STATUS_DEVELOPMENT,
    supportedNodesTypes: chain?.getSupportedNodesTypes() || '',
    supportsBroadcast: false,
    supportsEtl: chain?.getSupportsEtl() || true,
    supportsNode: chain?.getSupportsNode() || true,
    supportsStaking: chain?.getSupportsStaking() || true,
    ...chain?.toObject(),
    created_at_datetime: timestamp_to_date(chain?.getCreatedAt()) || undefined,
    updated_at_datetime: timestamp_to_date(chain?.getUpdatedAt()) || undefined,
    supported_node_types:
      JSON.parse(chain?.getSupportedNodesTypes() || '') || [],
    networksList: chain?.getNetworksList().map((c) => c.toObject()) || [],
  };
}

export function user_to_grpc_user(user: User | undefined): GrpcUserObject {
  return {
    ...user?.toObject()!,
    created_at_datetime: timestamp_to_date(user?.getCreatedAt()),
    updated_at_datetime: timestamp_to_date(user?.getUpdatedAt()),
  };
}

export function node_properties_to_grpc_node_properties(
  properties: Node.NodeProperty.AsObject[],
): Node.NodeProperty[] {
  let node_properties: Node.NodeProperty[] = [];

  properties.forEach((property: Node.NodeProperty.AsObject) => {
    let node_property: Node.NodeProperty = new Node.NodeProperty();

    node_property.setName(property.name);
    node_property.setLabel(property.label);
    node_property.setDescription(property.description);
    node_property.setUiType(property.uiType);
    node_property.setDisabled(property.disabled);
    node_property.setRequired(property.required);
    if (property.value) node_property.setValue(property.value);

    node_properties.push(node_property);
  });

  return node_properties;
}

export type ConvenienceConversion = {
  created_at_datetime: Date | undefined;
};
export type GrpcBlockchainObject = Blockchain.AsObject &
  ConvenienceConversion & {
    supported_node_types: any;
    updated_at_datetime: Date | undefined;
    networksList: any;
  };
export type GrpcHostObject = Host.AsObject &
  ConvenienceConversion & { node_objects: Array<GrpcNodeObject> | undefined };
export type GrpcNodeObject = Node.AsObject &
  ConvenienceConversion & {
    updated_at_datetime: Date | undefined;
  };
export type GrpcUserObject = User.AsObject &
  ConvenienceConversion & { updated_at_datetime: Date | undefined };

export interface StateObject {
  processHostUpdate: (host: Host | undefined) => boolean;

  processNodeUpdate: (node: Node | undefined) => boolean;
}

const eqmx_url = 'ws://35.237.162.218/mqtt';

export class GrpcClient {
  private authentication: AuthenticationServiceClient | undefined;
  private billing: BillingServiceClient | undefined;
  private dashboard: DashboardServiceClient | undefined;
  private host: HostServiceClient | undefined;
  private host_provision: HostProvisionServiceClient | undefined;
  private node: NodeServiceClient | undefined;
  private organization: OrganizationServiceClient | undefined;
  private update: UpdateServiceClient | undefined;
  private user: UserServiceClient | undefined;
  private blockchain: BlockchainServiceClient | undefined;
  private command: CommandServiceClient | undefined;
  private key_files: KeyFilesClient | undefined;
  private invitation: InvitationServiceClient | undefined;
  private token: string;

  constructor(host: string) {
    this.initClients(host);
    this.token = '';
  }

  setTokenValue(token: string) {
    this.token = token;
  }

  initStorage() {
    return null;
  }

  /**
   * Initialize all gRPC clients
   */
  private initClients(host: string) {
    let opts = {
      withCredentials: true,
    };

    this.authentication = new AuthenticationServiceClient(host, null, opts);
    this.host = new HostServiceClient(host, null, opts);
    this.blockchain = new BlockchainServiceClient(host, null, opts);
    this.node = new NodeServiceClient(host, null, opts);
    this.host_provision = new HostProvisionServiceClient(host, null, opts);
    this.dashboard = new DashboardServiceClient(host, null, opts);
    this.command = new CommandServiceClient(host, null, opts);
    this.organization = new OrganizationServiceClient(host, null, opts);
    this.billing = new BillingServiceClient(host, null, opts);
    this.update = new UpdateServiceClient(host, null, opts);
    this.user = new UserServiceClient(host, null, opts);
    this.key_files = new KeyFilesClient(host, null, opts);
    this.invitation = new InvitationServiceClient(host, null, opts);
  }

  getApiToken() {
    if (!window.localStorage.getItem('identity')) return;

    let api_token = new ApiToken();
    api_token.setValue(this.token);

    this.token = JSON.parse(
      window.localStorage.getItem('identity') || '{}',
    ).accessToken;
    return this.token;
  }

  getAuthHeader(): AuthHeader {
    return { authorization: `Bearer ${this.getApiToken()}` };
  }

  getDummyMeta(): ResponseMeta {
    let meta = new ResponseMeta();
    meta.setStatus(ResponseMeta.Status.STATUS_SUCCESS);
    meta.setOriginRequestId(this.getDummyUuid());

    return meta;
  }

  getDummyUuid(): string {
    return uuidv4();
  }

  getDummyNode(): Node {
    let node = new Node();
    node.setHostId(this.getDummyUuid());
    node.setId(this.getDummyUuid());
    node.setOrgId(this.getDummyUuid());
    node.setBlockchainId(this.getDummyUuid());
    node.setName('lorem-node');
    node.setVersion('0.1.0');
    node.setIp('127.0.0.1');
    node.setType(Node.NodeType.NODE_TYPE_UNSPECIFIED);
    node.setBlockHeight(12_121_112);
    node.setCreatedAt(this.getDummyTimestamp());
    node.setUpdatedAt(this.getDummyTimestamp());
    node.setStatus(Node.NodeStatus.NODE_STATUS_PROCESSING);
    return node;
  }

  getDummyHost(): Host {
    let host = new Host();
    host.setId(this.getDummyUuid());
    host.setName('lorem-ipsum');
    host.setVersion('0.1.0');
    host.setLocation('Djibouti');
    host.setCpuCount(8);
    host.setMemSize(32);
    host.setDiskSize(2048);
    host.setOs('Darwin');
    host.setOsVersion('21.6.0 Darwin Kernel Version 21.6.');
    host.setIp('127.0.0.1');
    host.addNodes(this.getDummyNode());
    host.setStatus(Host.HostStatus.HOST_STATUS_CREATING);
    host.setCreatedAt(this.getDummyTimestamp());

    return host;
  }

  getDummyTimestamp(): google_protobuf_timestamp_pb.Timestamp {
    let now = new Date();
    let fromdate = new Date();

    fromdate.setDate(now.getDate() - Math.floor(Math.random() * 10));

    let timestamp = new google_protobuf_timestamp_pb.Timestamp();

    timestamp.setSeconds(fromdate.getTime() / 1000);
    timestamp.setNanos(0);

    return timestamp;
  }

  /* Authentication service */
  async login(
    email: string,
    pwd: string,
  ): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    console.debug(`Using "${email}" => "${pwd}" for login`);

    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new LoginUserRequest();
    request.setEmail(email);
    request.setPassword(pwd);
    request.setMeta(request_meta);

    return this.authentication
      ?.login(request, null)
      .then((response) => {
        this.token = response.getToken()?.toObject().value || '';

        return response.getToken()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.loginResponse(err, 'grpcClient');
      });
  }

  async registration_confirmation(
    token: string,
  ): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let auth_header = {
      authorization: `Bearer ${Buffer.from(token, 'binary').toString(
        'base64',
      )}`,
    };

    let request = new ConfirmRegistrationRequest();
    request.setMeta(request_meta);

    return this.authentication
      ?.confirm(request, auth_header)
      .then((response) => {
        return response.getToken()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.registrationConfirmation(
          err,
          'grpcClient',
        );
      });
  }

  async refresh(): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    let response = new RefreshTokenResponse();
    response.setMeta(this.getDummyMeta());

    return response.getToken()?.toObject();
  }

  async resetPassword(
    email: string,
  ): Promise<ResetPasswordResponse.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new ResetPasswordRequest();
    request.setMeta(request_meta);
    request.setEmail(email);

    return this.authentication
      ?.resetPassword(request, this.getAuthHeader())
      .then((response) => {
        return response.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.resetPasswordResponse(err, 'grpcClient');
      });
  }

  async updateResetPassword(
    token: string,
    pwd: string,
    pwd_confirmation: string,
  ): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    if (pwd === pwd_confirmation) {
      let request_meta = new RequestMeta();
      request_meta.setId(this.getDummyUuid());

      let request = new UpdatePasswordRequest();
      request.setMeta(request_meta);
      request.setPassword(pwd);

      let auth_header = {
        authorization: `Bearer ${Buffer.from(token, 'binary').toString(
          'base64',
        )}`,
      };

      return this.authentication
        ?.updatePassword(request, auth_header)
        .then((response) => {
          return response.getToken()?.toObject();
        })
        .catch((err) => {
          return StatusResponseFactory.updateResetPasswordResponse(
            err,
            'grpcClient',
          );
        });
    } else {
      return StatusResponseFactory.updateResetPasswordResponse(
        null,
        'grpcClient',
      );
    }
  }

  async updatePassword(
    pwd: NewPassword,
  ): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    if (pwd.new_pwd === pwd.new_pwd_confirmation) {
      let request_meta = new RequestMeta();
      request_meta.setId(this.getDummyUuid());

      let request = new UpdateUIPasswordRequest();
      request.setMeta(request_meta);
      request.setOldPwd(pwd.old_pwd);
      request.setNewPwd(pwd.new_pwd);
      request.setNewPwdConfirmation(pwd.new_pwd_confirmation);

      return this.authentication
        ?.updateUIPassword(request, this.getAuthHeader())
        .then((response) => {
          return response.getToken()?.toObject();
        })
        .catch((err) => {
          return StatusResponseFactory.updatePasswordResponse(
            err,
            'grpcClient',
          );
        });
    } else {
      return StatusResponseFactory.updatePasswordResponse(null, 'grpcClient');
    }
  }

  /* Billing service */

  async createBill(
    user_id: string,
    org_id: string,
  ): Promise<Bill.AsObject | StatusResponse | undefined> {
    let bill = new Bill();
    bill.setId('some-bill-id');
    bill.setPdfUrl('/some/url.pdf');
    bill.setCreatedAt(this.getDummyTimestamp());
    bill.setTaxNumber('tax-number');
    bill.setReceiverName('Max Mustermann');
    bill.setReceiverAddress('Bondstreet 1a, 12312 Djibouti');
    bill.setTaxRate(0.2);
    bill.setNetAmount(100.0);
    bill.setGrossAmount(120.0);

    let response = new CreateBillResponse();
    response.setMeta(this.getDummyMeta());

    return response.getBill()?.toObject();
  }

  /* Blockchain service */

  async getBlockchains(): Promise<
    Array<GrpcBlockchainObject> | StatusResponse | undefined
  > {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());
    let request = new ListBlockchainsRequest();
    request.setMeta(request_meta);

    return this.blockchain
      ?.list(request, this.getAuthHeader())
      .then((response) => {
        return response
          .getBlockchainsList()
          .map((chain) => blockchain_to_grpc_blockchain(chain));
      })
      .catch((err) => {
        return StatusResponseFactory.getBlockchainsResponse(err, 'grpcClient');
      });
  }

  /* Dashboard service */

  async getDashboardMetrics(
    org_id?: string,
  ): Promise<Array<Metric.AsObject> | undefined | StatusResponse> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new DashboardMetricsRequest();
    request.setMeta(request_meta);
    request.setOrgId(org_id || '');

    return this.dashboard
      ?.metrics(request, this.getAuthHeader())
      .then((response) => {
        return response.getMetricsList().map((item) => item.toObject());
      })
      .catch((err) => {
        return StatusResponseFactory.getDashboardMetricsResponse(
          err,
          'grpcClient',
        );
      });
  }

  /* Host service */

  async getHosts(
    host_id?: string,
    org_id?: string,
    token?: string,
  ): Promise<Array<GrpcHostObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());
    let request = new GetHostsRequest();
    request.setMeta(request_meta);

    return this.host
      ?.get(request, this.getAuthHeader())
      .then((response) => {
        return response.getHostsList()?.map((host) => host_to_grpc_host(host));
      })
      .catch((err) => {
        return StatusResponseFactory.getHostsResponse(err, 'grpcClient');
      });
  }

  async createHost(
    host: Host,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CreateHostRequest();
    request.setMeta(request_meta);

    return this.host
      ?.create(request, this.getAuthHeader())
      .then((response) => response.getMeta()?.toObject())
      .catch((err) => {
        return StatusResponseFactory.createHostResponse(err, 'grpcClient');
      });
  }

  async updateHost(
    host: Host,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new UpdateHostResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async deleteHost(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new DeleteHostResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  /* Host provision service */

  async getHostProvision(
    otp: string,
  ): Promise<Array<HostProvision.AsObject> | StatusResponse | undefined> {
    let provision = new HostProvision();
    provision.setId(otp);

    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new GetHostProvisionRequest();
    request.setMeta(request_meta);
    request.setId(otp);

    return this.host_provision
      ?.get(request, this.getAuthHeader())
      .then((response) => {
        return response.getHostProvisionsList().map((hp) => hp.toObject());
      })
      .catch((err) => {
        return StatusResponseFactory.getHostProvisionResponse(
          err,
          'grpcClient',
        );
      });
  }

  async createHostProvision(
    host_provision: HostProvision,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CreateHostProvisionRequest();
    request.setMeta(request_meta);

    return this.host_provision
      ?.create(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.createHostProvisionResponse(
          err,
          'grpcClient',
        );
      });
  }

  /* Node service */

  async listNodes(
    org_id: string,
    filter_criteria?: UIFilterCriteria,
    pagination?: UIPagination,
  ): Promise<Array<GrpcNodeObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new ListNodesRequest();
    request.setMeta(request_meta);
    request.setOrgId(org_id);

    let meta_pagination = new Pagination();

    if (pagination) {
      meta_pagination.setItemsPerPage(pagination.items_per_page);
      meta_pagination.setCurrentPage(pagination.current_page);
    } else {
      meta_pagination.setItemsPerPage(100);
      meta_pagination.setCurrentPage(1);
    }

    request_meta.setPagination(meta_pagination);

    if (filter_criteria) {
      let criteria = new FilterCriteria();

      console.log('Setting blockchain filter: ', filter_criteria.blockchain);
      console.log('Setting node status filter: ', filter_criteria.node_status);
      console.log('Setting node type filter: ', filter_criteria.node_type);

      criteria.setBlockchainIdsList(filter_criteria.blockchain || []);
      criteria.setStatesList(filter_criteria.node_status || []);
      criteria.setNodeTypesList(filter_criteria.node_type || []);

      request.setFilter(criteria);
    }

    return this.node
      ?.list(request, this.getAuthHeader())
      .then((response) => {
        return response.getNodesList().map((node) => node_to_grpc_node(node));
      })
      .catch((err) => {
        return StatusResponseFactory.listNodesResponse(err, 'grpcClient');
      });
  }

  async getNode(
    node_id: string,
  ): Promise<GrpcNodeObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new GetNodeRequest();
    request.setMeta(request_meta);
    request.setId(node_id);

    return this.node
      ?.get(request, this.getAuthHeader())
      .then((response) => {
        return node_to_grpc_node(response.getNode());
      })
      .catch((err) => {
        return StatusResponseFactory.getNodeResponse(err, 'grpcClient');
      });
  }

  async createNode(
    node: UINode,
    key_files?: File[],
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request: CreateNodeRequest = new CreateNodeRequest();
    request.setMeta(request_meta);

    request.setOrgId(node.org_id);
    request.setBlockchainId(node.blockchain_id);
    request.setVersion(node.version ?? '');
    request.setType(node.type);
    request.setNetwork(node.network);

    const node_properties: Node.NodeProperty[] =
      node_properties_to_grpc_node_properties(node.properties);
    request.setPropertiesList(node_properties);

    let response_meta = await this.node
      ?.create(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.updateNodeResponse(err, 'grpcClient');
      });

    console.log('node response, ', response_meta);

    let node_id;
    try {
      // @ts-ignore
      node_id = response_meta?.messagesList[0];
    } catch (error) {
      console.log('node response meta error: ', error);
    }

    console.log('got key files: ', key_files);
    console.log('got node id: ', node_id);

    // Node creation was successful, trying to upload keys, if existent
    if (key_files !== undefined && key_files?.length > 0) {
      let request = new KeyFilesSaveRequest();
      let files: Array<Keyfile> = [];

      console.log('got node id: ', node_id);

      request.setRequestId(this.getDummyUuid());
      request.setNodeId(node_id);

      for (let i = 0; i < key_files.length; i++) {
        //for (let file of key_files) {
        let file = key_files[i];

        let fileContent = await file.text();
        const encoder = new TextEncoder();

        let keyfile = new Keyfile();
        keyfile.setName(file?.name || '');
        keyfile.setContent(encoder.encode(fileContent));
        files.push(keyfile);
      }

      console.log('files', files);

      request.setKeyFilesList(files);

      let response_key_files = await this.key_files
        ?.save(request, this.getAuthHeader())
        .then((response) => {
          let meta = new ResponseMeta();
          meta.setOriginRequestId(response.getOriginRequestId());
          meta.setMessagesList(response.getMessagesList());

          console.log('got_response', meta.toObject());

          return meta.toObject();
        })
        .catch((err) => {
          return StatusResponseFactory.saveKeyfileResponse(err, 'grpcClient');
        });

      console.log('key files response: ', response_key_files);
    }

    return response_meta;
  }

  async updateNode(
    node_id: string,
    version?: string,
    key_files?: FileList,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new UpdateNodeResponse();
    response.setMeta(this.getDummyMeta());
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new UpdateNodeRequest();
    request.setMeta(request_meta);

    request.setId(node_id);
    if (version) request.setVersion(version);

    let response_meta = await this.node
      ?.update(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta();
      })
      .catch((err) => {
        return StatusResponseFactory.updateNodeResponse(err, 'grpcClient');
      });

    console.log('updated node: ', response_meta);
    console.log('got key files: ', key_files);

    // Node creation was successful, trying to upload keys, if existent
    if (key_files !== undefined && key_files?.length > 0) {
      let request = new KeyFilesSaveRequest();
      let files: Array<Keyfile> = [];

      console.log('got node id: ', node_id);

      request.setRequestId(this.getDummyUuid());
      request.setNodeId(node_id);

      for (let i = 0; i < key_files.length; i++) {
        //for (let file of key_files) {
        let file = key_files.item(i);
        let reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            let f = new Keyfile();
            f.setName(file?.name || '');
            f.setContent(reader.result + '');

            files.push(f);
          },
          false,
        );

        if (file) {
          reader.readAsText(file, 'UTF-8');
          request.setKeyFilesList(files);
        }
      }

      return this.key_files
        ?.save(request, this.getAuthHeader())
        .then((response) => {
          let meta = new ResponseMeta();
          meta.setOriginRequestId(response.getOriginRequestId());
          meta.setMessagesList(response.getMessagesList());

          return meta.toObject();
        })
        .catch((err) => {
          return StatusResponseFactory.saveKeyfileResponse(err, 'grpcClient');
        });
    } else {
      return StatusResponseFactory.updateNodeResponse(null, 'grpcClient');
    }
  }

  async deleteNode(
    node_id: string,
  ): Promise<Empty.AsObject | undefined | StatusResponse> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new DeleteNodeRequest();
    request.setId(node_id);
    request.setMeta(request_meta);

    return this.node
      ?.delete(request, this.getAuthHeader())
      .then((response) => {
        return response.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.deleteNodeResponse(err, 'grpcClient');
      });
  }

  /* Organization service */

  async getOrganizations(
    org_id?: string,
  ): Promise<Array<Organization.AsObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new GetOrganizationsRequest();
    request.setMeta(request_meta);

    if (org_id) request.setOrgId(org_id);

    return this.organization
      ?.get(request, this.getAuthHeader())
      .then((response) => {
        return response.getOrganizationsList().map((item) => item.toObject());
      })
      .catch((err) => {
        return StatusResponseFactory.getOrganizationsResponse(
          err,
          'grpcClient',
        );
      });
  }

  async createOrganization(
    name: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CreateOrganizationRequest();
    request.setName(name);

    return this.organization
      ?.create(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.deleteOrganizationResponse(
          err,
          'grpcClient',
        );
      });
  }

  async updateOrganization(
    id: string,
    name: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new UpdateOrganizationRequest();
    request.setMeta(request_meta);
    request.setId(id);
    request.setName(name);

    return this.organization
      ?.update(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.deleteOrganizationResponse(
          err,
          'grpcClient',
        );
      });
  }

  async deleteOrganization(
    id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new DeleteOrganizationRequest();
    request.setMeta(request_meta);
    request.setId(id);

    return this.organization
      ?.delete(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.deleteOrganizationResponse(
          err,
          'grpcClient',
        );
      });
  }

  async switchOrganization(
    org_id: string,
  ): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new SwitchOrgRequest();
    request.setMeta(request_meta);
    request.setOrgId(org_id);

    return this.authentication
      ?.switchOrganization(request, this.getAuthHeader())
      .then((response: any) => {
        this.token = response.getToken()?.toObject().value || '';

        return response.getToken()?.toObject();
      })
      .catch((err: any) => {
        return StatusResponseFactory.switchOrganizationResponse(
          err,
          'grpcClient',
        );
      });
  }

  async restoreOrganization(
    organization_id: string,
  ): Promise<Organization.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new RestoreOrganizationRequest();
    request.setMeta(request_meta);
    request.setId(organization_id);

    return this.organization
      ?.restore(request, this.getAuthHeader())
      .then((response) => {
        return response.getOrganization()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.restoreOrganizationResponse(
          err,
          'grpcClient',
        );
      });
  }

  async getOrganizationMembers(
    org_id: string,
  ): Promise<Array<User.AsObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new OrganizationMemberRequest();
    request.setMeta(request_meta);
    request.setId(org_id);

    return this.organization
      ?.members(request, this.getAuthHeader())
      .then((response) => {
        return response.getUsersList().map((item) => ({
          ...item.toObject(),
          createdAtString: timestamp_to_date(item?.getCreatedAt()) || undefined,
        }));
      })
      .catch((err) => {
        return StatusResponseFactory.getOrganizationMembersResponse(
          err,
          'grpcClient',
        );
      });
  }

  async removeOrganizationMember(
    user_id: string,
    org_id: string,
  ): Promise<Empty.AsObject | undefined | StatusResponse> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new RemoveMemberRequest();
    request.setMeta(request_meta);
    request.setUserId(user_id);
    request.setOrgId(org_id);

    return this.organization
      ?.removeMember(request, this.getAuthHeader())
      .then((response) => {
        return response?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.removeOrganizationMemberResponse(
          err,
          'grpcClient',
        );
      });
  }

  async leaveOrganization(
    org_id: string,
  ): Promise<Empty.AsObject | undefined | StatusResponse> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new LeaveOrganizationRequest();
    request.setMeta(request_meta);
    request.setOrgId(org_id);

    return this.organization
      ?.leave(request, this.getAuthHeader())
      .then((response) => {
        return response?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.leaveOrganizationResponse(
          err,
          'grpcClient',
        );
      });
  }

  /* User service */

  async getUser(): Promise<User.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new GetUserRequest();
    request.setMeta(request_meta);

    return this.user
      ?.get(request, this.getAuthHeader())
      .then((response) => {
        return user_to_grpc_user(response.getUser());
      })
      .catch((err) => {
        return StatusResponseFactory.getUserResponse(err, 'grpcClient');
      });
  }

  async createUser(
    ui_user: UIUser,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CreateUserRequest();
    request.setEmail(ui_user.email);
    request.setFirstName(ui_user.first_name);
    request.setLastName(ui_user.last_name);
    request.setPassword(ui_user.password);
    request.setPasswordConfirmation(ui_user.password_confirmation);

    return this.user
      ?.create(request, null)
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.createUserResponse(err, 'grpcClient');
      });
  }

  async updateUser(
    id: string,
    first_name: string,
    last_name: string,
  ): Promise<User.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new UpdateUserRequest();
    request.setMeta(request_meta);
    request.setId(id);
    request.setFirstName(first_name);
    request.setLastName(last_name);

    return this.user
      ?.update(request, this.getAuthHeader())
      .then((response) => {
        return response.getUser()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.updateUserResponse(err, 'grpcClient');
      });
  }

  async upsertConfiguration(
    params: Array<UserConfigurationParameter>,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new UpsertConfigurationResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async getConfiguration(): Promise<
    Array<UserConfigurationParameter.AsObject> | StatusResponse | undefined
  > {
    let response = new GetConfigurationResponse();
    response.setMeta(this.getDummyMeta());

    return response.getParamsList().map((item) => item.toObject());
  }

  /* Update service */

  getUpdates(stateObject?: StateObject): void {
    let client = mqtt.connect('mqtt://35.237.162.218:1883');

    console.log('mqtt client: ', client);

    window.setTimeout(() => {
      console.debug('Waiting 1000ms for next update');
    }, 1000);
  }

  /* Command service */

  async execCreateNode(
    host_id: string,
    node: UINodeCreate,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execDeleteNode(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStartNode(
    host_id: string,
    node_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let param = new Parameter();
    param.setName('resource_id');
    param.setValue(node_id);

    let request = new CommandRequest();
    request.setMeta(request_meta);
    request.setId(host_id);
    request.addParams(param);

    return this.command
      ?.startNode(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.execStartNodeResponse(err, 'grpcClient');
      });
  }

  async execStopNode(
    host_id: string,
    node_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    console.log('execStopNode', {
      host_id,
      node_id,
    });

    let param = new Parameter();
    param.setName('resource_id');
    param.setValue(node_id.toString());

    let request = new CommandRequest();
    request.setMeta(request_meta);
    request.setId(host_id);
    request.addParams(param);

    return this.command
      ?.stopNode(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.execStopNodeResponse(err, 'grpcClient');
      });
  }

  async execRestartNode(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execCreateHost(
    host: UIHostCreate,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execDeleteHost(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStartHost(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStopHost(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execRestartHost(
    host_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CommandRequest();
    request.setMeta(request_meta);
    request.setId(host_id);

    return this.command
      ?.restartHost(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.execRestartHostResponse(err, 'grpcClient');
      });
  }

  async execGeneric(
    host_id: string,
    params: Array<Parameter>,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  /* Invitation service */
  async inviteOrgMember(
    invitee_email: string,
    for_org: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CreateInvitationRequest();
    request.setMeta(request_meta);
    request.setCreatedForOrgId(for_org);
    request.setInviteeEmail(invitee_email);

    return this.invitation
      ?.create(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.inviteOrgMember(err, 'grpcClient');
      });
  }

  async acceptInvitation({
    token,
    invitationId,
  }: {
    token?: string;
    invitationId?: string;
  }): Promise<Empty.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new InvitationRequest();
    request.setMeta(request_meta);

    let auth_header;

    if (token) {
      auth_header = {
        authorization: `Bearer ${Buffer.from(token, 'binary').toString(
          'base64',
        )}`,
      };
    } else {
      auth_header = this.getAuthHeader();

      const invitation = new Invitation();
      invitation.setId(invitationId!);

      request.setInvitation(invitation);
    }

    return this.invitation
      ?.accept(request, auth_header)
      .then((response) => {
        console.log('acceptInvitationResponse', response.toObject());
        return response.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.acceptInvitation(err, 'grpcClient');
      });
  }

  async declineInvitation({
    token,
    invitationId,
  }: {
    token?: string;
    invitationId?: string;
  }): Promise<Empty.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new InvitationRequest();
    request.setMeta(request_meta);

    let auth_header;

    if (token) {
      auth_header = {
        authorization: `Bearer ${Buffer.from(token, 'binary').toString(
          'base64',
        )}`,
      };
    } else {
      auth_header = this.getAuthHeader();

      const invitation = new Invitation();
      invitation.setId(invitationId!);

      request.setInvitation(invitation);
    }

    return this.invitation
      ?.decline(request, auth_header)
      .then((response) => {
        console.log('declineInvitationResponse', response.toObject());
        return response.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.declineInvitation(err, 'grpcClient');
      });
  }

  async revokeInvitation({
    token,
    invitationId,
    email,
  }: {
    token?: string;
    invitationId?: string;
    email?: string;
  }): Promise<Empty.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new InvitationRequest();
    request.setMeta(request_meta);

    let auth_header;

    if (token) {
      auth_header = {
        authorization: `Bearer ${Buffer.from(token, 'binary').toString(
          'base64',
        )}`,
      };
    } else {
      auth_header = this.getAuthHeader();

      const invitation = new Invitation();
      invitation.setId(invitationId!);
      if (email) invitation.setInviteeEmail(email);

      request.setInvitation(invitation);
    }

    return this.invitation
      ?.revoke(request, auth_header)
      .then((response) => {
        console.log('revokeInvitationResponse', response.toObject());
        return response.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.revokeInvitation(err, 'grpcClient');
      });
  }

  async receivedInvitations(
    user_id: string,
  ): Promise<Array<Invitation.AsObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new ListReceivedInvitationRequest();
    request.setMeta(request_meta);
    request.setUserId(user_id);

    return this.invitation
      ?.listReceived(request, this.getAuthHeader())
      .then((response) => {
        console.log(
          'pendingInvitations',
          response.getInvitationsList().map((item) => item.toObject()),
        );

        return response.getInvitationsList().map((item) => item.toObject());
      })
      .catch((err) => {
        return StatusResponseFactory.receivedInvitations(err, 'grpcClient');
      });
  }

  async pendingInvitations(
    org_id: string,
  ): Promise<Array<Invitation.AsObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new ListPendingInvitationRequest();
    request.setMeta(request_meta);
    request.setOrgId(org_id);

    return this.invitation
      ?.listPending(request, this.getAuthHeader())
      .then((response) => {
        return response.getInvitationsList().map((item) => ({
          ...item.toObject(),
          createdAtString: timestamp_to_date(item?.getCreatedAt()) || undefined,
        }));
      })
      .catch((err) => {
        return StatusResponseFactory.pendingInvitations(err, 'grpcClient');
      });
  }
}

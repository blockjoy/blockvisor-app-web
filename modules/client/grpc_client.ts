import { AuthenticationServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Authentication_serviceServiceClientPb';
import {
  ConfirmRegistrationRequest,
  LoginUserRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdatePasswordRequest,
  UpdateUIPasswordRequest,
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
  UpdateNotification,
  User,
  UserConfigurationParameter,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { v4 as uuidv4 } from 'uuid';
import { BillingServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Billing_serviceServiceClientPb';
import { DashboardServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Dashboard_serviceServiceClientPb';
import { HostServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Fe_host_serviceServiceClientPb';
import { HostProvisionServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Host_provision_serviceServiceClientPb';
import { NodeServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Node_serviceServiceClientPb';
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
  GetNodeRequest,
  ListNodesRequest,
  UpdateNodeResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/node_service_pb';
import {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  GetOrganizationsRequest,
  RestoreOrganizationRequest,
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/organization_service_pb';
import {
  CreateUserRequest,
  GetConfigurationResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpsertConfigurationResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/user_service_pb';
import { GetUpdatesResponse } from '@blockjoy/blockjoy-grpc/dist/out/update_service_pb';
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
import Status = ResponseMeta.Status;
import { KeyFilesClient } from '@blockjoy/blockjoy-grpc/dist/out/Key_file_serviceServiceClientPb';

export type UIUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
export type FilterCriteria = {
  blockchain?: string[];
  node_type?: string[];
  node_status?: string[];
};
export type SortingCriteria = {
  name?: 'asc' | 'desc';
};

export function timestamp_to_date(ts: Timestamp | undefined): Date | undefined {
  if (ts !== undefined) {
    return new Date(ts.getSeconds() * 1000);
  }
}

export function node_to_grpc_node(node: Node | undefined): GrpcNodeObject {
  return {
    groupsList: node?.getGroupsList() || [],
    ...node?.toObject(),
    created_at_datetime: timestamp_to_date(node?.getCreatedAt()),
    updated_at_datetime: timestamp_to_date(node?.getUpdatedAt()),
  };
}

export function host_to_grpc_host(host: Host | undefined): GrpcHostObject {
  return {
    ...host?.toObject(),
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
    status: chain?.getStatus() || Blockchain.BlockchainStatus.DEVELOPMENT,
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
  };
}

export function user_to_grpc_user(user: User | undefined): GrpcUserObject {
  return {
    ...user?.toObject(),
    created_at_datetime: timestamp_to_date(user?.getCreatedAt()),
    updated_at_datetime: timestamp_to_date(user?.getUpdatedAt()),
  };
}

export type ConvenienceConversion = {
  created_at_datetime: Date | undefined;
};
export type GrpcBlockchainObject = Blockchain.AsObject &
  ConvenienceConversion & {
    supported_node_types: any;
    updated_at_datetime: Date | undefined;
  };
export type GrpcHostObject = Host.AsObject &
  ConvenienceConversion & { node_objects: Array<GrpcNodeObject> | undefined };
export type GrpcNodeObject = Node.AsObject &
  ConvenienceConversion & {
    updated_at_datetime: Date | undefined;
  };
export type GrpcUserObject = User.AsObject &
  ConvenienceConversion & { updated_at_datetime: Date | undefined };
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
    meta.setStatus(ResponseMeta.Status.SUCCESS);
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
    node.setGroupsList(['group-one']);
    node.setVersion('0.1.0');
    node.setIp('127.0.0.1');
    node.setType('');
    node.setAddress('0x999999999');
    node.setWalletAddress('0x000000001');
    node.setBlockHeight(12_121_112);
    node.setNodeData('some-blob');
    node.setCreatedAt(this.getDummyTimestamp());
    node.setUpdatedAt(this.getDummyTimestamp());
    node.setStatus(Node.NodeStatus.PROCESSING);

    return node;
  }

  getDummyHost(): Host {
    let host = new Host();
    host.setId(this.getDummyUuid());
    host.setOrgId(this.getDummyUuid());
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
    host.setStatus(Host.HostStatus.CREATING);
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

    let header = this.getAuthHeader();
    header.authorization = `Bearer ${token}`;

    let request = new ConfirmRegistrationRequest();
    request.setMeta(request_meta);

    return this.authentication
      ?.confirm(request, header)
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
    pwd: string,
    pwd_confirmation: string,
  ): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    if (pwd === pwd_confirmation) {
      let request_meta = new RequestMeta();
      request_meta.setId(this.getDummyUuid());

      let request = new UpdatePasswordRequest();
      request.setMeta(request_meta);
      request.setPassword(pwd);

      return this.authentication
        ?.updatePassword(request, this.getAuthHeader())
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

  async getDashboardMetrics(): Promise<
    Array<Metric.AsObject> | undefined | StatusResponse
  > {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new DashboardMetricsRequest();
    request.setMeta(request_meta);

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
    request.setOrgId(org_id || '');

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
    request.setHost(host);

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
    request.setHostProvision(host_provision);

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
    sorting_criteria?: SortingCriteria,
    filter_criteria?: FilterCriteria,
  ): Promise<Array<GrpcNodeObject> | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new ListNodesRequest();
    request.setMeta(request_meta);
    request.setOrgId(org_id);

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
    node: Node,
    key_files?: FileList,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    node.setStatus(Node.NodeStatus.UNDEFINEDAPPLICATIONSTATUS);
    node.setWalletAddress('0x0198230123120');
    node.setAddress('0x023848388637');

    let request = new CreateNodeRequest();
    request.setMeta(request_meta);
    request.setNode(node);

    return this.node
      ?.create(request, this.getAuthHeader())
      .then((response) => {
        return response.getMeta()?.toObject();
      })
      .catch((err) => {
        return StatusResponseFactory.createNodeResponse(err, 'grpcClient');
      });
  }

  async updateNode(
    node: Node,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new UpdateNodeResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  /* Organization service */

  async getOrganizations(): Promise<
    Array<Organization.AsObject> | StatusResponse | undefined
  > {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new GetOrganizationsRequest();
    request.setMeta(request_meta);

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
    organization: Organization,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new CreateOrganizationRequest();
    request.setMeta(request_meta);
    request.setOrganization(organization);

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
    organization: Organization,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new UpdateOrganizationRequest();
    request.setMeta(request_meta);
    request.setOrganization(organization);

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
    organization_id: string,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new DeleteOrganizationRequest();
    request.setMeta(request_meta);
    request.setId(organization_id);

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

    let user = new User();
    user.setEmail(ui_user.email);
    user.setFirstName(ui_user.first_name);
    user.setLastName(ui_user.last_name);

    let request = new CreateUserRequest();
    request.setPassword(ui_user.password);
    request.setPasswordConfirmation(ui_user.password_confirmation);
    request.setUser(user);

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
    user: User,
  ): Promise<User.AsObject | StatusResponse | undefined> {
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());

    let request = new UpdateUserRequest();
    request.setMeta(request_meta);
    request.setUser(user);

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

  async getUpdates(): Promise<
    | Array<UpdateNotification.AsObject | undefined>
    | StatusResponse
    | Array<undefined>
  > {
    let update = new UpdateNotification();
    update.setNode(this.getDummyNode());

    let response = new GetUpdatesResponse();
    response.setMeta(this.getDummyMeta());
    response.setUpdate(update);

    return [response.getUpdate()?.toObject()];
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
}

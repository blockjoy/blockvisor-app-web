import { AuthenticationServiceClient } from '@blockjoy/blockjoy-grpc/dist/out/Authentication_serviceServiceClientPb';
import {
  LoginUserRequest,
  LoginUserResponse,
  RefreshTokenResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/authentication_service_pb';
import {
  ApiToken,
  Bill,
  Host,
  HostProvision,
  UpdateNotification,
  Metric,
  Node,
  Organization,
  ResponseMeta,
  User,
  UserConfigurationParameter,
  Uuid,
  RequestMeta,
  Blockchain,
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
import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { DashboardMetricsResponse } from '@blockjoy/blockjoy-grpc/dist/out/dashboard_service_pb';
import {
  CreateHostResponse,
  DeleteHostResponse, GetHostsRequest,
  GetHostsResponse,
  UpdateHostResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/fe_host_service_pb';
import Name = Metric.Name;
import HostStatus = Host.HostStatus;
import NodeType = Node.NodeType;
import NodeStatus = Node.NodeStatus;
import {
  CreateHostProvisionResponse,
  GetHostProvisionResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/host_provision_service_pb';
import {
  CreateNodeResponse,
  GetNodeResponse,
  UpdateNodeResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/node_service_pb';
import {
  CreateOrganizationResponse,
  DeleteOrganizationResponse,
  GetOrganizationsResponse,
  UpdateOrganizationResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/organization_service_pb';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetConfigurationResponse,
  GetUserResponse,
  UpsertConfigurationResponse,
} from '@blockjoy/blockjoy-grpc/dist/out/user_service_pb';
import { GetUpdatesResponse } from '@blockjoy/blockjoy-grpc/dist/out/update_service_pb';
import { CommandResponse } from '@blockjoy/blockjoy-grpc/dist/out/command_service_pb';
import { Parameter } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

export type StatusResponse = {
  code: string;
  message: string;
  metadata: { headers: {} };
  source: string;
};
export type UIUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export type UINodeCreate = {
  host_id: Uuid;
  node_type: NodeType;
  blockchain_id: Uuid;
  command: 'create_node';
  sub_cmd?: string;
};
export type UIHostCreate = {
  name: string;
  location?: string;
};

export function timestamp_to_date(ts: Timestamp | undefined): Date | undefined {
  if (ts !== undefined) {
    return new Date(ts.getSeconds() * 1000);
  }
}

export function id_to_string(id: Uuid | undefined): string | undefined {
  if (id !== undefined) {
    return id.getValue();
  }
}

export function node_to_grpc_node(node: Node | undefined): GrpcNodeObject {
  return {
    ...node?.toObject(),
    groupsList: node?.getGroupsList() || [],
    created_at_datetime: timestamp_to_date(node?.getCreatedAt()),
    id_str: id_to_string(node?.getId()),
    updated_at_datetime: timestamp_to_date(node?.getUpdatedAt()),
  };
}

export function host_to_grpc_host(host: Host | undefined): GrpcHostObject {
  return {
    ...host?.toObject(),
    created_at_datetime: timestamp_to_date(host?.getCreatedAt()) || undefined,
    id_str: id_to_string(host?.getId()) || '',
    nodesList: host?.getNodesList().map((node) => node.toObject()) || [],
    node_objects: host?.getNodesList().map((node) => node_to_grpc_node(node)),
  };
}

export function user_to_grpc_user(user: User | undefined): GrpcUserObject {
  return {
    ...user?.toObject(),
    created_at_datetime: timestamp_to_date(user?.getCreatedAt()),
    updated_at_datetime: timestamp_to_date(user?.getUpdatedAt()),
    id_str: id_to_string(user?.getId()),
  };
}

export type ConvenienceConversion = {
  created_at_datetime: Date | undefined;
  id_str: string | undefined;
};
export type GrpcHostObject = Host.AsObject &
  ConvenienceConversion & { node_objects: Array<GrpcNodeObject> | undefined };
export type GrpcNodeObject = Node.AsObject &
  ConvenienceConversion & { updated_at_datetime: Date | undefined };
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

  private token: string;

  constructor(host: string) {
    this.initClients(host).then(() => console.log('Clients connected'));

    this.token = '';
  }

  setTokenValue(token: string) {
    this.token = token;
  }

  /**
   * Initialize all gRPC clients
   */
  private async initClients(host: string) {
    this.authentication = new AuthenticationServiceClient(host, null, null);
    this.host = new HostServiceClient(host, null, null);
    /*
        this.billing = new BillingServiceClient(host, null, null);
        this.dashboard = new DashboardServiceClient(host, null, null);
        this.host_provision = new HostProvisionServiceClient(host, null, null);
        this.node = new NodeServiceClient(host, null, null);
        this.organization = new OrganizationServiceClient(host, null, null);
        this.update = new UpdateServiceClient(host, null, null);
        this.user = new UserServiceClient(host, null, null);
         */
  }

  getApiToken() {
    let api_token = new ApiToken();
    api_token.setValue(this.token);

    this.token = JSON.parse(window.localStorage.getItem("identity") || "").accessToken;
    return Buffer.from(this.token).toString('base64')
  }

  getDummyMeta(): ResponseMeta {
    let meta = new ResponseMeta();
    meta.setStatus(ResponseMeta.Status.SUCCESS);
    meta.setOriginRequestId(this.getDummyUuid());

    return meta;
  }

  getDummyUuid(): Uuid {
    let uuid = new Uuid();
    uuid.setValue(uuidv4());

    return uuid;
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
    node.setType(NodeType.NODE);
    node.setAddress('0x999999999');
    node.setWalletAddress('0x000000001');
    node.setBlockHeight(12_121_112);
    node.setNodeData('some-blob');
    node.setCreatedAt(this.getDummyTimestamp());
    node.setUpdatedAt(this.getDummyTimestamp());
    node.setStatus(NodeStatus.PROCESSING);

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
    host.setStatus(HostStatus.CREATING);
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
        console.log(`Got login response: ${response}`);
        this.token = response.getToken()?.toObject().value || "";

        return response.getToken()?.toObject();
      })
      .catch((err) => {
        return {
          code: 'Unauthenticated',
          message: `${err}`,
          metadata: {
            headers: {
              'content-type': 'application/grpc',
              date: 'Fri, 26 Aug 2022 17:55:33 GMT',
              'content-length': '0',
            },
          },
          source: 'None',
        };
      });
  }

  async refresh(): Promise<ApiToken.AsObject | StatusResponse | undefined> {
    let response = new RefreshTokenResponse();
    response.setMeta(this.getDummyMeta());

    return response.getToken()?.toObject();
  }

  /* Billing service */

  async createBill(
    user_id: Uuid,
    org_id: Uuid,
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

  async getBlockchains(): Promise<Array<Blockchain.AsObject> | StatusResponse | undefined> {
    return {
      code: 'Unauthenticated',
      message: `getBlockchains not yet implemented`,
      metadata: {
        headers: {
          'content-type': 'application/grpc',
          date: 'Fri, 26 Aug 2022 17:55:33 GMT',
          'content-length': '0',
        },
      },
      source: 'None',
    };
  }

  /* Dashboard service */

  async getDashboardMetrics(): Promise<
    Array<Metric.AsObject> | StatusResponse
  > {
    let metric = new Metric();
    metric.setName(Name.ONLINE);
    let value = new google_protobuf_any_pb.Any();
    value.setValue('8');
    metric.setValue(value);

    let metric2 = new Metric();
    metric2.setName(Name.OFFLINE);
    let value2 = new google_protobuf_any_pb.Any();
    value2.setValue('2');
    metric2.setValue(value2);

    let response = new DashboardMetricsResponse();
    response.setMeta(this.getDummyMeta());
    response.addMetrics(metric);
    response.addMetrics(metric2);

    return response.getMetricsList().map((item) => item.toObject());
  }

  /* Host service */

  async getHosts(
    host_id?: Uuid,
    org_id?: Uuid,
    token?: string,
  ): Promise<Array<GrpcHostObject> | StatusResponse | undefined> {
    let auth = { authorization: `Bearer ${this.getApiToken()}` };
    let oid = new Uuid();
    oid.setValue("2592312d-daf6-4a0e-b2da-012d89b41088");
    let request_meta = new RequestMeta();
    request_meta.setId(this.getDummyUuid());
    let request = new GetHostsRequest();
    request.setMeta(request_meta);
    request.setOrgId(oid);

    return this.host?.get(request, auth).then((response) => {
          console.log(`Got host response: ${response}`);
          return response.getHostsList()?.map((host) => host_to_grpc_host(host))
    })
    .catch((err) => {
      return {
        code: 'Unknown',
        message: `${err}`,
        metadata: {
          headers: {
            'content-type': 'application/grpc',
            date: 'Fri, 26 Aug 2022 17:55:33 GMT',
            'content-length': '0',
          },
        },
        source: 'None',
      };
    });
  }

  async createHost(
    host: Host,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CreateHostResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async updateHost(
    host: Host,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new UpdateHostResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async deleteHost(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new DeleteHostResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  /* Host provision service */

  async getHostProvision(
    otp?: string,
  ): Promise<
    Array<HostProvision.AsObject> | StatusResponse | undefined | void
  > {
    let provision = new HostProvision();

    if (otp) provision.setId(otp);

    provision.setOrgId(this.getDummyUuid());
    provision.setHostId(this.getDummyUuid());
    provision.setInstallCmd('install cmd');
    provision.setCreatedAt(this.getDummyTimestamp());
    provision.setClaimedAt(this.getDummyTimestamp());

    let response = new GetHostProvisionResponse();
    response.setMeta(this.getDummyMeta());
    //response.setHostProvisionsList([provision]);

    console.debug('retrieving host provisions');

    //return response.getHostProvisionsList()?.map((provision) => provision.toObject())
  }

  async createHostProvision(
    host_provision: HostProvision,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CreateHostProvisionResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  /* Node service */

  async getNode(
    node_id: Uuid,
  ): Promise<GrpcNodeObject | StatusResponse | undefined> {
    let response = new GetNodeResponse();
    response.setMeta(this.getDummyMeta());
    response.setNode(this.getDummyNode());

    return new Promise((resolve) => {
      setTimeout(
        resolve.bind(null, node_to_grpc_node(response?.getNode())),
        1000,
      );
    });
  }

  async createNode(
    node: Node,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CreateNodeResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
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
    Array<Organization.AsObject> | StatusResponse
  > {
    let organization = new Organization();
    organization.setId(this.getDummyUuid());
    organization.setName('ThisGroup');
    organization.setPersonal(true);
    organization.setMemberCount(1);
    organization.setCreatedAt(this.getDummyTimestamp());
    organization.setUpdatedAt(this.getDummyTimestamp());

    let response = new GetOrganizationsResponse();
    response.setMeta(this.getDummyMeta());
    response.setOrganizationsList([organization]);

    return response.getOrganizationsList().map((item) => item.toObject());
  }

  async createOrganization(
    organization: Organization,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CreateOrganizationResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async updateOrganization(
    organization: Organization,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new UpdateOrganizationResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async deleteOrganization(
    organization_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new DeleteOrganizationResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  /* User service */

  async getUser(): Promise<GrpcUserObject | StatusResponse | undefined> {
    let user = new User();
    user.setId(this.getDummyUuid());
    user.setFirstName('max');
    user.setLastName('Mustermann');
    user.setEmail('max@mustermann.at');
    user.setCreatedAt(this.getDummyTimestamp());
    user.setUpdatedAt(this.getDummyTimestamp());

    let response = new GetUserResponse();
    response.setMeta(this.getDummyMeta());
    response.setUser(user);

    return user_to_grpc_user(response.getUser());
  }

  async createUser(
    user: UIUser,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    console.log(`using user data: ${user}`);

    let response = new CreateUserResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
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
    host_id: Uuid,
    node: UINodeCreate,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execDeleteNode(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStartNode(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStopNode(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execRestartNode(
    host_id: Uuid,
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
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStartHost(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execStopHost(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execRestartHost(
    host_id: Uuid,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }

  async execGeneric(
    host_id: Uuid,
    params: Array<Parameter>,
  ): Promise<ResponseMeta.AsObject | StatusResponse | undefined> {
    let response = new CommandResponse();
    response.setMeta(this.getDummyMeta());

    return response.getMeta()?.toObject();
  }
}

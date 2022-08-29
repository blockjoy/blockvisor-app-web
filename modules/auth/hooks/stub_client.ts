import {AuthenticationServiceClient} from "blockjoy-mock-grpc/dist/out/Authentication_serviceServiceClientPb";
import {LoginUserResponse, RefreshTokenResponse} from "blockjoy-mock-grpc/dist/out/authentication_service_pb";
import {
    ApiToken,
    Bill,
    Host,
    HostProvision,
    InfoUpdate,
    KPI,
    Node,
    Organization,
    ResponseMeta,
    User, Uuid
} from "blockjoy-mock-grpc/dist/out/common_pb";
import {v4 as uuidv4} from 'uuid';
import {BillingServiceClient} from "blockjoy-mock-grpc/dist/out/Billing_serviceServiceClientPb";
import {DashboardServiceClient} from "blockjoy-mock-grpc/dist/out/Dashboard_serviceServiceClientPb";
import {HostServiceClient} from "blockjoy-mock-grpc/dist/out/Fe_host_serviceServiceClientPb";
import {HostProvisionServiceClient} from "blockjoy-mock-grpc/dist/out/Host_provision_serviceServiceClientPb";
import {NodeServiceClient} from "blockjoy-mock-grpc/dist/out/Node_serviceServiceClientPb";
import {OrganizationServiceClient} from "blockjoy-mock-grpc/dist/out/Organization_serviceServiceClientPb";
import {UpdateServiceClient} from "blockjoy-mock-grpc/dist/out/Update_serviceServiceClientPb";
import {UserServiceClient} from "blockjoy-mock-grpc/dist/out/User_serviceServiceClientPb";
import {CreateBillResponse} from "blockjoy-mock-grpc/dist/out/billing_service_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import {DashboardKpiResponse} from "blockjoy-mock-grpc/dist/out/dashboard_service_pb";
import {
    CreateHostResponse,
    DeleteHostResponse,
    GetHostsResponse,
    UpdateHostResponse
} from "blockjoy-mock-grpc/dist/out/fe_host_service_pb";
import Name = KPI.Name;
import HostStatus = Host.HostStatus;
import NodeType = Node.NodeType;
import NodeStatus = Node.NodeStatus;
import {CreateHostProvisionResponse, GetHostProvisionResponse} from "blockjoy-mock-grpc/dist/out/host_provision_service_pb";
import {CreateNodeResponse, GetNodeResponse, UpdateNodeResponse} from "blockjoy-mock-grpc/dist/out/node_service_pb";
import {
    CreateOrganizationResponse,
    DeleteOrganizationResponse, GetOrganizationsResponse,
    UpdateOrganizationResponse
} from "blockjoy-mock-grpc/dist/out/organization_service_pb";
import {
    CreateUserResponse,
    GetConfigurationResponse,
    GetUserResponse,
    UpsertConfigurationResponse
} from "blockjoy-mock-grpc/dist/out/user_service_pb";
import {GetUpdatesResponse} from "blockjoy-mock-grpc/dist/out/update_service_pb";

export type StatusResponse = { code: string, message: string, metadata: { headers: {} }, source: string };

export class GrpcClient {
    private authentication: AuthenticationServiceClient;
    private billing: BillingServiceClient;
    private dashboard: DashboardServiceClient;
    private host: HostServiceClient;
    private host_provision: HostProvisionServiceClient;
    private node: NodeServiceClient;
    private organization: OrganizationServiceClient;
    private update: UpdateServiceClient;
    private user: UserServiceClient;

    private token: string;

    constructor(host: string) {
        // TODO: uncomment when backend services are available
        // this.initClients(host);

        this.token = "4534534sfwfsdf234535dfgdfgdfg345";
    }

    setTokenValue(token: string) {
        this.token = token;
    }

    /**
     * Initialize all gRPC clients
     */
    private initClients(host: string) {
        this.authentication = new AuthenticationServiceClient(host, null, null);
        this.billing = new BillingServiceClient(host, null, null);
        this.dashboard = new DashboardServiceClient(host, null, null);
        this.host = new HostServiceClient(host, null, null);
        this.host_provision = new HostProvisionServiceClient(host, null, null);
        this.node = new NodeServiceClient(host, null, null);
        this.organization = new OrganizationServiceClient(host, null, null);
        this.update = new UpdateServiceClient(host, null, null);
        this.user = new UserServiceClient(host, null, null);
    }

    getApiToken() {
        let api_token = new ApiToken();
        // TODO: base64 encode token value
        api_token.setValue(this.token);

        return api_token
    }

    getDummyMeta(): ResponseMeta {
        let uuid = new Uuid();
        uuid.setValue(uuidv4());

        let meta = new ResponseMeta();
        meta.setStatus(ResponseMeta.Status.SUCCESS);
        meta.setOriginRequestId(uuid);

        return meta
    }

    getDummyNode(): Node {
        let node = new Node();
        node.setId(uuidv4());
        node.setOrgId(uuidv4());
        node.setBlockchainId(uuidv4());
        node.setName("lorem-node");
        node.setGroupsList(["group-one"]);
        node.setVersion("0.1.0");
        node.setIp("127.0.0.1");
        node.setType(NodeType.NODE);
        node.setAddress("0x999999999");
        node.setWalletAddress("0x000000001");
        node.setBlockHeight(12_121_112);
        node.setNodeData("some-blob");
        node.setCreatedAt(this.getDummyTimestamp());
        node.setUpdatedAt(this.getDummyTimestamp());
        node.setStatus(NodeStatus.PROCESSING);

        return node
    }

    getDummyHost(): Host {
        let host = new Host();
        host.setId(uuidv4());
        host.setOrgId(uuidv4());
        host.setName("lorem-ipsum");
        host.setVersion("0.1.0");
        host.setLocation("Djibouti");
        host.setCpuCount(8);
        host.setMemSize(32);
        host.setDiskSize(2048);
        host.setOs("Darwin");
        host.setOsVersion("21.6.0 Darwin Kernel Version 21.6.");
        host.setIp("127.0.0.1");
        host.addNodes(this.getDummyNode());
        host.setStatus(HostStatus.CREATING);
        host.setCreatedAt(this.getDummyTimestamp());

        return host
    }

    getDummyTimestamp(): google_protobuf_timestamp_pb.Timestamp {
        let fromdate = new Date();
        let timestamp = new google_protobuf_timestamp_pb.Timestamp();

        timestamp.setSeconds(fromdate.getSeconds());
        timestamp.setNanos(0);

        return timestamp
    }

    /* Authentication service */

    login(email: string, pwd: string): LoginUserResponse | StatusResponse {
        console.debug(`Using "${email}" => "${pwd}" for login`);

        if(email === "user@test.com") {
            let response = new LoginUserResponse();
            response.setMeta(this.getDummyMeta());
            response.setToken(this.getApiToken());

            return response
        } else {
            return {
                code: "Unauthenticated",
                message: "invalid authentication credentials\n\n",
                metadata: {
                    headers: {
                        "content-type": "application/grpc",
                        "date": "Fri, 26 Aug 2022 17:55:33 GMT",
                        "content-length": "0"
                    }
                },
                source: "None"
            }
        }
    }

    refresh(): RefreshTokenResponse {
        let response = new RefreshTokenResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* Billing service */

    createBill(): CreateBillResponse {
        let bill = new Bill();
        bill.setId(uuidv4());
        bill.setPdfUrl("/some/url.pdf");
        bill.setCreatedAt(this.getDummyTimestamp());
        bill.setTaxNumber("tax-number");
        bill.setReceiverName("Max Mustermann");
        bill.setReceiverAddress("Bondstreet 1a, 12312 Djibouti");
        bill.setTaxRate(0.2);
        bill.setNetAmount(100.0);
        bill.setGrossAmount(120.0);

        let response = new CreateBillResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* Dashboard service */

    getDashboardKPIs(): DashboardKpiResponse {
        let kpi = new KPI();
        kpi.setName(Name.NODES);
        kpi.setValue(new google_protobuf_any_pb.Any());

        let response = new DashboardKpiResponse();
        response.setMeta(this.getDummyMeta());
        response.addValues(kpi);

        return response
    }

    /* Host service */

    getHosts(): GetHostsResponse {
        let response = new GetHostsResponse();
        response.setMeta(this.getDummyMeta());
        response.addHosts(this.getDummyHost());

        return response
    }

    createHost(): CreateHostResponse {
        let response = new CreateHostResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    updateHost(): UpdateHostResponse {
        let response = new UpdateHostResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    deleteHost(): DeleteHostResponse {
        let response = new DeleteHostResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* Host provision service */

    getHostProvision(): GetHostProvisionResponse {
        let provision = new HostProvision();
        provision.setId("abcdefgh");
        provision.setOrgId(uuidv4());
        provision.setHostId(uuidv4());
        provision.setInstallCmd("install cmd");
        provision.setCreatedAt(this.getDummyTimestamp());
        provision.setClaimedAt(this.getDummyTimestamp());

        let response = new GetHostProvisionResponse();
        response.setMeta(this.getDummyMeta());
        response.setHostProvision(provision);

        return response
    }

    createHostProvision(): CreateHostProvisionResponse {
        let response = new CreateHostProvisionResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* Node service */

    getNode(): GetNodeResponse {
        let response = new GetNodeResponse();
        response.setMeta(this.getDummyMeta());
        response.setNodesList([this.getDummyNode()]);

        return response
    }

    createNode(): CreateNodeResponse {
        let response = new CreateNodeResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    updateNode(): UpdateNodeResponse {
        let response = new UpdateNodeResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* Organization service */

    getOrganizations(): GetOrganizationsResponse {
        let organization = new Organization();
        organization.setId(uuidv4());
        organization.setName("ThisGroup");
        organization.setPersonal(true);
        organization.setMemberCount(1);
        organization.setCreatedAt(this.getDummyTimestamp());
        organization.setUpdatedAt(this.getDummyTimestamp());

        let response = new GetOrganizationsResponse();
        response.setMeta(this.getDummyMeta());
        response.setOrganizationsList([organization]);

        return response
    }

    createOrganization(): CreateOrganizationResponse {
        let response = new CreateOrganizationResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    updateOrganization(): UpdateOrganizationResponse {
        let response = new UpdateOrganizationResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    deleteOrganization(): DeleteOrganizationResponse {
        let response = new DeleteOrganizationResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* User service */

    getUser(): GetUserResponse {
        let user = new User();
        user.setId(uuidv4());
        user.setFirstName("max");
        user.setLastName("Mustermann");
        user.setEmail("max@mustermann.at");
        user.setCreatedAt(this.getDummyTimestamp());
        user.setUpdatedAt(this.getDummyTimestamp());

        let response = new GetUserResponse();
        response.setMeta(this.getDummyMeta());
        response.setUser(user);

        return response
    }

    createUser(): CreateUserResponse {
        let response = new CreateUserResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    upsertConfiguration(): UpsertConfigurationResponse {
        let response = new UpsertConfigurationResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    getConfiguration(): GetConfigurationResponse {
        let response = new GetConfigurationResponse();
        response.setMeta(this.getDummyMeta());

        return response
    }

    /* Update service */

    getUpdates(): [GetUpdatesResponse] {
        let update = new InfoUpdate();
        update.setNode(this.getDummyNode());

        let response = new GetUpdatesResponse();
        response.setMeta(this.getDummyMeta());
        response.setUpdate(update);

        return [response]
    }
}

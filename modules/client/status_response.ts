export type StatusResponse = {
  code: StatusResponseCode;
  message: string;
  metadata: { headers: {} };
  source: string;
};

export type StatusSource = string | 'grpcClient';

export enum StatusResponseCode {
  Login,
  ResetPassword,
  UpdateResetPassword,
  UpdatePassword,
  GetBlockchains,
  GetDashboardMetrics,
  GetHosts,
  CreateHost,
  GetHostProvision,
  CreateHostProvision,
  ListNodes,
  GetNode,
  CreateNode,
  UpdateNode,
  DeleteNode,
  GetOrganizations,
  CreateUser,
  GetUser,
  UpdateUser,
  ExecStartNode,
  ExecStopNode,
  ExecRestartHost,
  RegistrationConfirmation,
  CreateOrganization,
  DeleteOrganization,
  UpdateOrganization,
  RestoreOrganization,
  SaveKeyFiles,
  InviteOrgMember
}

export class StatusResponseFactory {
  static inviteOrgMember(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
        StatusResponseCode.InviteOrgMember,
        'Invite org member error',
        err,
        source,
    );
  }

  static loginResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.Login,
      'Login error',
      err,
      source,
    );
  }

  static resetPasswordResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.ResetPassword,
      'Login error',
      err,
      source,
    );
  }

  static updateResetPasswordResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.UpdateResetPassword,
      'Update reset password error',
      err,
      source,
    );
  }

  static updatePasswordResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.UpdatePassword,
      'Update password error',
      err,
      source,
    );
  }

  static getBlockchainsResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetBlockchains,
      'Error retrieving blockchains',
      err,
      source,
    );
  }

  static getDashboardMetricsResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetDashboardMetrics,
      'Error retrieving dashboard metrics',
      err,
      source,
    );
  }

  static getHostsResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetHosts,
      'Error retrieving hosts',
      err,
      source,
    );
  }

  static createHostResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.CreateHost,
      'Error creating host',
      err,
      source,
    );
  }

  static getHostProvisionResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetHostProvision,
      'Error retrieving host provision',
      err,
      source,
    );
  }

  static createHostProvisionResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.CreateHostProvision,
      'Error creating host provision',
      err,
      source,
    );
  }

  static listNodesResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.ListNodes,
      'Error retrieving nodes',
      err,
      source,
    );
  }

  static getNodeResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetNode,
      'Error retrieving node',
      err,
      source,
    );
  }

  static createNodeResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.CreateNode,
      'Error creating node',
      err,
      source,
    );
  }

  static updateNodeResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
        StatusResponseCode.UpdateNode,
        'Error updating node',
        err,
        source,
    );
  }

  static deleteNodeResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
        StatusResponseCode.DeleteNode,
        'Error deleting node',
        err,
        source,
    );
  }

  static saveKeyfileResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
        StatusResponseCode.SaveKeyFiles,
        'Error saving key files',
        err,
        source,
    );
  }

  static getOrganizationsResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetOrganizations,
      'Error retrieving organizations',
      err,
      source,
    );
  }

  static createUserResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.CreateUser,
      'Error creating user',
      err,
      source,
    );
  }

  static getUserResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.GetUser,
      'Error getting user',
      err,
      source,
    );
  }

  static updateUserResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.UpdateUser,
      'Error updating user',
      err,
      source,
    );
  }

  static execStartNodeResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.ExecStartNode,
      'Error starting node',
      err,
      source,
    );
  }

  static execStopNodeResponse(err: any, source: StatusSource): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.ExecStopNode,
      'Error stopping node',
      err,
      source,
    );
  }

  static execRestartHostResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.ExecRestartHost,
      'Error restarting host',
      err,
      source,
    );
  }

  static registrationConfirmation(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.RegistrationConfirmation,
      'Registration confirmation error',
      err,
      source,
    );
  }

  static createOrganizationResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.CreateOrganization,
      'Create organization error',
      err,
      source,
    );
  }

  static updateOrganizationResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.UpdateOrganization,
      'Update organization error',
      err,
      source,
    );
  }

  static deleteOrganizationResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.DeleteOrganization,
      'Delete organization error',
      err,
      source,
    );
  }

  static restoreOrganizationResponse(
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return StatusResponseFactory.createResponse(
      StatusResponseCode.RestoreOrganization,
      'Restore organization error',
      err,
      source,
    );
  }

  private static createResponse(
    code: StatusResponseCode,
    msg: string,
    err: any,
    source: StatusSource,
  ): StatusResponse {
    return {
      code: code,
      message: `${err}`,
      source: source,
      metadata: {
        headers: {
          'content-type': 'application/grpc',
          date: new Date().toLocaleString(),
          'content-length': '0',
        },
      },
    };
  }
}

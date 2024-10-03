import { API_ENDPOINTS, callPipedriveApi, CUSTOM_FIELDS } from '@shared/index';

export const Pipedrive = {
  searchOrganization: async (orgId?: string) =>
    await callPipedriveApi(API_ENDPOINTS.SEARCH_ORGANIZATION, 'GET', null, {
      term: orgId,
      exact_match: true,
    }),

  addOrganization: async (orgName?: string, orgId?: string) =>
    await callPipedriveApi(API_ENDPOINTS.ADD_ORGANIZATION, 'POST', {
      name: orgName,
      [CUSTOM_FIELDS.organization.appOrgID]: orgId,
    }),

  searchPerson: async (email?: string) =>
    await callPipedriveApi(API_ENDPOINTS.SEARCH_PERSON, 'GET', null, {
      term: email,
      fields: 'email',
    }),

  addPerson: async (user?: User | null, extOrgId?: number | null) =>
    await callPipedriveApi(API_ENDPOINTS.ADD_PERSON, 'POST', {
      name: `${user?.firstName} ${user?.lastName}`,
      email: [{ value: user?.email, primary: true, label: 'main' }],
      org_id: extOrgId,
    }),

  updatePerson: async (extPersonId?: number | null, extOrgId?: number | null) =>
    await callPipedriveApi(
      `${API_ENDPOINTS.UDPATE_PERSON}/${extPersonId}`,
      'PUT',
      { org_id: extOrgId },
    ),

  addLead: async (
    user?: User | null,
    leadData?: PipedriveAddLeadParams,
    extPersonId?: number | null,
    extOrgId?: number | null,
  ) =>
    await callPipedriveApi(API_ENDPOINTS.ADD_LEAD, 'POST', {
      title: `${user?.firstName} ${user?.lastName}: ${leadData?.nodeInfo}`,
      [CUSTOM_FIELDS.lead.nodeInfo]: leadData?.nodeInfo,
      [CUSTOM_FIELDS.lead.nodeIssues]: leadData?.nodeIssues,
      person_id: extPersonId,
      organization_id: extOrgId,
    }),
};

import {
  API_ENDPOINTS,
  BASE_HEADERS,
  BASE_PARAMS,
  BASE_URL,
  CUSTOM_FIELDS,
} from '@shared/index';

export const Pipedrive = {
  searchOrganization: async (orgId?: string): Promise<PipedriveResponse> => {
    const response = await window.fetch(
      `${BASE_URL}/${API_ENDPOINTS.SEARCH_ORGANIZATION}?${BASE_PARAMS}&term=${orgId}&exact_match=true`,
      {
        headers: BASE_HEADERS,
      },
    );
    return await response.json();
  },

  addOrganization: async (
    orgName?: string,
    orgId?: string,
  ): Promise<PipedriveResponse> => {
    const response = await window.fetch(
      `${BASE_URL}/${API_ENDPOINTS.ADD_ORGANIZATION}?${BASE_PARAMS}`,
      {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify({
          name: orgName,
          [CUSTOM_FIELDS.organization.appOrgID]: orgId,
        }),
      },
    );
    return await response.json();
  },

  searchPerson: async (email?: string): Promise<PipedriveResponse> => {
    const response = await window.fetch(
      `${BASE_URL}/${API_ENDPOINTS.SEARCH_PERSON}?${BASE_PARAMS}&term=${email}&fields=email`,
      {
        headers: BASE_HEADERS,
      },
    );
    return await response.json();
  },

  addPerson: async (
    user?: User | null,
    extOrgId?: number | null,
  ): Promise<PipedriveResponse> => {
    const response = await window.fetch(
      `${BASE_URL}/${API_ENDPOINTS.ADD_PERSON}?${BASE_PARAMS}`,
      {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify({
          name: `${user?.firstName} ${user?.lastName}`,
          email: [{ value: user?.email, primary: 'true', label: 'main' }],
          org_id: extOrgId,
        }),
      },
    );
    return await response.json();
  },

  updatePerson: async (
    extPersonId?: number | null,
    extOrgId?: number | null,
  ): Promise<PipedriveResponse> => {
    const response = await window.fetch(
      `${BASE_URL}/${API_ENDPOINTS.UDPATE_PERSON}/${extPersonId}?${BASE_PARAMS}`,
      {
        method: 'PUT',
        headers: BASE_HEADERS,
        body: JSON.stringify({
          org_id: extOrgId,
        }),
      },
    );
    return await response.json();
  },

  addLead: async (
    user?: User | null,
    leadData?: PipedriveAddLeadParams,
    extPersonId?: number | null,
    extOrgId?: number | null,
  ): Promise<PipedriveResponse> => {
    const response = await window.fetch(
      `${BASE_URL}/${API_ENDPOINTS.ADD_LEAD}?${BASE_PARAMS}`,
      {
        method: 'POST',
        headers: BASE_HEADERS,
        body: JSON.stringify({
          title: `${user?.firstName} ${user?.lastName}: ${leadData?.nodeInfo}`,
          [CUSTOM_FIELDS.lead.nodeInfo]: leadData?.nodeInfo,
          [CUSTOM_FIELDS.lead.nodeIssues]: leadData?.nodeIssues,
          person_id: extPersonId,
          organization_id: extOrgId,
        }),
      },
    );
    return await response.json();
  },
};

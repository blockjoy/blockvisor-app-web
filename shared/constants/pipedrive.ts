export const BASE_URL = `https://api.pipedrive.com/v1`;

export const BASE_PARAMS = `api_token=${process.env.PIPEDRIVE_API_KEY}`;

export const BASE_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  Accept: 'application/json;charset=UTF-8',
};

export const API_ENDPOINTS = {
  ADD_LEAD: 'leads',
  ADD_ORGANIZATION: 'organizations',
  SEARCH_ORGANIZATION: 'organizations/search',
  ADD_PERSON: 'persons',
  UDPATE_PERSON: 'persons',
  SEARCH_PERSON: 'persons/search',
};

export const CUSTOM_FIELDS = {
  organization: {
    appOrgID: '183bd0de7e5d141547eb0a342e1a3f6e55fc2491',
  },
  lead: {
    nodeInfo: '317c308fece64058077f2715d85a1704b9d7f410',
    nodeIssues: '8981e9c3462c43904333081068b460fccbf5c52d',
  },
};

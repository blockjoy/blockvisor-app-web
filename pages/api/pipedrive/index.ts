import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_HEADERS, BASE_PARAMS, BASE_URL } from '@shared/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {
      endpoint,
      method = 'GET',
      body = null,
      params = null,
    }: PipedriveRequest = req.body;

    let url = `${BASE_URL}/${endpoint}?${BASE_PARAMS}`;

    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url += `&${queryParams}`;
    }

    const response = await fetch(url, {
      method,
      headers: BASE_HEADERS,
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Request failed', error });
  }
}

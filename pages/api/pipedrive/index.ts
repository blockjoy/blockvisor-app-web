import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = `https://api.pipedrive.com/v1`;
const BASE_PARAMS = `api_token=${process.env.NEXT_PUBLIC_PIPEDRIVE_API_KEY}`;
const BASE_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  Accept: 'application/json;charset=UTF-8',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const {
        endpoint,
        method = 'GET',
        body = null,
        params = null,
      }: PipedriveRequest = req.body;

      let url = `${BASE_URL}/${endpoint}?${BASE_PARAMS}`;

      if (params) {
        const queryParams = Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&');
        url += '&' + queryParams;
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
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

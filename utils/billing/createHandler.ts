import { NextApiRequest, NextApiResponse } from 'next';
import { handleErrorCode } from './handleError';

type RequestCallback<Params, Result> = (params: Params) => {
  request: (cb: (error: any, result: Result) => void) => void;
};

type MappingCallback<Params, Result, Response> = (
  result: Result,
  params?: Params | any, // TODO: fix any
) => Response;

type ErrorCallback<Error, Response> = (error: Error) => Response | null;

export const createHandler = <Params, Result, Response>(
  requestCallback: RequestCallback<Params, Result>,
  mappingCallback: MappingCallback<Params, Result, Response>,
  errorCallback?: ErrorCallback<Error, Response>,
) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<Response | null | { message: string }>,
  ) => {
    if (req.method === 'POST') {
      try {
        const params = req.body as Params;
        const result = await new Promise<Result>((resolve, reject) => {
          requestCallback(params).request((error, result) => {
            if (error) {
              handleErrorCode(error, resolve, reject);
            } else {
              resolve(result);
            }
          });
        });

        if (result !== null) {
          const response = params
            ? mappingCallback(result, params)
            : mappingCallback(result);

          res.status(200).json(response);
        } else {
          res.status(200).json(null);
        }
      } catch (error: any) {
        if (errorCallback) {
          const result = errorCallback(error);
          res.status(200).json(result);
        } else {
          res
            .status(error.http_status_code || 500)
            .json({ message: error.message });
        }
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
};

import { StatusResponse } from '@modules/client/status_response';

function isStatusResponse(value: unknown): value is StatusResponse {
  return (value as StatusResponse).code !== undefined;
}

export { isStatusResponse };

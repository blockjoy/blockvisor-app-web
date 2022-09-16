import { StatusResponse } from '@modules/client/stub_client';

function isStatusResponse(value: unknown): value is StatusResponse {
  return (value as StatusResponse).code !== undefined;
}

export { isStatusResponse };

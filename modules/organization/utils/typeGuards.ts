import { StatusResponse } from '@modules/grpc/status_response';

function isStatusResponse(value: unknown): value is StatusResponse {
  return (value as StatusResponse).code !== undefined;
}

export { isStatusResponse };

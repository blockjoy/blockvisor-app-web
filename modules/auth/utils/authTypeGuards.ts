import { StatusResponse } from '@modules/grpc/status_response';

function isSuccess(value: unknown): value is any {
  return (value as any).value !== undefined;
}

function isLoginError(value: unknown): value is StatusResponse {
  return (value as StatusResponse).code !== undefined;
}

function isResponeMetaObject(value: unknown): value is any {
  return (value as any).status !== undefined;
}

export { isSuccess, isLoginError, isResponeMetaObject };

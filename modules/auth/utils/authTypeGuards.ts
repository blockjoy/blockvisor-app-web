import { StatusResponse } from '@modules/client/stub_client';
import { ApiToken, ResponseMeta } from 'blockjoy-mock-grpc/dist/out/common_pb';

function isLoginSuccess(value: unknown): value is ApiToken.AsObject {
  return (value as ApiToken.AsObject).value !== undefined;
}

function isLoginError(value: unknown): value is StatusResponse {
  return (value as StatusResponse).code !== undefined;
}

function isResponeMetaObject(value: unknown): value is ResponseMeta.AsObject {
  return (value as ResponseMeta.AsObject).status !== undefined;
}

export { isLoginSuccess, isLoginError, isResponeMetaObject };

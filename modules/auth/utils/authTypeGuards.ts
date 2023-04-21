import { StatusResponse } from '@modules/grpc/status_response';
import {
  ApiToken,
  ResponseMeta,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';

function isSuccess(value: unknown): value is ApiToken.AsObject {
  return (value as ApiToken.AsObject).value !== undefined;
}

function isLoginError(value: unknown): value is StatusResponse {
  return (value as StatusResponse).code !== undefined;
}

function isResponeMetaObject(value: unknown): value is ResponseMeta.AsObject {
  return (value as ResponseMeta.AsObject).status !== undefined;
}

export { isSuccess, isLoginError, isResponeMetaObject };
